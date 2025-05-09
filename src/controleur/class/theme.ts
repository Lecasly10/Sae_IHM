//ca doit etre un truc comme adherent je pense

export class Theme {
    private theme_num : number; // >0
    private theme_lib : string; // entre 2 et 20chars
    private theme_tarif : Float32Array; // >0

    constructor(theme_numéro: number, theme_libelé: string, theme_tarif: Float32Array) {
        this.theme_num = theme_numéro;
        this.theme_lib = theme_libelé;
        this.theme_tarif = theme_tarif;
    }

    get theme_numCSP(): number {
        return this.theme_num;
    }

    set theme_numCSP(nom: number) {
        if (nom <= 0) {
            throw new Error("Le theme_numéro doit être supérieur à 0\n");
        }
        this.theme_num = nom;
    }

    get theme_libCSP(): string {
        return this.theme_lib;
    }

    set theme_libCSP(adresse: string) {
        if (adresse.length > 20 || adresse.length < 2) {
            throw new Error("Le theme_libellé doit être compris entre 2 et 20 caractères\n");
        }
        this.theme_lib = adresse;
    }

    get theme_tarifCSP(): Float32Array {
        return this.theme_tarif;
    }

    set theme_tarifCSP(theme_tarif: Float32Array) {
        for (const t of theme_tarif) {
            if (t <= 0) {
                throw new Error("Chaque theme_tarif doit être supérieur à 0\n");
            }
        }
        this.theme_tarif = theme_tarif;
    }
}