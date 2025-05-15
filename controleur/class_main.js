class Vue {
    get form() { return this._form; }
    get idSelect() { return this._idSelect; }
    get noLigne() { return this._noLigne; }
    init(form) {
        console.log("URL actuelle :", window.location.href);
        this._idSelect = '';
        this._form = form;
        this._data = [
            { num: 101, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 3, Montant: 100 },
            { num: 202, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 2, Montant: 100 },
            { num: 303, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 5, Montant: 100 }
        ];
        this._abos = [
            { lib: "1", tarif_base: 100, Version: "Version 1", montant: 100 },
            { lib: "2", tarif_base: 200, Version: "Version 2", montant: 200 },
            { lib: "3", tarif_base: 300, Version: "Version 3", montant: 300 },
        ];
        for (let uneSalle of this._data) {
            const tr = this.form.tableAbonnement.insertRow();
            tr.insertCell().textContent = uneSalle.num.toString();
            tr.insertCell().textContent = uneSalle.date;
            tr.insertCell().textContent = uneSalle.Adherent;
            tr.insertCell().textContent = uneSalle.CSP;
            tr.insertCell().textContent = uneSalle.Adhésion.toString();
            tr.insertCell().textContent = uneSalle.Montant.toString();
            tr.onclick = () => this.selectionLigne(tr.rowIndex, uneSalle.num.toString());
        }
        for (let abo of this._abos) {
            const tr = this.form.table_abo.insertRow();
            tr.insertCell().textContent = abo.lib.toString();
            tr.insertCell().textContent = abo.tarif_base.toString();
            tr.insertCell().textContent = abo.Version;
            tr.insertCell().textContent = abo.montant.toString();
            tr.onclick = () => this.selectionLigne(tr.rowIndex, abo.lib);
        }
        // Gestion des boutons
        this.form.btnAjouter.onclick = () => window.location.href = '../vue/creation.html';
        this.form.btnModifier.onclick = () => {
            if (this.idSelect !== '') {
                window.location.href = '../vue/modification.html';
            }
        };
        this.form.btnDetail.onclick = () => {
            vue.detail(this.noLigne);
        };
        this.form.btnSupprimer.onclick = () => function () { vue.supprimerLigne(); };
    }
    detail(index) {
        if (this.idSelect !== '')
            window.location.href = "../vue/detail.html?index=" + encodeURIComponent(index.toString());
    }
    supprimerLigne() {
        if (this.idSelect !== '') {
            alert(`Supprimer l’abonnement n°${this.idSelect} ?`);
            this.form.tableAbonnement.deleteRow(this.noLigne);
            this._noLigne = 0;
        }
    }
    selectionLigne(noLigne, id) {
        if (this.idSelect !== '') {
            this.form.tableAbonnement.rows[this.noLigne].style.backgroundColor = '#ffffff'; // +1 à cause du thead
        }
        this._idSelect = id;
        this._noLigne = noLigne;
        console.log(this._noLigne);
        this.form.tableAbonnement.rows[noLigne].style.backgroundColor = '#78c8ff';
    }
}
let vue = new Vue;
export { vue };
//# sourceMappingURL=class_main.js.map