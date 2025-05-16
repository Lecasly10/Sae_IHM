import { connexion, APIsql } from "../modele/connexion.js";

class UnAbonnement {
    private _abon_num : number; // > 0
    private _abon_date : Date; // <= date du jour
    private _abon_comment : string; // peut etre vide mais limie à 400chars
    private _adh_num : number; // > 0

    constructor(numéro: number = 0, date: Date = new Date(), nomAdér: string = "", CSp: string = "", Adhésion: number = 0, Montant: number = 0) {
        this._abon_num = numéro;
        this._abon_date = date;
        this._abon_comment = nomAdér;
        this._adh_num = Adhésion;
    }

    get numAbonnement(): number {
        return this._abon_num;
    }

    set numAbonnement(num: number) {
        if (num <= 0) {
            throw new Error("Le numéro d'abonnement doit être supérieur à 0\n");
        }
        this._abon_num = num;
    }
    
    get dateAbonnement(): Date {
        return this._abon_date;
    }

    set dateAbonnement(date: Date) {
        const today = new Date();
        if (date > today) {
            throw new Error("La date d'abonnement ne peut pas être supérieure à la date du jour\n");
        }
        this._abon_date = date;
    }

    get commentAbonnement(): string {
        return this._abon_comment;
    }

    set commentAbonnement(comment: string) {
        if (comment.length > 400) {
            throw new Error("Le commentaire ne peut pas dépasser 400 caractères\n");
        }
        this._abon_comment = comment;
    }

    get adhé_numAbonnement(): number {
        return this._adh_num;
    }

    set adhé_numAbonnement(num: number) {
        if (num <= 0) {
            throw new Error("Le numéro d'adhérent doit être supérieur à 0\n");
        }
        this._adh_num = num;
    }

    toArray():APIsql.TtabAsso
    { 
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau : APIsql.TtabAsso = 
        {   'abon_num':this._abon_num.toString(),
            'abon_date':this._abon_date.toString(), //maybe toISOString().split("T")[0] ?
            'abon_comment':this._abon_comment,
            'adh_num':this._adh_num.toString() 
        };
        return tableau;
    }
}

type TAbonnement = {[key: string]: UnAbonnement};


export {connexion, UnAbonnement, TAbonnement}
