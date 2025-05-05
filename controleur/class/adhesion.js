export class Adhésion {
    constructor(abo_num, them_num) {
        this.abo_num = abo_num;
        this.them_num = them_num;
    }
    get abo_numAdhé() {
        return this.abo_num;
    }
    set abo_numAdhé(nom) {
        if (nom <= 0) {
            throw new Error("Le numéro d'abonnement doit être supérieur à 0\n");
        }
        this.abo_num = nom;
    }
    get them_numAdhé() {
        return this.them_num;
    }
    set them_numAdhé(them_num) {
        if (them_num <= 0) {
            throw new Error("Le numéro de thème doit être supérieur à 0\n");
        }
        this.them_num = them_num;
    }
}
//# sourceMappingURL=adhesion.js.map