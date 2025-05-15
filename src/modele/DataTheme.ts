import {connexion, APIsql } from "./connexion.js";
class UnTheme {
    private _theme_num : number; // >0
    private _theme_lib : string; // entre 2 et 20chars
    private _theme_tarif : number; // >0

    constructor(num: number = 0, lib: string = "", tarif: number = 0) {
        this._theme_num = num;
        this._theme_lib = lib;
        this._theme_tarif = tarif;
    }

    get theme_num(): number {
        return this._theme_num;
    }

    set theme_num(nom: number) {
        if (nom <= 0) {
            throw new Error("Le theme_numéro doit être supérieur à 0\n");
        }
        this._theme_num = nom;
    }

    get theme_lib(): string {
        return this._theme_lib;
    }

    set theme_lib(adresse: string) {
        if (adresse.length > 20 || adresse.length < 2) {
            throw new Error("Le theme_libellé doit être compris entre 2 et 20 caractères\n");
        }
        this._theme_lib = adresse;
    }

    get theme_tarif(): number {
        return this._theme_tarif;
    }

    set theme_tarif(theme_tarif: number) {
        if (theme_tarif <= 0) {
            throw new Error("Le theme_tarif doit être supérieur à 0\n");
        }
        this._theme_tarif = theme_tarif;
    }
        toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau: APIsql.TtabAsso = {
            'theme_num': this.theme_num.toString(),
            'theme_lib': this.theme_lib,
            'theme_tarif': this.theme_tarif.toString()
        };
        return tableau;
    }
}

type TTheme = { [key: string]: UnTheme }; // tableau d’objets UnThem
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesThemes { // définition de la classe gérant les données de la table TYPE_EQUIPT
    constructor() {
        // rien
    }
    
    private load(result: APIsql.TdataSet): TTheme {
        // à partir d’un TdataSet, conversion en tableau d’objets UnThem
        let Theme: TTheme = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const Them = new UnTheme(
                parseInt(item['theme_num']),
                item['theme_lib'],
                parseInt(item['theme_tarif'])
            );
            Theme[item['theme_num']] = Them; // affecte l’objet « Them » dans le tableau associatif « Theme »
        }
        return Theme;
    }
    private prepare(where: string): string { // préparation de la requête avec ou sans restriction (WHERE)
        let sql: string;
        sql = "SELECT *";
        sql += " FROM theme"
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY theme_lib ASC ";
        return sql;
    }
    all(): TTheme { // renvoie le tableau d’objets contenant tous les équipements
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }

    byThemeNum(id_equipt: string): UnTheme { // renvoie l’objet correspondant à l’équipement id_equipt
        let Them = new UnTheme;
        const Theme: TTheme = this.load(APIsql.sqlWeb.SQLloadData
            (this.prepare("theme_num = ?"), [id_equipt]));
        const lesCles: string[] = Object.keys(Theme);
        // affecte les clés du tableau associatif « Theme » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            Them = Theme[lesCles[0]]; // récupérer le 1er élément du tableau associatif « Theme »
        }
        return Them;
    }

    toArray(Theme: TTheme): APIsql.TdataSet { // renvoie le tableau d’objets sous la forme
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in Theme) {
            T.push(Theme[id].toArray());
        }
        return T;
    }
}

//a partir d'ici c'est different 

class UnThemeByAdhesion {
    private _unTheme: UnTheme;
    private _theme_tarif: number;
    
    constructor(unThem: UnTheme = new UnTheme(), theme_tarif: number = 0) {
        this._unTheme = unThem;
        this._theme_tarif = theme_tarif
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get unThem(): UnTheme {
        return this._unTheme;
    }
    set unThem(unThem: UnTheme) {
        this._unTheme = unThem;
    }
    get theme_tarif(): number {
        return this._theme_tarif;
    }
    set theme_tarif(theme_tarif: number) {
        if (theme_tarif < 0) {
            throw new Error("La quantité doit être supérieure ou égale à 0\n");
        }
        this._theme_tarif = theme_tarif;
    }
    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = this.unThem.toArray(); // appel de la méthode « toArray » de « UnThem »
        tableau['theme_tarif'] = this.theme_tarif.toFixed(0);
        return tableau;
    }
}
type TThemeByAdhesion = { [key: string]: UnThemeByAdhesion };
// eslint-disable-next-line @typescript-eslint/no-unused-vars


class LesThemesByAdhesion { // définition de la classe gérant les données de la table adhesion
    constructor() {
        // rien
    }
    private load(result: APIsql.TdataSet): TThemeByAdhesion {
        // à partir d’un TdataSet, conversion en tableau d’objets UnThemByAdh
        const ThemeByAdhesion: TThemeByAdhesion = {};
        const lesTheme = new LesThemes();
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const unTheme = lesTheme.byThemeNum(item['theme_num']);
            const ThemByAdh = new UnThemeByAdhesion(unTheme, parseInt(item['theme_tarif']));
            ThemeByAdhesion[ThemByAdh.unThem.theme_num] = ThemByAdh;
        }
        return ThemeByAdhesion;
    }

    private prepare(where: string): string {
        let sql: string;
        sql = "SELECT theme_num, theme_tarif";
        sql += " FROM adhesion";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    byNummeroAdhesion(num: string): TThemeByAdhesion { // renvoie le tableau d’objets contenant tous les équipements
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("abon_num = ?"), [num]));
    }
    byNummeroAdhesionByTheme(num: string, theme_num: string): UnThemeByAdhesion { // renvoie l’objet correspondant à l’équipement id_equipt
        let ThemByAdh = new UnThemeByAdhesion;
        const ThemeByAdhesion: TThemeByAdhesion = this.load(APIsql.sqlWeb.SQLloadData
        (this.prepare("abon_num = ? AND theme_num = ?"), [num, theme_num]));
        if (!ThemeByAdhesion[0] === undefined) {
            ThemByAdh = ThemeByAdhesion[0];
        }
        return ThemByAdh;
    }

    toArray(ThemeByAdhesion: TThemeByAdhesion): APIsql.TdataSet { // renvoie le tableau d’objets sous la forme
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: APIsql.TdataSet = [];
        for (let id in ThemeByAdhesion) {
            T.push(ThemeByAdhesion[id].toArray());
        }
        return T;
    }

    //getTotalTarif(ThemeByAdhesion: TThemeByAdhesion): number

    delete(num_abon: string): boolean {
        let sql: string;
        sql = "DELETE FROM adhesion WHERE abon_num = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_abon]);
    }
    
    insert(num_abon: string, Theme: TThemeByAdhesion): boolean {
        // requête d’ajout des équipements avec une quantité dans « contient » installé dans « num_salle »
        let sql: string;
        let separateur = "";
        sql = "INSERT INTO adhesion(num_abon,theme_num, envoi_papier) VALUES ";
        for (let cle in Theme) {
            sql += separateur + "('" + num_abon + "','" + Theme[cle].unThem.theme_num + "','"
                + Theme[cle].theme_tarif + "')";
            separateur = ",";
        }
        return APIsql.sqlWeb.SQLexec(sql, []);
    }
}
export {connexion, UnTheme, TTheme, LesThemes, UnThemeByAdhesion, TThemeByAdhesion, LesThemesByAdhesion };