import {connexion, APIsql } from "../modele/connexion.js";
class UnAdhérent 
{
    private _adh_num : number; // >0   
    private _adh_civ : string; // seulement M ou Mme
    private _adh_nom : string; // peut etre vide mais limie à 50chars
    private _adh_prenom : string; // peut etre vide mais limie à 50chars
    private _adh_adr : string; // peut etre vide mais limie à 50chars
    private _adh_cp : number; // peut etre vide mais limie à 5chars
    private _adh_ville : string; // peut etre vide mais limie à 30chars
    private _adh_mel : string; // peut etre vide mais limie à 50chars et respecter le format
    private _csp_num : number; // entre 1 et 5chars

    constructor(numAdh: number = 0, civi : string = "", nomAdhé: string = "", prenomAdhé: string = "", adrAdhé: string = "", cpAdhé: number = 0, villeAdhé: string = "", melAdhé: string = "", csp_numAdhé: number = 0) {
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

    set prenomAdhé(_adh_prenom: string) {
        if (_adh_prenom.length > 50) {
            throw new Error("Le _adh_prenom ne peut pas dépasser 50 caractères");
        }
        else this._adh_prenom = _adh_prenom;
    }

    get prenomAdhé(): string {
        return this._adh_prenom;
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

    get _adh_cpAdhé(): number {
        return this._adh_cp;
    }

    set _adh_cpAdhé(_adh_cp: number) {
        if (_adh_cp <= 0) {
            throw new Error("Le code postal doit être supérieur à 0");
        }
        if (_adh_cp.toString().length > 5) {
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
            'adh_cp':this._adh_cp.toString(),
            'adh_ville':this._adh_ville,
            'adh_mel':this._adh_mel,
            'csp_num':this._csp_num.toString()
        };
        return tableau;
    }
}

type Tadherent = {[key: string]: UnAdhérent};


export {connexion, UnAdhérent, Tadherent };
