export class Adhésion {
    private abo_num : number; // >0
    private them_num : number; // >0

    constructor(abo_num: number, them_num: number) {
        this.abo_num = abo_num;
        this.them_num = them_num;
    }

    get abo_numAdhé(): number {
        return this.abo_num;
    }

    set abo_numAdhé(nom: number) {
        if (nom <= 0) {
            throw new Error("Le numéro d'abonnement doit être supérieur à 0\n");
        }
        this.abo_num = nom;
    }

    get them_numAdhé(): number {
        return this.them_num;
    }

    set them_numAdhé(them_num: number) {
        if (them_num <= 0) {
            throw new Error("Le numéro de thème doit être supérieur à 0\n");
        }
        this.them_num = them_num;
    }
}