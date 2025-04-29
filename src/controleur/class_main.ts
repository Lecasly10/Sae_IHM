type TMainForm = {
    abonnement_edit         : HTMLElement,
    abonnement_theme        : HTMLElement,
    abonnement_theme_edit   : HTMLElement,
    btnDetail               : HTMLInputElement,
    btnAjouter              : HTMLInputElement,
    btnSupprimer            : HTMLInputElement,
    btnModifier             : HTMLInputElement,
    btnRetour               : HTMLInputElement
};

interface Abonnement {
    numero: string;
    le: string;
    adherent: string;
    csp: string;
    adhesion: string;
    montant: number;
}

class Vue {
    private _form!: TMainForm;

    init(form: TMainForm): void {
        this._form = form;

        this.form.btnDetail.onclick = () => this.detail();
        this.form.btnAjouter.onclick = () => this.ajouter();
        this.form.btnSupprimer.onclick = () => this.supprimer();
        this.form.btnModifier.onclick = () => this.modifier();
        this.form.btnRetour.onclick = () => this.retour();
    }

    get form(): TMainForm {
        return this._form;
    }

    private ajouterLigne(ab: Abonnement): void {
        const tbody = document.getElementById("tableBody") as HTMLTableSectionElement;
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

    ajouter(): void {
        const nouvelAbonnement: Abonnement = {
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

let vue = new Vue;

export { vue }