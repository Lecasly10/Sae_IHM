import {connexion, APIsql } from "../modele/connexion.js";
import { UnThemeByAdhesion, TThemeByAdhesion } from "./DataThemeByAdh";
import { LesThemes,  } from "./DataLesThemes.js";

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

export {connexion, LesThemesByAdhesion};