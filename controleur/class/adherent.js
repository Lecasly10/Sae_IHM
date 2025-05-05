export class Adhérent {
    constructor(numéro, nom, civilité, adresse, ville, cp, email, csp_num) {
        this.num = numéro;
        this.nom = nom;
        this.civilité = civilité;
        this.adresse = adresse;
        this.ville = ville;
        this.cp = cp;
        this.email = email;
        this.csp_num = csp_num;
    }
    get numAdhé() {
        return this.num;
    }
    set numAdhé(num) {
        if (num <= 0) {
            throw new Error("Le numéro d'adhérent doit être supérieur à 0");
        }
        this.num = num;
    }
    get nomAdhé() {
        return this.nom;
    }
    set nomAdhé(nom) {
        if (nom.length > 50) {
            throw new Error("Le nom ne peut pas dépasser 50 caractères");
        }
        this.nom = nom;
    }
    get civilitéAdhé() {
        return this.civilité;
    }
    set civilitéAdhé(civ) {
        if (civ !== "M" && civ !== "Mme") {
            throw new Error("La civilité doit être 'M' ou 'Mme'");
        }
        this.civilité = civ;
    }
    get adresseAdhé() {
        return this.adresse;
    }
    set adresseAdhé(add) {
        if (add.length > 50) {
            throw new Error("L'adresse ne peut pas dépasser 50 caractères");
        }
        this.adresse = add;
    }
    get villeAdhé() {
        return this.ville;
    }
    set villeAdhé(ville) {
        if (ville.length > 30) {
            throw new Error("La ville ne peut pas dépasser 30 caractères");
        }
        this.ville = ville;
    }
    get cpAdhé() {
        return this.cp;
    }
    set cpAdhé(cp) {
        if (cp.length > 5) {
            throw new Error("Le code postal ne peut pas dépasser 5 caractères");
        }
        this.cp = cp;
    }
    get emailAdhé() {
        return this.email;
    }
    set emailAdhé(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length > 50) {
            throw new Error("L'email ne peut pas dépasser 50 caractères");
        }
        if (!emailRegex.test(email)) {
            throw new Error("L'email doit respecter le format valide");
        }
        this.email = email;
    }
    get csp_numAdhé() {
        return this.csp_num;
    }
    set csp_numAdhé(num) {
        if (num.toString().length > 5) {
            throw new Error("Le numéro de CSP ne peut pas dépasser 5 caractères");
        }
        this.csp_num = num;
    }
}
//# sourceMappingURL=adherent.js.map