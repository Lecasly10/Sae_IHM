type TMainForm = {
    abonnement_edit         : HTMLElement,
    abonnement_theme        : HTMLElement,
    abonnement_theme_edit   : HTMLElement,
    btnDetail               : HTMLInputElement,
    btnAjouter              : HTMLInputElement,
    btnSupprimer            : HTMLInputElement,
    btnModifier             : HTMLInputElement,
    btnRetour               : HTMLInputElement,
    tableAbonnement         : HTMLTableElement
};

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
        this.CSP= CSp;
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

class Vue {
    private _form!: TMainForm;

    init(form: TMainForm): void {
        this._form = form;

        this.form.btnDetail.onclick = () => function():void {vue.detail();}
        this.form.btnAjouter.onclick = () => function():void {vue.ajouter();}
        this.form.btnSupprimer.onclick = () => function():void {vue.supprimer();}
        this.form.btnModifier.onclick = () => function():void {vue.modifier();}
        this.form.btnRetour.onclick = () => function():void {vue.retour();}
    }

    get form(): TMainForm {
        return this._form;
    }

    ajouter(): void {
        window.location.href = "creation.html";
    }

    supprimer(): void {
        alert("Fonction de suppression déclenchée (à implémenter)");
    }

    modifier(): void {
        window.location.href = "modification.html";
    }

    retour(): void {
        window.location.href = "main.html";
    }

    detail(): void {
        window.location.href = "detail.html";
    }
}

let abonnement = new Abonnement();

let vue = new Vue;

export { vue }