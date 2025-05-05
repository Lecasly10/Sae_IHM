type TMainForm = {
    abonnement_edit         : HTMLElement,
    abonnement_theme        : HTMLElement,
    abonnement_theme_edit   : HTMLElement,
    btnDetail               : HTMLInputElement,
    btnAjouter              : HTMLInputElement,
    btnSupprimer            : HTMLInputElement,
    btnModifier             : HTMLInputElement,
    btnRetour               : HTMLInputElement,
    table                   : HTMLTableElement
};

class Vue {
    private _form!: TMainForm;
    private _idSelect: string = "";

    init(form: TMainForm): void {
        this._form = form;

        const tr = this.form.table.insertRow();

        this.form.btnDetail.onclick = () => function():void {vue.detail();}
        this.form.btnAjouter.onclick = () => function():void {vue.ajouter();}
        this.form.btnSupprimer.onclick = () => function():void {vue.supprimer();}
        this.form.btnModifier.onclick = () => function():void {vue.modifier();}
        this.form.btnRetour.onclick = () => function():void {vue.retour();}
        tr.onclick = () => function():void {vue.selectionLigne(tr.rowIndex);}
    }

    get form(): TMainForm {
        return this._form;
    }

    private selectionLigne(noLigne : number):void {
		if (noLigne > -1) {
			this.form.table.rows[noLigne].style.backgroundColor = '#ffffff';
		}
		this._idSelect = this.form.table.rows[noLigne].cells[0].innerHTML;
        console.log("idSelect : " + this._idSelect);
		this.form.table.rows[noLigne].style.backgroundColor = '#78c8ff';	
    }

    private ajouter(): void {
        window.location.href = "creation.html";
    }

    private supprimer(): void {
        alert("Etes-vous sûr de vouloir supprimer cet abonnement ?");
        /*
        if (this.form.liste.selectedIndex > -1) {
            this.form.liste.remove(this.form.liste.selectedIndex)
        }*/
    }

    private modifier(): void {
        window.location.href = "modification.html";
    }

    private retour(): void {
        window.location.href = "main.html";
    }

    private detail(): void {
        const target = event.target as HTMLElement;
        const row = target.closest("tr") as HTMLTableRowElement;
        if (row && row.parentElement?.tagName === "TBODY") {
            const index = row.rowIndex - 1; // -1 si ton tableau a un <thead>
            console.log("Index de la ligne cliquée :", index);
        }
        window.location.href = "detail.html";
    }
}

let vue = new Vue;

export { vue }