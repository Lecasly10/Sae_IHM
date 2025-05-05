export class CSP {
    private num : number; // entre 1 et 5chars
    private lib : string; // non vide limité à 100chars

    constructor(numéro: number, libelé: string) {
        this.num = numéro;
        this.lib = libelé;
    }

    get numCSP(): number {
        return this.num;
    }

    set numCSP(nom: number) {
        if (nom.toString().length > 5 || nom.toString().length < 1) {
            throw new Error("Le numéro doit être compris entre 1 et 5 caractères\n");
        }
        this.num = nom;
    }

    get libCSP(): string {
        return this.lib;
    }

    set libCSP(adresse: string) {
        if (adresse.length > 100 || adresse.length < 1) {
            throw new Error("Le libellé doit être compris entre 1 et 100 caractères\n");
        }
        if (adresse.trim() === "") {
            throw new Error("Le libellé ne peut pas être vide\n");
        }
        this.lib = adresse;
    }
}