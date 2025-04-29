class Vue {
    init(form) {
        this._form = form;
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
    get form() { return this._form; }
}
let vue = new Vue;
export { vue };
//# sourceMappingURL=class_main.js.map