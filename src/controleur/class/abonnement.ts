export class Abonnement {
    private num : number; // > 0
    private date : Date; // <= date du jour
    private comment : string; // peut etre vide mais limie à 400chars
    private adhé_num : number; // > 0

    constructor(numéro: number = 0, date: Date = new Date(), nomAdér: string = "", CSp: string = "", Adhésion: number = 0, Montant: number = 0) {
        this.num = numéro;
        this.date = date;
    }

    get numAbonnement(): number {
        return this.num;
    }

    set numAbonnement(num: number) {
        if (num <= 0) {
            throw new Error("Le numéro d'abonnement doit être supérieur à 0\n");
        }
        this.num = num;
    }
    
    get dateAbonnement(): Date {
        return this.date;
    }

    set dateAbonnement(date: Date) {
        const today = new Date();
        if (date > today) {
            throw new Error("La date d'abonnement ne peut pas être supérieure à la date du jour\n");
        }
        this.date = date;
    }

    get commentAbonnement(): string {
        return this.comment;
    }

    set commentAbonnement(comment: string) {
        if (comment.length > 400) {
            throw new Error("Le commentaire ne peut pas dépasser 400 caractères\n");
        }
        this.comment = comment;
    }

    get adhé_numAbonnement(): number {
        return this.adhé_num;
    }

    set adhé_numAbonnement(num: number) {
        if (num <= 0) {
            throw new Error("Le numéro d'adhérent doit être supérieur à 0\n");
        }
        this.adhé_num = num;
    }
}