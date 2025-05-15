//a modifier peut etre plutot en Type Equipement
import { connexion, APIsql } from "./connexion";
class UnCSP {
    constructor(numCSP = 0, libCSP = "") {
        this._csp_num = numCSP;
        this._csp_lib = libCSP;
    }
    get csp_num() {
        return this._csp_num;
    }
    set csp_num(num) {
        if (num.toString().length > 5 || num.toString().length < 1) {
            throw new Error("Le numéro doit être compris entre 1 et 5 caractères\n");
        }
        this._csp_num = num;
    }
    get csp_lib() {
        return this._csp_lib;
    }
    set csp_lib(lib) {
        if (lib.length > 100 || lib.length < 1) {
            throw new Error("La description de la CSP ne peut pas dépasser 100 caractères et ne peut pas être vide\n");
        }
        this._csp_lib = lib;
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = {
            "csp_num": this._csp_num.toString(),
            "csp_lib": this._csp_lib
        };
        return tableau;
    }
}
class LesCSP {
    constructor() {
    }
    load(result) {
        let CSP = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const unCSP = new UnCSP(Number(item['csp_num']), item['csp_lib']);
            CSP[unCSP.csp_num] = unCSP;
        }
        return CSP;
    }
    prepare(where) {
        let sql;
        sql = "SELECT *";
        sql += " FROM csp";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY csp_num ASC ";
        return sql;
    }
    byNum(num) {
        let csp = new UnCSP;
        const cps = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("csp_num = ?"), [num]));
        const LesCles = Object.keys(cps);
        if (LesCles.length > 0) {
            csp = cps[LesCles[0]];
        }
        return csp;
    }
    toArray(csp) {
        let T = [];
        for (let id in csp) {
            T.push(csp[id].toArray());
        }
        return T;
    }
}
export { connexion, UnCSP, LesCSP };
//# sourceMappingURL=DataCsp.js.map