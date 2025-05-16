import { connexion, APIsql } from "./connexion";
import { LesCSP } from "./LesCSP"
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


    //delete

    //update

    //insert



export{ connexion, UnCSP, LesCSP };