class Vue {
    init(form) {
        this._form = form;
        this.form.btnDetail.onclick = () => this.detail();
        this.form.btnAjouter.onclick = () => this.ajouter();
        this.form.btnSupprimer.onclick = () => this.supprimer();
        this.form.btnModifier.onclick = () => this.modifier();
        this.form.btnRetour.onclick = () => this.retour();
    }
    get form() {
        return this._form;
    }
    ajouterLigne(ab) {
        const tbody = document.getElementById("tableBody");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${ab.numero}</td>
            <td>${ab.le}</td>
            <td>${ab.adherent}</td>
            <td>${ab.csp}</td>
            <td>${ab.adhesion}</td>
            <td>${ab.montant}</td>
        `;
        tbody.appendChild(tr);
    }
    ajouter() {
        const nouvelAbonnement = {
            numero: "9999",
            le: "salle test",
            adherent: "testeur",
            csp: "INFO",
            adhesion: "Informatique",
            montant: 99
        };
        this.ajouterLigne(nouvelAbonnement);
        // Redirection si nécessaire
        // window.location.href = "creation.html";
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
let vue = new Vue;
export { vue };
//# sourceMappingURL=class_main.js.map