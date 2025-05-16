import {connexion, APIsql } from "./connexion.js";
class UnTheme {
    private _theme_num : number; // >0
    private _theme_lib : string; // entre 2 et 20chars
    private _theme_tarif : number; // >0

    constructor(num: number = 0, lib: string = "", tarif: number = 0) {
        this._theme_num = num;
        this._theme_lib = lib;
        this._theme_tarif = tarif;
    }

    get theme_num(): number {
        return this._theme_num;
    }

    set theme_num(nom: number) {
        if (nom <= 0) {
            throw new Error("Le theme_numéro doit être supérieur à 0\n");
        }
        this._theme_num = nom;
    }

    get theme_lib(): string {
        return this._theme_lib;
    }

    set theme_lib(adresse: string) {
        if (adresse.length > 20 || adresse.length < 2) {
            throw new Error("Le theme_libellé doit être compris entre 2 et 20 caractères\n");
        }
        this._theme_lib = adresse;
    }

    get theme_tarif(): number {
        return this._theme_tarif;
    }

    set theme_tarif(theme_tarif: number) {
        if (theme_tarif <= 0) {
            throw new Error("Le theme_tarif doit être supérieur à 0\n");
        }
        this._theme_tarif = theme_tarif;
    }
        toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau: APIsql.TtabAsso = {
            'theme_num': this.theme_num.toString(),
            'theme_lib': this.theme_lib,
            'theme_tarif': this.theme_tarif.toString()
        };
        return tableau;
    }
}

type TTheme = { [key: string]: UnTheme }; // tableau d’objets UnThem
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export {connexion, UnTheme, TTheme };