class Abonnement {
    constructor(numéro = 0, date = new Date(), nomAdér = "", CSp = "", Adhésion = 0, Montant = 0) {
        this.num = numéro;
        this.date = date;
        this.nomAd = nomAdér;
        this.CSP = CSp;
        this.Adhé = Adhésion;
        this.Mont = Montant;
    }
    get numAbonnement() {
        return this.num;
    }
    set numAbonnement(num) {
        this.num = num;
    }
    get dateAbonnement() {
        return this.date;
    }
    set dateAbonnement(date) {
        this.date = date;
    }
    get nomAdhérent() {
        return this.nomAd;
    }
    set nomAdhérent(nom) {
        this.nomAd = nom;
    }
    get CSp() {
        return this.CSP;
    }
    set CSp(CSp) {
        this.CSP = CSp;
    }
    get Adhésion() {
        return this.Adhé;
    }
    set Adhésion(Adhésion) {
        this.Adhé = Adhésion;
    }
    get Montant() {
        return this.Mont;
    }
    set Montant(Montant) {
        this.Mont = Montant;
    }
}
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
        alert("Fonction de suppression déclenchée (à implémenter)");
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
let abonnement = new Abonnement();
let vue = new Vue;
export { vue };
//# sourceMappingURL=class_main.js.map