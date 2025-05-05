export class CSP {
    constructor(numéro, libelé) {
        this.num = numéro;
        this.lib = libelé;
    }
    get numCSP() {
        return this.num;
    }
    set numCSP(nom) {
        if (nom.toString().length > 5 || nom.toString().length < 1) {
            throw new Error("Le numéro doit être compris entre 1 et 5 caractères\n");
        }
        this.num = nom;
    }
    get libCSP() {
        return this.lib;
    }
    set libCSP(adresse) {
        if (adresse.length > 100 || adresse.length < 1) {
            throw new Error("Le libellé doit être compris entre 1 et 100 caractères\n");
        }
        if (adresse.trim() === "") {
            throw new Error("Le libellé ne peut pas être vide\n");
        }
        this.lib = adresse;
    }
}
//# sourceMappingURL=csp.js.map