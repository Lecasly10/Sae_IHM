//surement 

export class CSP {
    private csp_num : number; // entre 1 et 5chars
    private csp_lib : string; // non vide limité à 100chars

    constructor(numéro: number, libelé: string) {
        this.csp_num = numéro;
        this.csp_lib = libelé;
    }

    get numCSP(): number {
        return this.csp_num;
    }

    set numCSP(nom: number) {
        if (nom.toString().length > 5 || nom.toString().length < 1) {
            throw new Error("Le numéro doit être compris entre 1 et 5 caractères\n");
        }
        this.csp_num = nom;
    }

    get libCSP(): string {
        return this.csp_lib;
    }

    set libCSP(adresse: string) {
        if (adresse.length > 100 || adresse.length < 1) {
            throw new Error("Le libellé doit être compris entre 1 et 100 caractères\n");
        }
        if (adresse.trim() === "") {
            throw new Error("Le libellé ne peut pas être vide\n");
        }
        this.csp_lib = adresse;
    }
}