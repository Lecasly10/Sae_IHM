import {connexion, APIsql } from "../modele/connexion.js";
import { UnTheme, TTheme } from "./DataTheme.js";

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

export {connexion, LesThemes };

