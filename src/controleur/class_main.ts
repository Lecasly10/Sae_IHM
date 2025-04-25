type TMainForm = {
    abonnement_edit         :       HTMLElement,
    abonnement_theme        :       HTMLElement,
    abonnement_theme_edit   :       HTMLElement,
    btnDetail               :       HTMLInputElement,
    btnAjouter              :       HTMLInputElement,
    btnSupprimer            :       HTMLInputElement,
    btnModifier             :       HTMLInputElement,
    btnRetour               :       HTMLInputElement,   /*
    radio_madame            :       HTMLInputElement,
    radio_monsieur          :       HTMLInputElement,
    chk_linux               :       HTMLInputElement,
    chk_windows             :       HTMLInputElement,
    chk_autre               :       HTMLInputElement,
    select_diplome          :       HTMLSelectElement,
    select_recap            :       HTMLSelectElement,
    btn_valider             :       HTMLInputElement,
    btn_corriger            :       HTMLInputElement,
    div_recap               :       HTMLElement,
    div_formulaire          :       HTMLElement,
    div_formulaire_boutons  :       HTMLElement,
    edt_autre               :       HTMLInputElement,
    edt_commentaire         :       HTMLInputElement,
    edt_nom                 :       HTMLInputElement,
    edt_prenom              :       HTMLInputElement,
    edt_dtnais              :       HTMLInputElement,
    edt_experience          :       HTMLInputElement,*/
}

class Vue {

    private _form : TMainForm

    init(form : TMainForm):void { //constructeur
        this._form = form
        this._form.abonnement_edit.hidden = true;
        this._form.abonnement_theme.hidden = true;
        this._form.abonnement_theme_edit.hidden = true;

    /*   this.form.div_recap.hidden = true;
        this.form.edt_autre.hidden = true;

        this.form.btn_valider.onclick = function():void {vueTp4.valideSaisie();}
        this.form.btn_corriger.onclick = function():void {vueTp4.corrigeSaisie();}
        this.form.chk_autre.onchange = function():void {vueTp4.systemeAutreChange();}
        this.form.radio_monsieur.onclick = function():void {vueTp4.changeCivilite();}
        this.form.radio_madame.onclick = function():void {vueTp4.changeCivilite();}*/
    }

    get form() : TMainForm { return this._form }

    /*valideSaisie() {
        let civilite :string = "";
        if (this.form.radio_madame.checked)
            civilite = this.form.radio_madame.value
        else if (this.form.radio_monsieur.checked)
            civilite = this.form.radio_monsieur.value
        else
            civilite = "";
        const nom :string       = this.form.edt_nom.value.trim();
        const prenom :string    = this.form.edt_prenom.value.trim();
        const autre :string     = this.form.edt_autre.value.trim();
        const dtnais :Date      = this.form.edt_dtnais.valueAsDate;
        const experience :number= Number(this.form.edt_experience.value);
        const diplome :string   = this.form.select_diplome.value;

        let systeme = "";
        if (this.form.chk_windows.checked)
            systeme += this.form.chk_windows.value +", ";
        if (this.form.chk_linux.checked)
            systeme += this.form.chk_linux.value +", ";
        systeme += autre;

        let erreur = "";
        if (civilite.length === 0)
            erreur += "Civilité à sélectioner\n";
        if (nom.length === 0)
            erreur += "Nom à renseigner\n";
        if (prenom.length === 0)
            erreur += "Prénom à renseigner\n";
        if (diplome.length === 0)
            erreur += "Diplôme à sélectionner\n";
        if (dtnais === null)
            erreur += "Date de naissance à renseigner\n";
        if (experience < 1)
            erreur += "Expérience doit être supérieure à 1\n";
        if (systeme.length === 0)
            erreur += "Au moins un système doit être coché\n";
        else if (!this.form.edt_autre.hidden) {
            if (autre.length === 0)
                erreur += "Système 'autre' à préciser\n";
        }
        
        if (erreur.length !== 0)
            alert(erreur);
        else {
            this.form.div_recap.hidden = false;
            this.form.div_formulaire.style.pointerEvents = 'none';
            this.form.div_formulaire_boutons.hidden = true;

            let liste = this.form.select_recap;
            liste.length = 0;
            liste.options.add(new Option(civilite +" "+prenom+" "+nom));
            liste.options.add(new Option(dtnais.toLocaleDateString("fr")));
            liste.options.add(new Option(systeme));
            
            let an ='an';
            if (experience > 1)
                an += 's';
            liste.options.add(new Option(experience+" "+an+" d'expérience"));

            liste.options.add(new Option("diplome le plus élevé: "+diplome));
        }
    }

    changeCivilite() {
        let chaine :string;
        if (this.form.radio_madame.checked)
            chaine = "Née le";
        else
            chaine = "Né le";
        this.form.edt_dtnais.labels[0].textContent = chaine;
    }

    systemeAutreChange() {
        this.form.edt_autre.hidden = !this.form.chk_autre.checked;
        this.form.edt_autre.value = "";
        this.form.edt_autre.focus();
    }
    
    corrigeSaisie() {
        this.form.div_recap.hidden = true;
        this.form.div_formulaire_boutons.hidden = false;
        this.form.div_formulaire.style.pointerEvents = 'auto';
    }*/
}

let vue = new Vue;

export { vue }