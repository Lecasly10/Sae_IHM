//adhesion = contient 
import { APIsql } from "./connexion.js";
class UneAdhésion {
    constructor(numéro = 0, theme_numéro = 0, envoi_papier = false) {
        this.abon_num = numéro;
        this.theme_num = theme_numéro;
        this.envoi_papier = envoi_papier;
    }
    get abon_numAdhé() {
        return this.abon_num;
    }
    set abon_numAdhé(nom) {
        if (nom <= 0) {
            throw new Error("Le numéro d'Adh doit être supérieur à 0\n");
        } // il faudrait verifier quil est pas deja attribué
        this.abon_num = nom;
    }
    get theme_numAdhé() {
        return this.theme_num;
    }
    set theme_numAdhé(theme_num) {
        if (theme_num <= 0) {
            throw new Error("Le numéro de thème doit être supérieur à 0\n");
        }
        this.theme_num = theme_num;
    }
    get envoi_papierAdhé() {
        return this.envoi_papier;
    }
    set envoi_papierAdhé(envoi_papier) {
        this.envoi_papier = envoi_papier; // il faudra peut etre faire une verif ici a voir
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = {
            "abon_num": this.abon_num.toString(),
            "theme_num": this.theme_num.toString(),
            "envoi_papier": this.envoi_papier.toString()
        };
        return tableau;
    }
}
class LesAdhésions {
    constructor() {
    }
    load(result) {
        const Adhesion = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const Adh = new UneAdhésion(Number(item['abon_num']), //ici ca peut bug 
            Number(item['theme_num']), //je sais pas pourquoi ya un new ici mais si il est pas la ca bug
            item['envoi_papier'] === "true" ? true : false);
            Adhesion[Adh.abon_numAdhé] = Adh; // ici on met l'adhesion dans le tableau
            // on utilise le numéro d’Adh comme clé
        }
        return Adhesion;
    }
    prepare(where) {
        // renvoie une chaîne de caractères contenant la requête SQL
        // pour récupérer les adhésions
        let sql = "SELECT abon_num, theme_num, envoi_papier FROM adhésion";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY theme_num ASC";
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    /*byAbon(abon_num: number) : TAdhésion
    {
        let Adhesion = new UneAdhésion;
        const Adhesions : TAdhésion = this.load(APIsql.sqlWeb.SQLloadData
        (this.prepare("abon_num = ?"),[abon_num.toString()]));
        const LesCles: string[] = Object.keys(Adhesions);
        if (LesCles.length > 0)
        {
            Adhesion = Adhesions[LesCles[0]];
        }
        return Adhesion;
    }*/
    toArray(adhésions) {
        // renvoie un tableau associatif contenant les adhésions
        let tableau = [];
        //const LesCles: string[] = Object.keys(adhésions);
        for (let id in adhésions) {
            tableau.push(adhésions[id].toArray());
        }
        return tableau;
    }
}
const lesAdhésions = new LesAdhésions();
class UneAdhésionAbon {
    constructor(numéro = 0, theme_numéro = 0, envoi_papier = false) {
        this.abon_num = numéro;
        this.theme_num = theme_numéro;
        this.envoi_papier = envoi_papier;
    }
    get abon_numAdhé() {
        return this.abon_num;
    }
    get theme_numAdhé() {
        return this.theme_num;
    }
    get envoi_papierAdhé() {
        return this.envoi_papier;
    }
}
const UneAdhésionAbons = new UneAdhésionAbon();
export { UneAdhésion, LesAdhésions, UneAdhésionAbon, UneAdhésionAbons, lesAdhésions };
//# sourceMappingURL=DataAdhesion.js.map