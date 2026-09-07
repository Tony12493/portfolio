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
            "Réalisation d'une application mobile inspirée de TikTok avec Flutter.",

        presentationTitle:
            "Présentation",

        presentationText:
            "Cette maquette mobile a été réalisée avec Flutter afin de reproduire l'interface et certains éléments visuels d'une application de vidéos courtes inspirée de TikTok.",

        featuresTitle:
            "Éléments réalisés",

        interfaceTitle:
            "Interface mobile",

        interfaceText:
            "Reproduction d'une interface de réseau social pensée pour les appareils mobiles.",

        navigationTitle:
            "Navigation",

        navigationText:
            "Mise en place d'une navigation inspirée de l'expérience utilisateur de TikTok.",

        visualTitle:
            "Design visuel",

        visualText:
            "Travail sur les éléments graphiques, les icônes et la présentation des contenus.",

        screenshotsTitle:
            "Capture d'écran"

    },


    en: {

        back:
            "← Back to projects",

        projectDescription:
            "Mobile application developed with Flutter and inspired by TikTok.",

        presentationTitle:
            "Overview",

        presentationText:
            "This mobile mockup was created with Flutter to reproduce the interface and some visual elements of a short-video application inspired by TikTok.",

        featuresTitle:
            "Elements",

        interfaceTitle:
            "Mobile Interface",

        interfaceText:
            "A social media interface designed for mobile devices.",

        navigationTitle:
            "Navigation",

        navigationText:
            "Navigation inspired by the user experience of TikTok.",

        visualTitle:
            "Visual Design",

        visualText:
            "Work on graphical elements, icons and content presentation.",

        screenshotsTitle:
            "Screenshot"

    }

};


/* =========================================================
   TRADUCTION
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