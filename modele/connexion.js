import * as APIsql from "../modele/sqlWeb.js";
APIsql.sqlWeb.init("https://devweb.iutmetz.univ-lorraine.fr/~lupo9u/ihm/dossier_application/vue/", "https://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/IHM_API/");
class Connexion {
    constructor() {
        this.init();
    }
    init() {
        // à adapter avec voter nom de base et vos identifiants de connexion
        APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr', '3306', 'lupo9u_IHM', 'lupo9u_appli', '32300656', 'utf8');
    }
}
let connexion = new Connexion;
export { connexion, APIsql };
//# sourceMappingURL=connexion.js.map