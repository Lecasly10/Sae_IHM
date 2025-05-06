type TMainForm = { 
	btnAjouter      : HTMLInputElement,
	btnModifier     : HTMLInputElement,
	btnSupprimer    : HTMLInputElement,
    btnDetail       : HTMLInputElement,
    btnRetour       : HTMLInputElement,
	tableAbonnement : HTMLTableElement 
}

class Vue {
	private _form: TMainForm;
	private _idSelect: string;
	private _noLigne: number;

	get form(): TMainForm { return this._form }
	get idSelect(): string { return this._idSelect }
	get noLigne(): number { return this._noLigne }

	init(form: TMainForm): void {
		this._idSelect = '';
		this._form = form;

		const tbody = this.form.tableAbonnement.tBodies[0];
		for (let i = 0; i < tbody.rows.length; i++) {
			const row = tbody.rows[i];
			const idAbonnement = row.cells[0].textContent || '';
			row.onclick = () => this.selectionLigne(i, idAbonnement);
		}

		this.form.btnAjouter.onclick = () => window.location.href = '../vue/creation.html';
		this.form.btnModifier.onclick = () => {
			if (this.idSelect !== '') {
				window.location.href = '../vue/modification.html';
			}
		};
        this.form.btnDetail.onclick = () => {
			if (this.idSelect !== '') {
				window.location.href = '../vue/detail.html';
			}
		};
		this.form.btnSupprimer.onclick = () => {
			if (this.idSelect !== '') {
				alert(`Supprimer l’abonnement n°${this.idSelect} (action à définir).`);
			}
		};
	}

	selectionLigne(noLigne: number, id: string): void {
		if (this.idSelect !== '') {
			this.form.tableAbonnement.rows[this.noLigne + 1].style.backgroundColor = '#ffffff'; // +1 à cause du thead
		}
		this._idSelect = id;
		this._noLigne = noLigne;
		this.form.tableAbonnement.rows[noLigne + 1].style.backgroundColor = '#78c8ff';
	}
}

let vue = new Vue;

export { vue }