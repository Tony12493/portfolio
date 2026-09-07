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

const translations = {

    fr: {

        back:
            "← Retour aux travaux",

        title:
            "Projets en ligne",

        intro:
            "Retrouvez ici plusieurs projets que j'ai réalisés et qui sont actuellement accessibles en ligne.",

        projectsTitle:
            "Mes projets",

        online:
            "En ligne",

        url:
            "URL",

        visit:
            "Visiter le site →",

        birthdayTitle:
            "Invitation d'anniversaire",

        birthdayDescription:
            "Site web conçu pour créer et présenter une invitation personnalisée pour un anniversaire.",

        lovelyDescription:
            "Site web animé réalisé autour du thème de la Saint-Valentin, avec une expérience interactive et visuelle.",

        leaderDescription:
            "Site vitrine réalisé pour présenter les services et l'activité d'une entreprise de manière professionnelle."

    },


    en: {

        back:
            "← Back to projects",

        title:
            "Online Projects",

        intro:
            "Here you can find several projects I have created that are currently available online.",

        projectsTitle:
            "My Projects",

        online:
            "Online",

        url:
            "URL",

        visit:
            "Visit website →",

        birthdayTitle:
            "Birthday Invitation",

        birthdayDescription:
            "A website designed to create and present a personalized birthday invitation.",

        lovelyDescription:
            "An animated website created around Valentine's Day, with an interactive and visual experience.",

        leaderDescription:
            "A showcase website created to professionally present a company's services and activities."

    }

};


/* =========================================================
   LANGUE GLOBALE
========================================================= */

const languageToggle =
    document.getElementById("language-toggle");


let currentLanguage =
    localStorage.getItem("language") || "fr";


function translatePage(language) {

    const elements =
        document.querySelectorAll("[data-i18n]");

    elements.forEach(
        function (element) {

            const key =
                element.getAttribute("data-i18n");

            if (
                translations[language] &&
                translations[language][key]
            ) {

                element.textContent =
                    translations[language][key];

            }

        }
    );


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


if (languageToggle) {

    languageToggle.addEventListener(
        "click",
        function () {

            const newLanguage =
                currentLanguage === "fr"
                    ? "en"
                    : "fr";

            translatePage(newLanguage);

        }
    );

}


translatePage(currentLanguage);