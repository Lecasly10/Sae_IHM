import { connexion, APIsql } from "./connexion";
class UnCSP {
    private _csp_num : number; // entre 1 et 5chars
    private _csp_lib : string; // non vide limité à 100chars

    constructor(numCSP: number = 0, libCSP: string = "") {
        this._csp_num = numCSP;
        this._csp_lib = libCSP;
    }

    get csp_num(): number {
        return this._csp_num;
    }

    set csp_num(num: number) {
        if (num.toString().length > 5 || num.toString().length < 1) {
            throw new Error("Le numéro doit être compris entre 1 et 5 caractères\n");
        }
        this._csp_num = num;
    }

    get csp_lib(): string {
        return this._csp_lib;
    }

    set csp_lib(lib: string) {
        if (lib.length > 100 || lib.length < 1) {
            throw new Error("La description de la CSP ne peut pas dépasser 100 caractères et ne peut pas être vide\n");
        }
        this._csp_lib = lib;
    }
    
    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau: APIsql.TtabAsso = {
            "csp_num": this._csp_num.toString(),
            "csp_lib": this._csp_lib
        };
        return tableau;
    }
}

type TCSP = {[key: string]: UnCSP};

class LesCSP {
    constructor() {
    }

    private load(result: APIsql.TdataSet): TCSP {
        let CSP: TCSP = {};
        for (let i = 0; i < result.length; i++) {
            const item: APIsql.TtabAsso = result[i];
            const unCSP = new UnCSP(
                parseInt(item['csp_num']), 
                item['csp_lib']);
            CSP[unCSP.csp_num] = unCSP;
        }
        return CSP;
    }

    private prepare(where: string): string {
        let sql: string;
        sql = "SELECT *";
        sql += " FROM csp"
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY csp_num ASC ";
        return sql;
    }

    all() : TCSP
        {
            return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
        }

    byNum(num: string): UnCSP
    {
        let csp = new UnCSP;
        const cps: TCSP = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("csp_num = ?"), [num]));
        const LesCles : string[] = Object.keys(cps);
        if (LesCles.length > 0) {
            csp = cps[LesCles[0]];
        }
        return csp;
    }

    toArray(csp : TCSP): APIsql.TdataSet {
        let T: APIsql.TdataSet = [];
        for (let id in csp) {
            T.push(csp[id].toArray());
        }
        return T;
    }

    //delete

    //update

    //insert
}
export{ connexion, UnCSP, LesCSP, TCSP };