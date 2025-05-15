;
class VueDetail {
    get form() { return this._form; }
    init(form) {
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
            { lib: "1", tarif_base: 100, Version: "Version 1", montant: 300 },
            { lib: "2", tarif_base: 200, Version: "Version 2", montant: 200 },
            { lib: "3", tarif_base: 300, Version: "Version 3", montant: 300 },
        ];
        for (let abo of this._abos) {
            const tr = this.form.table_abo.insertRow();
            tr.insertCell().textContent = abo.lib;
            tr.insertCell().textContent = abo.tarif_base.toString();
            tr.insertCell().textContent = abo.Version;
            tr.insertCell().textContent = abo.montant.toString();
        }
        this.form.btnRetour.onclick = () => window.location.href = './main.html';
        const params = new URLSearchParams(window.location.search);
        let index = Number(params.get("index"));
        if (index !== null) {
            console.log("Index reçu :", index);
        }
        this.form.num_adhé.value = this._data[index - 1].num.toString();
        this.form.date_adhé.value = this._data[index - 1].date;
        this.form.comm.value = "Commentaire"; // à adapter
        let num_pers = this._data[index - 1].num_pers;
        this.form.num_ad.value = num_pers.toString(); // à adapter
        this.form.nom.textContent = this._infos[num_pers - 1].nom;
        this.form.email.textContent = this._infos[num_pers - 1].email;
        this.form.adresse.textContent = this._infos[num_pers - 1].adresse;
        this.form.codeVille.textContent = this._infos[num_pers - 1].codeVille;
        this.form.categorie.textContent = this._infos[num_pers - 1].categorie;
        console.log("num_pers", num_pers);
        console.log("infos", this._infos[num_pers - 1]);
        console.log(this.form.nom.textContent);
        console.log(this.form.email.textContent);
        console.log(this.form.adresse.textContent);
        console.log(this.form.codeVille.textContent);
        console.log(this.form.categorie.textContent);
        let tot = 0;
        for (let i = 0; i < this.form.table_abo.rows.length; i++) {
            const row = this.form.table_abo.rows[i];
            const montant = Number(row.cells[3].textContent);
            tot += montant;
        }
        this.form.total.textContent = tot.toString();
    }
}
let vueDetail = new VueDetail;
export { vueDetail };
//# sourceMappingURL=class_detail.js.map