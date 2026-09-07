/* =========================================================
   MODE SOMBRE — THEME GLOBAL
========================================================= */

const themeToggle =
    document.getElementById("theme-toggle");


function updateTheme() {

    const savedTheme =
        localStorage.getItem("theme");


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

    themeToggle.addEventListener(
        "click",
        function () {

            const isDark =
                document.body.classList.toggle("dark-mode");


            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );


            updateTheme();

        }
    );

}


updateTheme();


/* =========================================================
   TRADUCTIONS
========================================================= */

const projectTranslations = {

    fr: {

        back:
            "← Retour aux travaux",

        projectDescription:
            "Application web développée avec Laravel permettant à une communauté de gérer ses habitants et leurs certificats.",

        presentationTitle:
            "Présentation",

        presentationText:
            "Gestion des certificats est une application web conçue pour faciliter la gestion des habitants d'une communauté et des certificats qui leur sont associés. Le projet intègre également un système d'authentification et une gestion du paiement des certificats.",

        featuresTitle:
            "Fonctionnalités",

        authenticationTitle:
            "Authentification",

        authenticationText:
            "Gestion de l'accès des utilisateurs à l'application.",

        inhabitantsTitle:
            "Gestion des habitants",

        inhabitantsText:
            "Ajout, modification, suppression et consultation des habitants.",

        searchTitle:
            "Recherche et filtrage",

        searchText:
            "Recherche et filtrage des habitants enregistrés dans la communauté.",

        certificatesTitle:
            "Gestion des certificats",

        certificatesText:
            "Création, consultation, modification et suppression des certificats associés aux habitants.",

        paymentTitle:
            "Paiement",

        paymentText:
            "Gestion du paiement associé aux certificats avec suivi de leur statut.",

        databaseTitle:
            "Base de données",

        databaseText:
            "Stockage et gestion des informations avec MySQL et les modèles Eloquent de Laravel.",

        screenshotsTitle:
            "Captures d'écran"

    },


    en: {

        back:
            "← Back to projects",

        projectDescription:
            "Web application developed with Laravel to help a community manage its residents and their certificates.",

        presentationTitle:
            "Overview",

        presentationText:
            "Certificate Management is a web application designed to facilitate the management of community residents and their associated certificates. The project also includes an authentication system and certificate payment management.",

        featuresTitle:
            "Features",

        authenticationTitle:
            "Authentication",

        authenticationText:
            "User access management for the application.",

        inhabitantsTitle:
            "Resident Management",

        inhabitantsText:
            "Adding, editing, deleting and viewing residents.",

        searchTitle:
            "Search and Filtering",

        searchText:
            "Search and filtering of residents registered in the community.",

        certificatesTitle:
            "Certificate Management",

        certificatesText:
            "Creation, viewing, editing and deletion of certificates associated with residents.",

        paymentTitle:
            "Payment",

        paymentText:
            "Management of certificate payments and their status.",

        databaseTitle:
            "Database",

        databaseText:
            "Storage and management of information using MySQL and Laravel Eloquent models.",

        screenshotsTitle:
            "Screenshots"

    }

};


/* =========================================================
   SYSTÈME DE TRADUCTION
========================================================= */

const languageToggle =
    document.getElementById("language-toggle");


let currentLanguage =
    localStorage.getItem("language") || "fr";


function translateProject(language) {

    const elements =
        document.querySelectorAll("[data-i18n]");


    elements.forEach((element) => {

        const key =
            element.getAttribute("data-i18n");


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
            language === "fr"
                ? "FR"
                : "EN";

    }


    document.documentElement.lang =
        language;


    localStorage.setItem(
        "language",
        language
    );


    currentLanguage =
        language;

}


/* =========================================================
   BOUTON FR / EN
========================================================= */

if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        function () {

            const newLanguage =
                currentLanguage === "fr"
                    ? "en"
                    : "fr";


            translateProject(newLanguage);

        }
    );

}


/* =========================================================
   LANGUE SAUVEGARDÉE
========================================================= */

translateProject(currentLanguage);