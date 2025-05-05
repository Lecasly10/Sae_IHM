class Abonnement {
    private num : number;
    private date : Date;
    private nomAd : string;
    private CSP : string;
    private Adhé : number;
    private Mont : number;

    constructor(numéro: number = 0, date: Date = new Date(), nomAdér: string = "", CSp: string = "", Adhésion: number = 0, Montant: number = 0) { //appel base de données
        this.num = numéro;
        this.date = date;
        this.nomAd = nomAdér;
        this.CSP = CSp;
        this.Adhé = Adhésion;
        this.Mont = Montant;
    }

    get numAbonnement(): number {
        return this.num;
    }
    set numAbonnement(num: number) {
        this.num = num;
    }
    get dateAbonnement(): Date {
        return this.date;
    }
    set dateAbonnement(date: Date) {
        this.date = date;
    }
    get nomAdhérent(): string {
        return this.nomAd;
    }
    set nomAdhérent(nom: string) {
        this.nomAd = nom;
    }
    get CSp(): string {
        return this.CSP;
    }
    set CSp(CSp: string) {
        this.CSP = CSp;
    }
    get Adhésion(): number {
        return this.Adhé;
    }
    set Adhésion(Adhésion: number) {
        this.Adhé = Adhésion;
    }
    get Montant(): number {
        return this.Mont;
    }
    set Montant(Montant: number) {
        this.Mont = Montant;
    }
}

let abonnement = new Abonnement();

export { abonnement }