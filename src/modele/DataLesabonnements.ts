import {connexion, APIsql } from "../modele/connexion.js";
import { UnAbonnement, TAbonnement } from "./DataAbonnement.js";

class LesAbonnements{
    constructor() 
    {
    }

    //abo existe ?

    private load(result: APIsql.TdataSet): TAbonnement
    {
        const Abonnements: TAbonnement = {};
        for (let i = 0; i < result.length; i++) 
        {
            const item:APIsql.TtabAsso = result[i];
            const Abonnement = new UnAbonnement
            (
                parseInt(item['abon_num']),   //ici ca peut bug 
                new Date(item['abon_date']), //je sais pas pourquoi ya un new ici mais si il est pas la ca bug
                item['abon_comment'],
                item['adh_num'] //maybe parseInt(item['adh_num']) ?
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

    //montant total des abonnements
}

export {connexion, LesAbonnements };