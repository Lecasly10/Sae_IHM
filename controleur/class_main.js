class Vue {
    init(form) {
        this._form = form;
        this.form.btnDetail.onclick = () => function () { vue.detail(); };
        this.form.btnAjouter.onclick = () => function () { vue.ajouter(); };
        this.form.btnSupprimer.onclick = () => function () { vue.supprimer(); };
        this.form.btnModifier.onclick = () => function () { vue.modifier(); };
        this.form.btnRetour.onclick = () => function () { vue.retour(); };
    }
    get form() {
        return this._form;
    }
    ajouter() {
        window.location.href = "creation.html";
    }
    supprimer() {
        alert("Etes-vous sûr de vouloir supprimer cet abonnement ?");
    }
    modifier() {
        window.location.href = "modification.html";
    }
    retour() {
        window.location.href = "main.html";
    }
    detail() {
        window.location.href = "detail.html";
    }
}
let vue = new Vue;
export { vue };
//# sourceMappingURL=class_main.js.map