export class Theme {
    constructor(numéro, libelé, tarif) {
        this.num = numéro;
        this.lib = libelé;
        this.tarif = tarif;
    }
    get numCSP() {
        return this.num;
    }
    set numCSP(nom) {
        if (nom <= 0) {
            throw new Error("Le numéro doit être supérieur à 0\n");
        }
        this.num = nom;
    }
    get libCSP() {
        return this.lib;
    }
    set libCSP(adresse) {
        if (adresse.length > 20 || adresse.length < 2) {
            throw new Error("Le libellé doit être compris entre 2 et 20 caractères\n");
        }
        this.lib = adresse;
    }
    get tarifCSP() {
        return this.tarif;
    }
    set tarifCSP(tarif) {
        for (const t of tarif) {
            if (t <= 0) {
                throw new Error("Chaque tarif doit être supérieur à 0\n");
            }
        }
        this.tarif = tarif;
    }
}
//# sourceMappingURL=theme.js.map