;
const themes = [
    "science fiction",
    "bande dessinée",
    "humour",
    "aventure",
    "histoire",
    "fantastique",
    "policier"
];
class VueModif {
    get form() { return this._form; }
    get idSelect() { return this._idSelect; }
    get noLigne() { return this._noLigne; }
    init(form) {
        this._idSelect = '';
        this._form = form;
        this._infos = [
            { nom: "M. DUPONT Jean", email: "jean.dupont@example.com", adresse: "12 rue de l'Exemple", codeVille: "75001 Paris", categorie: "Cadres administratifs et commerciaux" },
            { nom: "Mme DURAND Marie", email: "euzufuezf", adresse: "34 avenue de la République", codeVille: "75002 Paris", categorie: "Professions libérales" },
            { nom: "M. MARTIN Pierre", email: "ze", adresse: "56 boulevard Saint-Germain", codeVille: "75003 Paris", categorie: "Cadres administratifs et commerciaux" },
        ];
        this._data = [
            { num: 101, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 3, Montant: 100, num_pers: 1 },
            { num: 202, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 2, Montant: 100, num_pers: 2 },
            { num: 303, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 5, Montant: 100, num_pers: 3 },
        ];
        this._abos = [
            { lib: "science fiction", tarif_base: 100, Version: "O", montant: 300, num: 1 },
            { lib: "bande dessinée", tarif_base: 200, Version: "O", montant: 200, num: 2 },
            { lib: "humour", tarif_base: 300, Version: "N", montant: 300, num: 3 },
        ];
        for (let abo of this._abos) { //remplit le tavbleau des abhesions
            const tr = this.form.table_abo.insertRow();
            tr.insertCell().textContent = abo.lib;
            tr.insertCell().textContent = abo.tarif_base.toString();
            tr.insertCell().textContent = abo.Version;
            tr.insertCell().textContent = abo.montant.toString();
            tr.onclick = () => this.selectionLigne(tr.rowIndex, abo.num.toString());
        }
        this.form.btnRetour.onclick = () => window.location.href = './main.html';
        const params = new URLSearchParams(window.location.search);
        let index = Number(params.get("index"));
        if (index !== null) {
            console.log("Index reçu :", index);
        }
        //remplit les infos de l'adhésions
        this.form.num_adhé.value = this._data[index - 1].num.toString();
        this.form.date_adhé.value = this._data[index - 1].date;
        this.form.comm.value = "Commentaire"; // à adapter
        let num_pers = this._data[index - 1].num_pers;
        this.form.num_ad.value = num_pers.toString(); // à adapter
        //remplit les infos de l'adhérent
        this.form.nom.textContent = this._infos[num_pers - 1].nom;
        this.form.email.textContent = this._infos[num_pers - 1].email;
        this.form.adresse.textContent = this._infos[num_pers - 1].adresse;
        this.form.codeVille.textContent = this._infos[num_pers - 1].codeVille;
        this.form.categorie.textContent = this._infos[num_pers - 1].categorie;
        //calcul le montant total
        let tot = 0;
        for (let i = 0; i < this.form.table_abo.rows.length; i++) {
            const row = this.form.table_abo.rows[i];
            const montant = Number(row.cells[3].textContent);
            tot += montant;
        }
        this.form.total.textContent = tot.toString();
        this.form.abonnement_theme_edit.hidden = true;
        this.form.btnRetour.onclick = () => vueModif.retour();
        this.form.btnvalider.onclick = () => vueModif.testValide();
        this.form.btnSupprimerAdhe.onclick = () => vueModif.supprimer();
        this.form.btnModifierAdhe.onclick = () => vueModif.modifier();
        this.form.btnAjouterAdhe.onclick = () => vueModif.ajouter();
        this.form.btnValidModif.onclick = () => vueModif.validerModif();
        this.form.btnAnnulModif.onclick = () => vueModif.annuler("annuler");
    }
    affich(noLigne, ver) {
        if (ver === 1) {
            const option = document.createElement("option");
            option.value = this._abos[this.noLigne - 1].lib;
            option.textContent = this._abos[this.noLigne - 1].lib;
            this.form.theme.appendChild(option);
        }
        else {
            themes.forEach(theme => {
                const option = document.createElement("option");
                option.value = theme;
                option.textContent = theme;
                this.form.theme.appendChild(option);
            });
        }
        if (this._noLigne)
            this._abos[this.noLigne - 1].Version === "O" ? this.form.papier.checked = true : this.form.papier.checked = false;
        this.form.abonnement_theme_edit.hidden = false;
    }
    validerModif() {
        let version;
        let lib;
        version = this.form.papier.checked ? "O" : "N";
        if (this.form.theme.options.length > 1) {
            if (this.form.theme.selectedIndex === -1) {
                alert("Sélectionner un abonnement");
                return;
            }
            lib = this.form.theme.options[this.form.theme.selectedIndex].value;
            const tr = this.form.table_abo.insertRow();
            tr.insertCell().textContent = lib;
            tr.insertCell().textContent = "100";
            tr.insertCell().textContent = version;
            tr.insertCell().textContent = "200";
            tr.onclick = () => this.selectionLigne(tr.rowIndex, this._abos[this.noLigne - 1].num.toString());
        }
        else {
            const row = this.form.table_abo.rows[this.noLigne - 1];
            row.cells[2].textContent = version;
        }
        vueModif.annuler("valider");
    }
    annuler(s) {
        this.form.abonnement_theme_edit.hidden = true;
        this.form.theme.options.length = 0;
        vueModif.update();
        console.log(s);
    }
    selectionLigne(noLigne, id) {
        if (this.idSelect !== '') {
            this.form.table_abo.rows[this.noLigne - 1].style.backgroundColor = '#ffffff'; // +1 à cause du thead
        }
        this._idSelect = id;
        this._noLigne = noLigne;
        this.form.table_abo.rows[noLigne - 1].style.backgroundColor = '#78c8ff';
    }
    retour() {
        window.location.href = '../vue/main.html';
    }
    testValide() {
        console.log("testValide");
        if (this.form.num_adhé.value === '') {
            alert("Numéro d'adhésion vide");
            return;
        }
        if (this.form.date_adhé.value === '') {
            alert("Date d'adhérent vide");
            return;
        }
        if (this.form.num_ad.value === '') {
            alert("Numéro d'adhérent vide");
            return;
        }
        //ajouter modif dans la bdd
        vueModif.retour();
    }
    supprimer() {
        console.log("supprimer");
        if (this.idSelect !== '') {
            alert(`Supprimer l’abonnement n°${this.idSelect} ?`);
            this.form.table_abo.deleteRow(this.noLigne - 1);
            this._noLigne = 0;
        }
        vueModif.update();
    }
    update() {
        let tot = 0;
        for (let i = 0; i < this.form.table_abo.rows.length; i++) {
            const row = this.form.table_abo.rows[i];
            const montant = Number(row.cells[3].textContent);
            tot += montant;
        }
        this.form.total.textContent = tot.toString();
    }
    modifier() {
        if (this.idSelect !== '') {
            vueModif.affich(this.noLigne, 1);
            console.log("modifier");
        }
    }
    ajouter() {
        console.log("ajouter");
        vueModif.affich(this.noLigne, 2);
    }
}
let vueModif = new VueModif;
export { vueModif };
//# sourceMappingURL=class_modif.js.map