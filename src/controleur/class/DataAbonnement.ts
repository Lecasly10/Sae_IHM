//relation maitre je pense
//salle je pense

import { connexion, APIsql } from "../../modele/connexion.js";
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
            'abon_date':this._abon_date.toString(),
            'abon_comment':this._abon_comment,
            'adh_num':this._adh_num.toString() 
        };
        return tableau;
    }
}

type TAbonnement = {[key: string]: UnAbonnement};

class LesAbonnements{
    constructor() 
    {
    }

    private load(result: APIsql.TtabAsso[]): TAbonnement
    {
        const Abonnements: TAbonnement = {};
        for (let i = 0; i < result.length; i++) 
        {
            const item:APIsql.TtabAsso = result[i];
            const Abonnement = new UnAbonnement
            (
                Number(item['abon_num']),   //ici ca peut bug 
                new Date(item['abon_date']), //je sais pas pourquoi ya un new ici mais si il est pas la ca bug
                item['abon_comment'],
                item['adh_num']
            );
            Abonnements[Abonnement.numAbonnement] = Abonnement;
            // on utilise le numéro d’abonnement comme clé
        }
        return Abonnements;
    }

    private prepare(where:string):string { // préparation de la requête avec ou sans restriction (WHERE)
        let sql : string;
        sql = "SELECT abon_num, abon_date, abon_comment, adh_num, FROM abonnement";
        if (where !== "")
        {
        sql += " WHERE " +where;
        }
        return sql;
    }

    all() : TAbonnement 
    { // renvoie le tableau d’objets contenant tous les Abonnements
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
    }

    byNumAbo(abon_num : string) : UnAbonnement 
    { 
        // renvoie l’objet correspondant au abonnement abon_num
        // ou un tableau vide si pas trouvé
        let abo = new UnAbonnement;
        const abos : TAbonnement = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("abon_num = ?"),[abon_num]));
        const lesCles: string[] = Object.keys(abos);
        // affecte les clés du tableau associatif « abos » dans le tableau de chaines « lesCles »
        if ( lesCles.length > 0) 
        {
            abo = abos[lesCles[0]]; // récupérer le 1er élément du tableau associatif « abos »
        }
        return abo;
    }

    toArray(abos : TAbonnement) : APIsql.TdataSet 
    {
        // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs
        // pour un affichage dans un tableau HTML
        let T:APIsql.TdataSet = [];
        for (let id in abos) 
        {
            T.push(abos[id].toArray());
        }
        return T;
    }

    delete(abon : UnAbonnement):boolean
    {
        // requête de suppression d’un abonnement dans la table
        let sql : string;
        sql = "DELETE FROM abonnement WHERE abon_num = ?";
        // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql,[abon.numAbonnement.toString()]);
    }

    insert(abon : UnAbonnement):boolean
    {
        // requête d’insertion d’un abonnement dans la table
        let sql : string;
        sql = "INSERT INTO abonnement (abon_num, abon_date, abon_comment, adh_num) VALUES (?, ?, ?, ?)";
        // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql,[abon.numAbonnement.toString(), abon.dateAbonnement.toString(), abon.commentAbonnement, abon.adhé_numAbonnement.toString()]);
    }

    update(abon : UnAbonnement):boolean
    {
        // requête de mise à jour d’un abonnement dans la table
        let sql : string;
        sql = "UPDATE abonnement SET abon_date = ?, abon_comment = ?, adh_num = ? WHERE abon_num = ?";
        // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql,[abon.dateAbonnement.toString(), abon.commentAbonnement, abon.adhé_numAbonnement.toString(), abon.numAbonnement.toString()]);
    }

}

export {connexion, UnAbonnement, LesAbonnements}
export type {TAbonnement}