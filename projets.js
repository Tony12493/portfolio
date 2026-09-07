const themeToggle = document.getElementById("theme-toggle");

function updateTheme() {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }

    } else {

        document.body.classList.remove("dark-mode");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }
    }
}


if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const isDark =
            document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        updateTheme();

    });

}
const projectTranslations = {

    fr: {
        back: "← Retour aux travaux",
        projectNumber: "PROJET 01",

        projectDescription:
            "Plateforme de mise en relation entre clients, commerçants et livreurs pour la vente de produits alimentaires étrangers au Sénégal.",

        presentationTitle: "Présentation",

        presentationText:
            "CHEZNOUS est une plateforme de mise en relation entre clients, commerçants et livreurs destinée à faciliter la vente et la livraison de produits alimentaires étrangers au Sénégal.",

        featuresTitle: "Fonctionnalités",

        usersTitle: "Utilisateurs",
        usersText:
            "Gestion des clients, commerçants, livreurs et administrateurs.",

        productsTitle: "Produits",
        productsText:
            "Gestion des produits proposés par les commerçants.",

        ordersTitle: "Commandes",
        ordersText:
            "Création et gestion des commandes des clients.",

        deliveriesTitle: "Livraisons",
        deliveriesText:
            "Gestion et suivi des livraisons.",

        paymentsTitle: "Paiements",
        paymentsText:
            "Gestion du processus de paiement.",

        administrationTitle: "Administration",
        administrationText:
            "Gestion globale de la plateforme par l'administrateur.",

        screenshotsTitle: "Captures d'écran"
    },

    en: {
        back: "← Back to projects",
        projectNumber: "PROJECT 01",

        projectDescription:
            "A platform connecting customers, merchants and delivery drivers for the sale of foreign food products in Senegal.",

        presentationTitle: "Overview",

        presentationText:
            "CHEZNOUS is a platform connecting customers, merchants and delivery drivers, designed to facilitate the sale and delivery of foreign food products in Senegal.",

        featuresTitle: "Features",

        usersTitle: "Users",
        usersText:
            "Management of customers, merchants, delivery drivers and administrators.",

        productsTitle: "Products",
        productsText:
            "Management of products offered by merchants.",

        ordersTitle: "Orders",
        ordersText:
            "Creation and management of customer orders.",

        deliveriesTitle: "Deliveries",
        deliveriesText:
            "Delivery management and tracking.",

        paymentsTitle: "Payments",
        paymentsText:
            "Management of the payment process.",

        administrationTitle: "Administration",
        administrationText:
            "Overall management of the platform by the administrator.",

        screenshotsTitle: "Screenshots"
    }

};
const languageToggle = document.getElementById("language-toggle");

let currentLanguage = localStorage.getItem("language") || "fr";

function translateProject(language) {

    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {

        const key = element.getAttribute("data-i18n");

        if (
            projectTranslations[language] &&
            projectTranslations[language][key]
        ) {
            element.textContent =
                projectTranslations[language][key];
        }

    });

    if (languageToggle) {
        languageToggle.textContent =
            language === "fr" ? "FR" : "EN";
    }

    document.documentElement.lang = language;

    localStorage.setItem("language", language);

    currentLanguage = language;
}


if (languageToggle) {

    languageToggle.addEventListener("click", function () {

        const newLanguage =
            currentLanguage === "fr" ? "en" : "fr";

        translateProject(newLanguage);

    });

}


translateProject(currentLanguage);


/* Appliquer le thème enregistré au chargement */
updateTheme();