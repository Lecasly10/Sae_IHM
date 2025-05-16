import { UnAbonnement, LesAbonnements } from "../modele/DataAbonnement";

type TMainForm = { 
	btnAjouter      		: HTMLInputElement,
	btnModifier     		: HTMLInputElement,
	btnSupprimer    		: HTMLInputElement,
    btnDetail       		: HTMLInputElement,
    btnRetour       		: HTMLInputElement,
	tableAbonnement 		: HTMLTableElement,
	abonnement_theme		: HTMLInputElement,
}

interface UneSalle { // a quoi ca sert ?
	num: number;
	date: string;
	Adherent: string;
	CSP: string;
	Adhésion: number;
	Montant: number;
}

class Vue {
	private _form: TMainForm;
	private _idSelect: string;
	private _noLigne: number;
	private _dataAbo: Array<UneSalle>;

	get form(): TMainForm { return this._form }
	get idSelect(): string { return this._idSelect }
	get noLigne(): number { return this._noLigne }

	
	init(form: TMainForm): void {
		this._form = form;
		const lesAbonnements = new LesAbonnements();
		const dataAbo = lesAbonnements.all();
		this._idSelect = '';
		
		for (let num in dataAbo)
		{
			const unAbonnement : UnAbonnement= dataAbo[num];
			const tr = this.form.tableAbonnement.insertRow();

			let balisea : HTMLAnchorElement;
			balisea = document.createElement("a");
			
			tr.insertCell().appendChild(balisea);
			tr.insertCell().textContent = unAbonnement.numAbonnement.toString();
			tr.insertCell().textContent = unAbonnement.dateAbonnement.toString();
			tr.insertCell().textContent = unAbonnement.commentAbonnement;
			tr.insertCell().textContent = unAbonnement.adhé_numAbonnement.toString();
			tr.insertCell().textContent = unAbonnement.numAbonnement.toString();
			tr.insertCell().textContent = unAbonnement.numAbonnement.toString();
		};
		

		/*
		this._dataAbo = [
			{ num: 101, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 3, Montant: 100 },
			{ num: 202, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 2, Montant: 100 },
			{ num: 303, date: "2023-01-01", Adherent: "Jean Dupont", CSP: "Actif", Adhésion: 5, Montant: 100 }
		];
		
		for (let uneSalle of this._dataAbo) {
			const tr = this.form.tableAbonnement.insertRow();
			tr.insertCell().textContent = uneSalle.num.toString();
			tr.insertCell().textContent = uneSalle.date;
			tr.insertCell().textContent = uneSalle.Adherent;
			tr.insertCell().textContent = uneSalle.CSP;
			tr.insertCell().textContent = uneSalle.Adhésion.toString();
			tr.insertCell().textContent = uneSalle.Montant.toString();
		
			tr.onclick = () => this.selectionLigne(tr.rowIndex, uneSalle.num.toString());
		}
		*/
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
		
	
		this.form.btnSupprimer.onclick = () => function():void { vue.supprimerLigne();}
	}

	detail(index:number): void {
		if (this.idSelect !== '')
			window.location.href = "../vue/detail.html?index=" + encodeURIComponent(index.toString());
	}
	supprimerLigne(): void {
		if (this.idSelect !== '') {
			alert(`Supprimer l’abonnement n°${this.idSelect} ?`);
			this.form.tableAbonnement.deleteRow(this.noLigne);
			this._noLigne = 0;
		}
	}

	selectionLigne(noLigne: number, id: string): void {
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

export { vue }