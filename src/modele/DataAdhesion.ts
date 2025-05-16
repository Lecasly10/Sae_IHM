import {connexion, APIsql } from "./connexion.js";
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
            throw new Error("Le numéro d'Adh doit être supérieur à 0\n");
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


export {connexion, UneAdhésion, TAdhésion};