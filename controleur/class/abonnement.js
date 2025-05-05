export class Abonnement {
    constructor(numéro = 0, date = new Date(), nomAdér = "", CSp = "", Adhésion = 0, Montant = 0) {
        this.num = numéro;
        this.date = date;
    }
    get numAbonnement() {
        return this.num;
    }
    set numAbonnement(num) {
        if (num <= 0) {
            throw new Error("Le numéro d'abonnement doit être supérieur à 0\n");
        }
        this.num = num;
    }
    get dateAbonnement() {
        return this.date;
    }
    set dateAbonnement(date) {
        const today = new Date();
        if (date > today) {
            throw new Error("La date d'abonnement ne peut pas être supérieure à la date du jour\n");
        }
        this.date = date;
    }
    get commentAbonnement() {
        return this.comment;
    }
    set commentAbonnement(comment) {
        if (comment.length > 400) {
            throw new Error("Le commentaire ne peut pas dépasser 400 caractères\n");
        }
        this.comment = comment;
    }
    get adhé_numAbonnement() {
        return this.adhé_num;
    }
    set adhé_numAbonnement(num) {
        if (num <= 0) {
            throw new Error("Le numéro d'adhérent doit être supérieur à 0\n");
        }
        this.adhé_num = num;
    }
}
//# sourceMappingURL=abonnement.js.map