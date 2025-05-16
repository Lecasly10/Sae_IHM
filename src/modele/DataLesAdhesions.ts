import {connexion, APIsql } from "../modele/connexion.js";
import { UneAdhésion, TAdhésion } from "./DataAdhesion.js";

class LesAdhésions {

    constructor() {
    }

    private load(result: APIsql.TdataSet): TAdhésion
    {
        const Adhesion: TAdhésion = {};
        for (let i = 0; i < result.length; i++) 
        {
            const item:APIsql.TtabAsso = result[i];
            const Adh = new UneAdhésion
            (
                parseInt(item['abon_num']),  
                parseInt(item['theme_num']), 
                item['envoi_papier'] === "true" ? true : false //maybe parseint ici
            );
            Adhesion[Adh.abon_numAdhé] = Adh;
        }
        return Adhesion;
    }

    private prepare(where:string): string
    {
        // renvoie une chaîne de caractères contenant la requête SQL
        // pour récupérer les adhésions
        let sql = "SELECT abon_num, theme_num, envoi_papier FROM adhesion";
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

    byAbon(abon_num: number) : UneAdhésion
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
    }

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

    //delete 

    //insert

    //update
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

export {connexion, LesAdhésions, UneAdhésionAbon, UneAdhésionAbons};