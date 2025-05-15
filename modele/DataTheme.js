//type equipement
import { APIsql } from "./connexion.js";
class UnTheme {
    constructor(num = 0, lib = "", tarif = 0) {
        this._theme_num = num;
        this._theme_lib = lib;
        this._theme_tarif = tarif;
    }
    get theme_num() {
        return this._theme_num;
    }
    set theme_num(nom) {
        if (nom <= 0) {
            throw new Error("Le theme_numéro doit être supérieur à 0\n");
        }
        this._theme_num = nom;
    }
    get theme_lib() {
        return this._theme_lib;
    }
    set theme_lib(adresse) {
        if (adresse.length > 20 || adresse.length < 2) {
            throw new Error("Le theme_libellé doit être compris entre 2 et 20 caractères\n");
        }
        this._theme_lib = adresse;
    }
    get theme_tarif() {
        return this._theme_tarif;
    }
    set theme_tarif(theme_tarif) {
        if (theme_tarif <= 0) {
            throw new Error("Le theme_tarif doit être supérieur à 0\n");
        }
        this._theme_tarif = theme_tarif;
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = {
            'theme_num': this.theme_num.toString(),
            'theme_lib': this.theme_lib,
            'theme_tarif': this.theme_tarif.toString()
        };
        return tableau;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesThemes {
    constructor() {
        // rien
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnThem
        let Theme = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const Them = new UnTheme(parseInt(item['theme_num']), item['theme_lib'], parseInt(item['theme_tarif']));
            Theme[item['theme_num']] = Them; // affecte l’objet « Them » dans le tableau associatif « Theme »
        }
        return Theme;
    }
    prepare(where) {
        let sql;
        sql = "SELECT *";
        sql += " FROM theme";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY theme_lib ASC ";
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byThemeNum(id_equipt) {
        let Them = new UnTheme;
        const Theme = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("theme_num = ?"), [id_equipt]));
        const lesCles = Object.keys(Theme);
        // affecte les clés du tableau associatif « Theme » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            Them = Theme[lesCles[0]]; // récupérer le 1er élément du tableau associatif « Theme »
        }
        return Them;
    }
    toArray(Theme) {
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T = [];
        for (let id in Theme) {
            T.push(Theme[id].toArray());
        }
        return T;
    }
}
class UnThemeByAdhesion {
    constructor(unThem = new UnTheme(), theme_tarif = 0) {
        this._unTheme = unThem;
        this._theme_tarif = theme_tarif;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get unThem() {
        return this._unTheme;
    }
    set unThem(unThem) {
        this._unTheme = unThem;
    }
    get theme_tarif() {
        return this._theme_tarif;
    }
    set theme_tarif(theme_tarif) {
        if (theme_tarif < 0) {
            throw new Error("La quantité doit être supérieure ou égale à 0\n");
        }
        this._theme_tarif = theme_tarif;
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = this.unThem.toArray(); // appel de la méthode « toArray » de « UnThem »
        tableau['theme_tarif'] = this.theme_tarif.toFixed(0);
        return tableau;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesThemesByAdhesion {
    constructor() {
        // rien
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnThemByAdh
        const ThemeByAdhesion = {};
        const lesTheme = new LesThemes();
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const unTheme = lesTheme.byThemeNum(item['theme_num']);
            const ThemByAdh = new UnThemeByAdhesion(unTheme, parseInt(item['theme_tarif']));
            ThemeByAdhesion[ThemByAdh.unThem.theme_num] = ThemByAdh;
        }
        return ThemeByAdhesion;
    }
    prepare(where) {
        let sql;
        sql = "SELECT theme_num, theme_tarif";
        sql += " FROM adhesion";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    byNummeroAdhesion(num) {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("abon_num = ?"), [num]));
    }
    byNummeroAdhesionByTheme(num, theme_num) {
        let ThemByAdh = new UnThemeByAdhesion;
        const ThemeByAdhesion = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("abon_num = ? AND theme_num = ?"), [num, theme_num]));
        if (!ThemeByAdhesion[0] === undefined) {
            ThemByAdh = ThemeByAdhesion[0];
        }
        return ThemByAdh;
    }
    toArray(ThemeByAdhesion) {
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T = [];
        for (let id in ThemeByAdhesion) {
            T.push(ThemeByAdhesion[id].toArray());
        }
        return T;
    }
    //getTotalTarif(ThemeByAdhesion: TThemeByAdhesion): number
    delete(num_abon) {
        let sql;
        sql = "DELETE FROM adhesion WHERE abon_num = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_abon]);
    }
    insert(num_abon, Theme) {
        // requête d’ajout des équipements avec une quantité dans « contient » installé dans « num_salle »
        let sql;
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
export { UnTheme, LesThemes, UnThemeByAdhesion, LesThemesByAdhesion };
//# sourceMappingURL=DataTheme.js.map