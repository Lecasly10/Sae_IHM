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

    private ajouter(): void {
        window.location.href = "creation.html";
    }

    private supprimer(): void {
        alert("Etes-vous sûr de vouloir supprimer cet abonnement ?");
    }

    private modifier(): void {
        window.location.href = "modification.html";
    }

    private retour(): void {
        window.location.href = "main.html";
    }

    private detail(): void {
        window.location.href = "detail.html";
    }
}

let vue = new Vue;

export { vue }