//adhesion = contient 

import { APIsql } from "../modele/connexion.js";
class UneAdhésion {
    private abon_num : number; // >0
    private theme_num : number; // >0
    private envoi_papier : boolean; // true ou false

    constructor(numéro: number = 0, theme_numéro: number = 0, envoi_papier: boolean = false) {
        this.abon_num = numéro;
        this.theme_num = theme_numéro;
        this.envoi_papier = envoi_papier;
    }

    get abon_numAdhé(): number {
        return this.abon_num;
    }

    set abon_numAdhé(nom: number) {
        if (nom <= 0) {
            throw new Error("Le numéro d'abonnement doit être supérieur à 0\n");
        }  // il faudrait verifier quil est pas deja attribué
        this.abon_num = nom;
    }

    get theme_numAdhé(): number {
        return this.theme_num;
    }

    set theme_numAdhé(theme_num: number) {
        if (theme_num <= 0) {
            throw new Error("Le numéro de thème doit être supérieur à 0\n");
        }
        this.theme_num = theme_num;
    }

    get envoi_papierAdhé(): boolean {
        return this.envoi_papier;
    }

    set envoi_papierAdhé(envoi_papier: boolean) {
        this.envoi_papier = envoi_papier;// il faudra peut etre faire une verif ici a voir
    }

    toArray():APIsql.TtabAsso
    {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau: APIsql.TtabAsso = {
            "abon_num": this.abon_num.toString(),
            "theme_num": this.theme_num.toString(),
            "envoi_papier": this.envoi_papier.toString()
        };
        return tableau;
    }
}

type TAdhésion = {[key: string]: UneAdhésion};

class LesAdhésions {

    constructor() {
    }

    private load(result: APIsql.TdataSet): TAdhésion 
    {
        let lesAdhésions: TAdhésion = {};
        for (let i = 0; i < result.length; i++) 
        {
            /*const item.APIsql.TtabAsso = result[i];
            const Adhes = new UneAdhésion
            (
                item.['abon_num'], 
                item.['theme_num'],
                item.['envoi_papier']
            );
            Adhes[Adhes.abon_num] = Adhes;
            */
        }
        return lesAdhésions;
    }

    private prepare(where:string): string
    {
        // renvoie une chaîne de caractères contenant la requête SQL
        // pour récupérer les adhésions
        let sql = "SELECT abon_num, theme_num, envoi_papier FROM adhésion";
        if (where.trim() !== "") 
        {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY theme_num ASC";
        return sql;
    }

    all() : TAdhésion
    {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
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

    toArray(adhésions: TAdhésion): APIsql.TdataSet
    {
        // renvoie un tableau associatif contenant les adhésions
        let tableau: APIsql.TdataSet = [];
        //const LesCles: string[] = Object.keys(adhésions);
        for (let id in adhésions) 
        {
            tableau.push(adhésions[id].toArray());
        }
        return tableau;
    }
}

const lesAdhésions = new LesAdhésions();

class UneAdhésionAbon {
    private abon_num: number; // >0
    private theme_num: number; // >0
    private envoi_papier: boolean; // true ou false

    constructor(numéro: number = 0, theme_numéro: number = 0, envoi_papier: boolean = false) {
        this.abon_num = numéro;
        this.theme_num = theme_numéro;
        this.envoi_papier = envoi_papier;
    }

    get abon_numAdhé(): number {
        return this.abon_num;
    }
    get theme_numAdhé(): number {
        return this.theme_num;
    }
    get envoi_papierAdhé(): boolean {
        return this.envoi_papier;
    }
}

const UneAdhésionAbons = new UneAdhésionAbon();
export { UneAdhésion, LesAdhésions, UneAdhésionAbon, UneAdhésionAbons, lesAdhésions };