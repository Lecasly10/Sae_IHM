class Theme {
    private num : number; // >0
    private lib : string; // entre 2 et 20chars
    private tarif : Float32Array; // >0

    constructor(numéro: number, libelé: string, tarif: Float32Array) {
        this.num = numéro;
        this.lib = libelé;
        this.tarif = tarif;
    }

    get numCSP(): number {
        return this.num;
    }

    set numCSP(nom: number) {
        if (nom <= 0) {
            throw new Error("Le numéro doit être supérieur à 0\n");
        }
        this.num = nom;
    }

    get libCSP(): string {
        return this.lib;
    }

    set libCSP(adresse: string) {
        if (adresse.length > 20 || adresse.length < 2) {
            throw new Error("Le libellé doit être compris entre 2 et 20 caractères\n");
        }
        this.lib = adresse;
    }

    get tarifCSP(): Float32Array {
        return this.tarif;
    }

    set tarifCSP(tarif: Float32Array) {
        for (const t of tarif) {
            if (t <= 0) {
                throw new Error("Chaque tarif doit être supérieur à 0\n");
            }
        }
        this.tarif = tarif;
    }
}