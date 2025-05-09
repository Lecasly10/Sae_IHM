//département je pense

import { connexion, APIsql } from "../../modele/connexion.ts";
class UnAdhérent 
{
    private _adh_num : number; // >0   
    private _adh_civ : string; // seulement M ou Mme
    private _adh_nom : string; // peut etre vide mais limie à 50chars
    private _adh_prenom : string; // peut etre vide mais limie à 50chars
    private _adh_adr : string; // peut etre vide mais limie à 50chars
    private _adh_cp : string; // peut etre vide mais limie à 5chars
    private _adh_ville : string; // peut etre vide mais limie à 30chars
    private _adh_mel : string; // peut etre vide mais limie à 50chars et respecter le format
    private _csp_num : number; // entre 1 et 5chars

    constructor(numAdh: number = 0, civi : string = "", nomAdhé: string = "", prenomAdhé: string = "", adrAdhé: string = "", cpAdhé: string = "", villeAdhé: string = "", melAdhé: string = "", csp_numAdhé: number = 0) {
        this._adh_num = numAdh;
        this._adh_civ = civi;
        this._adh_nom = nomAdhé;
        this._adh_prenom = prenomAdhé;
        this._adh_adr = adrAdhé;
        this._adh_cp = cpAdhé;
        this._adh_ville = villeAdhé;
        this._adh_mel = melAdhé;
        this._csp_num = csp_numAdhé;
    }

    get numAdhé(): number {
        return this._adh_num;
    }

    set numAdhé(_adh_num: number) {
        if (_adh_num <= 0) {
            throw new Error("Le numéro d'adhérent doit être supérieur à 0");
        }
        this._adh_num = _adh_num;
    }

    get nomAdhé(): string {
        return this._adh_nom;
    }

    set nomAdhé(_adh_nom: string) {
        if (_adh_nom.length > 50) {
            throw new Error("Le _adh_nom ne peut pas dépasser 50 caractères");
        }
        this._adh_nom = _adh_nom;
    }

    get _adh_civAdhé(): string {
        return this._adh_civ;
    }

    set _adh_civAdhé(civ: string) {
        if (civ !== "M" && civ !== "Mme") {
            throw new Error("La _adh_civ doit être 'M' ou 'Mme'");
        }
        this._adh_civ = civ;
    }

    get _adh_adrAdhé(): string {
        return this._adh_adr;
    }

    set _adh_adrAdhé(add: string) {
        if (add.length > 50) {
            throw new Error("L'_adh_adr ne peut pas dépasser 50 caractères");
        }
        this._adh_adr = add;
    }

    get _adh_villeAdhé(): string {
        return this._adh_ville;
    }

    set _adh_villeAdhé(_adh_ville: string) {
        if (_adh_ville.length > 30) {
            throw new Error("La _adh_ville ne peut pas dépasser 30 caractères");
        }
        this._adh_ville = _adh_ville;
    }

    get _adh_cpAdhé(): string {
        return this._adh_cp;
    }

    set _adh_cpAdhé(_adh_cp: string) {
        if (_adh_cp.length > 5) {
            throw new Error("Le code postal ne peut pas dépasser 5 caractères");
        }
        this._adh_cp = _adh_cp;
    }

    get _adh_melAdhé(): string {
        return this._adh_mel;
    }

    set _adh_melAdhé(_adh_mel: string) {
        const _adh_melRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (_adh_mel.length > 50) {
            throw new Error("L'_adh_mel ne peut pas dépasser 50 caractères");
        }
        if (!_adh_melRegex.test(_adh_mel)) {
            throw new Error("L'_adh_mel doit respecter le format valide");
        }
        this._adh_mel = _adh_mel;
    }

    get csp_numAdhé(): number {
        return this._csp_num;
    }

    set csp_numAdhé(_adh_num: number) {
        if (_adh_num.toString().length > 5) {
            throw new Error("Le numéro de CSP ne peut pas dépasser 5 caractères");
        }

        this._csp_num = _adh_num;
    }
    toArray():APIsql.TtabAsso
    { 
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau : APIsql.TtabAsso = 
        {
            'adh_num':this._adh_num.toString(),
            'adh_nom':this._adh_nom,
            'adh_prenom':this._adh_prenom,
            'adh_adr':this._adh_adr,
            'adh_cp':this._adh_cp,
            'adh_ville':this._adh_ville,
            'adh_mel':this._adh_mel,
            'csp_num':this._csp_num.toString()
        };
        return tableau;
    }
}

type Tadherent = {[key: string]: UnAdhérent};

class LesAdhérents{
    constructor() 
    {
    }

    private load(result: APIsql.TtabAsso[]): Tadherent
    {
        const Adherents: Tadherent = {};
        for (let i = 0; i < result.length; i++) 
        {
            const item:APIsql.TtabAsso = result[i];
            const Adherent = new UnAdhérent
            (
                parseInt(item.adh_num),
                item.adh_civ,
                item.adh_nom,
                item.adh_prenom,
                item.adh_adr,
                item.adh_cp,
                item.adh_ville,
                item.adh_mel,
                parseInt(item.csp_num)
            );
            Adherents[item.adh_num] = Adherent; // affecte l’objet « Adherent » dans le tableau associatif « Adherents »
        }
        return Adherents;
    }

    private prepare(where:string):string { // préparation de la requête avec ou sans restriction (WHERE)
        let sql : string;
        sql = "SELECT * FROM adherent";
        if (where !== "")
        {
        sql += " WHERE " +where;
        }
        return sql;
    }

    all() : Tadherent { // renvoie le tableau d’objets contenant tous les Adherent
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
        }

       byNumAdh(adh_num : string) : UnAdhérent 
        { 
            // renvoie l’objet correspondant au adhénnement adh_num
            // ou un tableau vide si pas trouvé
            let adhé = new UnAdhérent;
            const adhés : Tadherent = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("adh_num = ?"),[adh_num]));
            const lesCles: string[] = Object.keys(adhés);
            // affecte les clés du tableau associatif « adhés » dans le tableau de chaines « lesCles »
            if ( lesCles.length > 0) 
            {
                adhé = adhés[lesCles[0]]; // récupérer le 1er élément du tableau associatif « adhés »
            }
            return adhé;
        }

        toArray(adhs : Tadherent) : APIsql.TdataSet 
        {
            // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs
            // pour un affichage dans un tableau HTML
            let T:APIsql.TdataSet = [];
            for (let id in adhs) 
            {
                T.push(adhs[id].toArray());
            }
            return T;
        }
}
export { UnAdhérent, LesAdhérents };
