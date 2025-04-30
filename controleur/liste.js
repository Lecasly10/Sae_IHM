"use strict";
class VueSalleListe {
    constructor(form) {
        this._idSelect = ''; // Utilisation d'une propriété privée pour l'id sélectionné
        this._noLigne = -1; // Utilisation d'une propriété privée pour le numéro de ligne sélectionnée
        this.idSelect = ''; // Si tu veux garder la version publique de idSelect
        this.form = form;
    }
    selectionLigne(noLigne, id) {
        if (this.idSelect !== '') {
            // Rétablir la couleur de fond de l'ancienne ligne sélectionnée
            this.form.tableSalle.rows[this._noLigne].style.backgroundColor = '#ffffff';
        }
        // Mettre à jour l'id et le numéro de la ligne sélectionnée
        this._idSelect = id;
        this._noLigne = noLigne;
        // Modifier la couleur de fond de la nouvelle ligne sélectionnée
        this.form.tableSalle.rows[noLigne].style.backgroundColor = '#78c8ff';
    }
}
//# sourceMappingURL=liste.js.map