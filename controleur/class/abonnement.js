import { connexion, APIsql } from "../../modele/connexion";
class UnAbonnement {
    constructor(numéro = 0, date = new Date(), nomAdér = "", CSp = "", Adhésion = 0, Montant = 0) {
        this._abon_num = numéro;
        this._abon_date = date;
        this._abon_comment = nomAdér;
        this._adh_num = Adhésion;
    }
    get numAbonnement() {
        return this._abon_num;
    }
    set numAbonnement(num) {
        if (num <= 0) {
            throw new Error("Le numéro d'abonnement doit être supérieur à 0\n");
        }
        this._abon_num = num;
    }
    get dateAbonnement() {
        return this._abon_date;
    }
    set dateAbonnement(date) {
        const today = new Date();
        if (date > today) {
            throw new Error("La date d'abonnement ne peut pas être supérieure à la date du jour\n");
        }
        this._abon_date = date;
    }
    get commentAbonnement() {
        return this._abon_comment;
    }
    set commentAbonnement(comment) {
        if (comment.length > 400) {
            throw new Error("Le commentaire ne peut pas dépasser 400 caractères\n");
        }
        this._abon_comment = comment;
    }
    get adhé_numAbonnement() {
        return this._adh_num;
    }
    set adhé_numAbonnement(num) {
        if (num <= 0) {
            throw new Error("Le numéro d'adhérent doit être supérieur à 0\n");
        }
        this._adh_num = num;
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = { 'abon_num': this._abon_num.toString(),
            'abon_date': this._abon_date.toString(),
            'abon_comment': this._abon_comment,
            'adh_num': this._adh_num.toString()
        };
        return tableau;
    }
}
class LesAbonnements {
    constructor() {
    }
    load(result) {
        const Abonnements = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const Abonnement = new UnAbonnement(Number(item['abon_num']), //ici ca peut bug 
            new Date(item['aexportbon_date']), //je sais pas pourquoi ya un new ici mais si il est pas la ca bug
            item['abon_comment'], item['adh_num']);
            Abonnements[Abonnement.numAbonnement] = Abonnement;
        }
        return Abonnements;
    }
    prepare(where) {
        let sql;
        sql = "SELECT abon_num, abon_date, abon_comment, adh_num, FROM abonnement";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byNumAbo(abon_num) {
        // renvoie l’objet correspondant au abonnement abon_num
        // ou un tableau vide si pas trouvé
        let abo = new UnAbonnement;
        const abos = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("abon_num = ?"), [abon_num]));
        const lesCles = Object.keys(abos);
        // affecte les clés du tableau associatif « abos » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            abo = abos[lesCles[0]]; // récupérer le 1er élément du tableau associatif « abos »
        }
        return abo;
    }
    toArray(depts) {
        // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs
        // pour un affichage dans un tableau HTML
        let T = [];
        for (let id in depts) {
            T.push(depts[id].toArray());
        }
        return T;
    }
}
export { connexion };
export { UnAbonnement };
export { LesAbonnements };
//# sourceMappingURL=abonnement.js.map