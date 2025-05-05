export class Adhérent {
    private num : number; // >0
    private nom : string; // peut etre vide mais limie à 50chars
    private civilité : string; // seulement M ou Mme
    private adresse : string; // peut etre vide mais limie à 50chars
    private ville : string; // peut etre vide mais limie à 30chars
    private cp : string; // peut etre vide mais limie à 5chars
    private email : string; // peut etre vide mais limie à 50chars et respecter le format
    private csp_num : number; // entre 1 et 5chars

    constructor(numéro: number, nom: string, civilité: string, adresse: string, ville: string, cp: string, email: string, csp_num: number) {
        this.num = numéro;
        this.nom = nom;
        this.civilité = civilité;
        this.adresse = adresse;
        this.ville = ville;
        this.cp = cp;
        this.email = email;
        this.csp_num = csp_num;
    }

    get numAdhé(): number {
        return this.num;
    }

    set numAdhé(num: number) {
        if (num <= 0) {
            throw new Error("Le numéro d'adhérent doit être supérieur à 0");
        }
        this.num = num;
    }

    get nomAdhé(): string {
        return this.nom;
    }

    set nomAdhé(nom: string) {
        if (nom.length > 50) {
            throw new Error("Le nom ne peut pas dépasser 50 caractères");
        }
        this.nom = nom;
    }

    get civilitéAdhé(): string {
        return this.civilité;
    }

    set civilitéAdhé(civ: string) {
        if (civ !== "M" && civ !== "Mme") {
            throw new Error("La civilité doit être 'M' ou 'Mme'");
        }
        this.civilité = civ;
    }

    get adresseAdhé(): string {
        return this.adresse;
    }

    set adresseAdhé(add: string) {
        if (add.length > 50) {
            throw new Error("L'adresse ne peut pas dépasser 50 caractères");
        }
        this.adresse = add;
    }

    get villeAdhé(): string {
        return this.ville;
    }

    set villeAdhé(ville: string) {
        if (ville.length > 30) {
            throw new Error("La ville ne peut pas dépasser 30 caractères");
        }
        this.ville = ville;
    }

    get cpAdhé(): string {
        return this.cp;
    }

    set cpAdhé(cp: string) {
        if (cp.length > 5) {
            throw new Error("Le code postal ne peut pas dépasser 5 caractères");
        }
        this.cp = cp;
    }

    get emailAdhé(): string {
        return this.email;
    }

    set emailAdhé(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length > 50) {
            throw new Error("L'email ne peut pas dépasser 50 caractères");
        }
        if (!emailRegex.test(email)) {
            throw new Error("L'email doit respecter le format valide");
        }
        this.email = email;
    }

    get csp_numAdhé(): number {
        return this.csp_num;
    }

    set csp_numAdhé(num: number) {
        if (num.toString().length > 5) {
            throw new Error("Le numéro de CSP ne peut pas dépasser 5 caractères");
        }

        this.csp_num = num;
    }
}