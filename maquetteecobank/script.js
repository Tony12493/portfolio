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
            "Conception d'une maquette d'application mobile inspirée d'une solution bancaire, réalisée avec Flutter.",

        presentationTitle:
            "Présentation",

        presentationText:
            "Cette maquette mobile a été conçue avec Flutter afin de reproduire l'expérience visuelle d'une application bancaire. Le projet met principalement l'accent sur la conception de l'interface et l'expérience utilisateur.",

        featuresTitle:
            "Éléments réalisés",

        interfaceTitle:
            "Interface mobile",

        interfaceText:
            "Conception d'une interface adaptée à une application bancaire mobile.",

        navigationTitle:
            "Navigation",

        navigationText:
            "Organisation des différents écrans et parcours de navigation de l'application.",

        uiuxTitle:
            "UI / UX",

        uiuxText:
            "Travail sur la présentation visuelle et l'expérience utilisateur.",

        screenshotsTitle:
            "Captures d'écran"

    },


    en: {

        back:
            "← Back to projects",

        projectDescription:
            "Design of a mobile application mockup inspired by a banking solution, created with Flutter.",

        presentationTitle:
            "Overview",

        presentationText:
            "This mobile mockup was designed with Flutter to reproduce the visual experience of a banking application. The project mainly focuses on interface design and user experience.",

        featuresTitle:
            "Elements",

        interfaceTitle:
            "Mobile Interface",

        interfaceText:
            "Design of an interface adapted to a mobile banking application.",

        navigationTitle:
            "Navigation",

        navigationText:
            "Organization of the different screens and navigation flows of the application.",

        uiuxTitle:
            "UI / UX",

        uiuxText:
            "Focus on visual presentation and user experience.",

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