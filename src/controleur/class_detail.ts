type TDetailForm = { 
    btnRetour       		: HTMLInputElement,
	num_adhé 				: HTMLInputElement,
	date_adhé 				: HTMLInputElement,
	comm					: HTMLInputElement,
	num_ad					: HTMLInputElement,
	table_abo			   	: HTMLTableElement,
}

interface Abo {
	lib: string;
	tarif_base: number;
	Version: string;
	montant: number;
}

interface UneSalle {
	num: number;
	date: string;
	Adherent: string;
	CSP: string;
	Adhésion: number;
	Montant: number;
}

class VueDetail {
	private _form: TDetailForm;
	private _idSelect: string;
	private _noLigne: number;
	private _abos: Array<Abo>;
    private _data: Array<UneSalle>;

	get form(): TDetailForm { return this._form }
	get idSelect(): string { return this._idSelect }
	get noLigne(): number { return this._noLigne }

	
	init(form: TDetailForm): void {
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
		]
	
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
        this.form.num_adhé.value = this._data[index-1].num.toString();
        this.form.date_adhé.value = this._data[index-1].date;
        this.form.comm.value = "Commentaire"; // à adapter
        this.form.num_ad.value = "Numéro adhérent"; // à adapter
        console.log(this.form.num_adhé.value + " " + this.form.date_adhé.value);
	}
}

let vueDetail = new VueDetail;

export { vueDetail }
