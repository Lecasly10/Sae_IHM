import { vue } from "./class_detail";

vue.init (
    {
        btnDetail               :       document.querySelector('[id=btnDetail]'),
        btnAjouter              :       document.querySelector('[id=btnAjouter]'),
        btnSupprimer            :       document.querySelector('[id=btnSupprimer]'),
        btnModifier             :       document.querySelector('[id=btnModifier]'),
        btnRetour               :       document.querySelector('[id=btnRetour]'),
        tableAbonnement         :       document.querySelector('[id=table]'),
        abonnement_theme		:       document.querySelector('[id=abonnement_theme]'),
    } );