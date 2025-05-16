import {connexion, APIsql } from "../modele/connexion.js";
import { UnAdhérent, Tadherent } from "./DataAdherent.js";


class LesAdhérents{
    constructor() 
    {
    }

    private load(result: APIsql.TdataSet): Tadherent
    {
        const Adherents: Tadherent = {};
        for (let i = 0; i < result.length; i++) 
        {
            const item:APIsql.TtabAsso = result[i];
            const Adherent = new UnAdhérent
            (
                parseInt(item['adh_num']),
                item['adh_civ'],
                item['adh_nom'],
                item['adh_prenom'],
                item['adh_adr'],
                parseInt(item['adh_cp']),
                item['adh_ville'],
                item['adh_mel'],
                parseInt(item['csp_num'])
            );
            Adherents[item.adh_num] = Adherent; // affecte l’objet « Adherent » dans le tableau associatif « Adherents »
        }
        return Adherents;
    }

    private prepare(where:string):string { // préparation de la requête avec ou sans restriction (WHERE)
        let sql : string;
        sql = "SELECT * FROM adherent";
        if (where !== "")
        {
        sql += " WHERE " +where;
        }
        return sql;
    }

    all() : Tadherent { // renvoie le tableau d’objets contenant tous les Adherent
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
        }

       byNumAdh(adh_num : number) : UnAdhérent 
        { 
            // renvoie l’objet correspondant au adhénnement adh_num
            // ou un tableau vide si pas trouvé
            let adhé = new UnAdhérent;
            const adhés : Tadherent = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("adh_num = ?"),[adh_num.toString()]));
            const lesCles: string[] = Object.keys(adhés);
            // affecte les clés du tableau associatif « adhés » dans le tableau de chaines « lesCles »
            if ( lesCles.length > 0) 
            {
                adhé = adhés[lesCles[0]]; // récupérer le 1er élément du tableau associatif « adhés »
            }
            return adhé;
        }

        toArray(adhs : Tadherent) : APIsql.TdataSet 
        {
            // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs
            // pour un affichage dans un tableau HTML
            let T:APIsql.TdataSet = [];
            for (let id in adhs) 
            {
                T.push(adhs[id].toArray());
            }
            return T;
        }

        delete(adherent : UnAdhérent):boolean
        {
            // requête de suppression d’un abonnement dans la table
            let sql : string;
            sql = "DELETE FROM adherent WHERE adh_num = ?";
            // requête de manipulation : utiliser SQLexec
            return APIsql.sqlWeb.SQLexec(sql,[adherent.numAdhé.toString()]);
        }

        insert(adherent : UnAdhérent):boolean
        {
            // requête d’insertion d’un abonnement dans la table
            let sql : string;
            sql = "INSERT INTO adherent (adh_num, adh_civ, adh_nom, adh_prenom, adh_adr, adh_cp, adh_ville, adh_mel, csp_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            // requête de manipulation : utiliser SQLexec
            return APIsql.sqlWeb.SQLexec(sql,[adherent.numAdhé.toString(), adherent._adh_civAdhé,, adherent.nomAdhé, adherent._adh_adrAdhé, adherent.csp_numAdhé.toString(), adherent._adh_cpAdhé.toString(),adherent._adh_melAdhé, adherent._adh_villeAdhé , adherent.prenomAdhé]);
        }

        update(adherent : UnAdhérent):boolean
        {
            // requête de mise à jour d’un abonnement dans la table
            let sql : string;
            sql = "UPDATE adherent SET adh_num = ?, adh_civ = ?, adh_nom = ?, adh_prenom = ?, adh_adr = ?, adh_cp = ?, adh_ville = ?, adh_mel = ?, csp_num = ? WHERE adh_num = ?";
            // requête de manipulation : utiliser SQLexec
            return APIsql.sqlWeb.SQLexec(sql,[adherent.numAdhé.toString(), adherent._adh_civAdhé,, adherent.nomAdhé, adherent._adh_adrAdhé, adherent.csp_numAdhé.toString(), adherent._adh_cpAdhé.toString(),adherent._adh_melAdhé, adherent._adh_villeAdhé , adherent.prenomAdhé]);
        }

        //getNombreAdhesions
}

export {connexion, LesAdhérents};