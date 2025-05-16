type TDetailForm = { 
    btnRetour       		: HTMLInputElement,
	num_adhé 				: HTMLInputElement,
	date_adhé 				: HTMLInputElement,
	comm					: HTMLInputElement,
	num_ad					: HTMLInputElement,
	table_abo			   	: HTMLTableElement,
    total                   : HTMLInputElement,
    email                   : HTMLInputElement,
    adresse                 : HTMLInputElement,
    codeVille               : HTMLInputElement,
    categorie               : HTMLInputElement,
    nom                     : HTMLInputElement,
}

interface Abo { // à enlever
	lib: string;
	tarif_base: number;
	Version: string;
	montant: number;
}

interface UneSalle { // à enlever
	num: number;
	date: string;
	Adherent: string;
	CSP: string;
	Adhésion: number;
	Montant: number;
    num_pers: number;
}

interface infos { // à enlever
    nom: string,
    email: string,
    adresse: string,
    codeVille: string,
    categorie: string
};


class VueDetail {
	private _form: TDetailForm;
	private _abos: Array<Abo>;
    private _data: Array<UneSalle>;
    private _infos: Array<infos>;

	get form(): TDetailForm { return this._form }
	
	init(form: TDetailForm): void {
		this._form = form;

        this._infos = [ //tableau de test représente les données nécesseaires pour remplir le tableau
            { nom: "M. DUPONT Jean", email: "jean.dupont@example.com", adresse: "12 rue de l'Exemple", codeVille: "75001 Paris", categorie: "Cadres administratifs et commerciaux" },
            { nom: "Mme DURAND Marie", email: "euzufuezf", adresse: "34 avenue de la République", codeVille: "75002 Paris", categorie: "Professions libérales" },
            { nom: "M. MARTIN Pierre", email: "ze", adresse: "56 boulevard Saint-Germain", codeVille: "75003 Paris", categorie: "Cadres administratifs et commerciaux" },
        ];

        this._data = [ //tableau de test représente les données nécesseaires pour remplir le tableau
			{ num: 101, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 3, Montant: 100, num_pers: 1 },
			{ num: 202, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 2, Montant: 100, num_pers: 2 },
			{ num: 303, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 5, Montant: 100, num_pers: 3 },
		];

		this._abos = [ //tableau de test représente les données nécesseaires pour remplir le tableau
			{ lib: "1", tarif_base: 100, Version: "Version 1", montant: 300 },
			{ lib: "2", tarif_base: 200, Version: "Version 2", montant: 200 },
			{ lib: "3", tarif_base: 300, Version: "Version 3", montant: 300 },
		]
	
        for (let abo of this._abos) { //  remplit le tableau des abonnements avec les données dans _data
            const tr = this.form.table_abo.insertRow();
            tr.insertCell().textContent = abo.lib;
            tr.insertCell().textContent = abo.tarif_base.toString();
            tr.insertCell().textContent = abo.Version;
            tr.insertCell().textContent = abo.montant.toString();
        }
	
		this.form.btnRetour.onclick = () => window.location.href = './main.html';//retour vers la page principale

        const params = new URLSearchParams(window.location.search); //récupère le numéro de l'adhésion dans l'url
        let index = Number(params.get("index"));

        if (index !== null) {
            console.log("Index reçu :", index);
        }
        this.form.num_adhé.value = this._data[index-1].num.toString(); //remplit les infos de l'adhésion à l'aide de l'index
        this.form.date_adhé.value = this._data[index-1].date;
        this.form.comm.value = "Commentaire"; // à adapter
        let num_pers = this._data[index-1].num_pers;
        this.form.num_ad.value = num_pers.toString();// à adapter


        this.form.nom.textContent = this._infos[num_pers-1].nom; //remplit les infos de l'adhérent
        this.form.email.textContent = this._infos[num_pers-1].email;
        this.form.adresse.textContent = this._infos[num_pers-1].adresse;
        this.form.codeVille.textContent = this._infos[num_pers-1].codeVille;
        this.form.categorie.textContent = this._infos[num_pers-1].categorie;

        let tot = 0;//calcul le montant total
        for (let i = 0; i < this.form.table_abo.rows.length; i++) {
            const row = this.form.table_abo.rows[i];
            const montant = Number(row.cells[3].textContent);
            tot += montant;
        }

        this.form.total.textContent = tot.toString();//l'écrit dans le champ total
	}
}

let vueDetail = new VueDetail;

export { vueDetail }
