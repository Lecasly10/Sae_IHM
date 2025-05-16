import { connexion, APIsql } from "./connexion";
import { UnCSP } from "./DataCsp";

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
type TCSP = {[key: string]: UnCSP};

export{ connexion, UnCSP, LesCSP, TCSP};