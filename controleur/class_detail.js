window.addEventListener("DOMContentLoaded", () => {
    const dataStr = localStorage.getItem("abonnementDetail");
    if (!dataStr) {
        console.error("Aucune donnée trouvée dans localStorage pour 'abonnementDetail'");
        return;
    }
    try {
        const abonnement = JSON.parse(dataStr);
        console.log("Donnée lue depuis localStorage :", abonnement);
        const num_adhé = document.getElementById("num_adhé");
        const date_adhé = document.getElementById("date_adhé");
        const comm = document.getElementById("comm");
        const num_ad = document.getElementById("num_ad");
        if (num_adhé && date_adhé && comm && num_ad) {
            num_adhé.value = abonnement.num.toString();
            date_adhé.value = abonnement.date;
            comm.value = "Commentaire"; // ou une vraie valeur
            num_ad.value = "Num adhérent"; // idem
        }
        else {
            console.warn("Un ou plusieurs champs sont introuvables dans le DOM.");
        }
        localStorage.removeItem("abonnementDetail");
    }
    catch (e) {
        console.error("Erreur lors du parse JSON :", e);
    }
});
export {};
//# sourceMappingURL=class_detail.js.map