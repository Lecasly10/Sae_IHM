class Vue {
    constructor() {
        this._idSelect = "";
    }
    init(form) {
        this._form = form;
        const tr = this.form.table.insertRow();
        this.form.btnDetail.onclick = () => function () { vue.detail(); };
        this.form.btnAjouter.onclick = () => function () { vue.ajouter(); };
        this.form.btnSupprimer.onclick = () => function () { vue.supprimer(); };
        this.form.btnModifier.onclick = () => function () { vue.modifier(); };
        this.form.btnRetour.onclick = () => function () { vue.retour(); };
        tr.onclick = () => function () { vue.selectionLigne(tr.rowIndex); };
    }
    get form() {
        return this._form;
    }
    selectionLigne(noLigne) {
        if (noLigne > -1) {
            this.form.table.rows[noLigne].style.backgroundColor = '#ffffff';
        }
        this._idSelect = this.form.table.rows[noLigne].cells[0].innerHTML;
        console.log("idSelect : " + this._idSelect);
        this.form.table.rows[noLigne].style.backgroundColor = '#78c8ff';
    }
    ajouter() {
        window.location.href = "creation.html";
    }
    supprimer() {
        alert("Etes-vous sûr de vouloir supprimer cet abonnement ?");
        /*
        if (this.form.liste.selectedIndex > -1) {
            this.form.liste.remove(this.form.liste.selectedIndex)
        }*/
    }
    modifier() {
        window.location.href = "modification.html";
    }
    retour() {
        window.location.href = "main.html";
    }
    detail() {
        const target = event.target;
        const row = target.closest("tr");
        if (row && row.parentElement?.tagName === "TBODY") {
            const index = row.rowIndex - 1; // -1 si ton tableau a un <thead>
            console.log("Index de la ligne cliquée :", index);
        }
        window.location.href = "detail.html";
    }
}
let vue = new Vue;
export { vue };
//# sourceMappingURL=class_main.js.map