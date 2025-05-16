import {connexion, APIsql } from "../modele/connexion.js";
import { UnTheme } from "./DataTheme.js";

class UnThemeByAdhesion {
    private _unTheme: UnTheme;
    private _theme_tarif: number;
    
    constructor(unThem: UnTheme = new UnTheme(), theme_tarif: number = 0) {
        this._unTheme = unThem;
        this._theme_tarif = theme_tarif
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get unThem(): UnTheme {
        return this._unTheme;
    }
    set unThem(unThem: UnTheme) {
        this._unTheme = unThem;
    }
    get theme_tarif(): number {
        return this._theme_tarif;
    }
    set theme_tarif(theme_tarif: number) {
        if (theme_tarif < 0) {
            throw new Error("La quantité doit être supérieure ou égale à 0\n");
        }
        this._theme_tarif = theme_tarif;
    }
    toArray(): APIsql.TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = this.unThem.toArray(); // appel de la méthode « toArray » de « UnThem »
        tableau['theme_tarif'] = this.theme_tarif.toFixed(0);
        return tableau;
    }
}
type TThemeByAdhesion = { [key: string]: UnThemeByAdhesion };
// eslint-disable-next-line @typescript-eslint/no-unused-vars


export {connexion, UnThemeByAdhesion, TThemeByAdhesion};