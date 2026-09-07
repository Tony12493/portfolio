/* =========================================================
   MODE SOMBRE — THEME GLOBAL
========================================================= */

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


updateTheme();


/* =========================================================
   TRADUCTIONS MY STUDY PLANNER
========================================================= */

const projectTranslations = {

    fr: {

        back: "← Retour aux travaux",

        projectDescription:
            "MyStudyPlanner est une plateforme web destinée à aider les étudiants à organiser leur travail académique et à gérer leurs tâches.",

        presentationTitle:
            "Présentation",

        presentationText:
            "MyStudyPlanner est une application web conçue pour aider les étudiants à organiser leurs tâches académiques. Le projet met en œuvre un système d'authentification, la gestion des tâches ainsi que des fonctionnalités de filtrage et de suivi de leur état.",

        featuresTitle:
            "Fonctionnalités",

        authenticationTitle:
            "Authentification",

        authenticationText:
            "Création de compte et connexion sécurisée avec mot de passe chiffré et token JWT.",

        dashboardTitle:
            "Tableau de bord",

        dashboardText:
            "Tableau de bord personnel affichant les informations de l'utilisateur connecté.",

        tasksTitle:
            "Gestion des tâches",

        tasksText:
            "Ajout, modification et suppression des tâches avec matière et niveau de priorité.",

        statusTitle:
            "Suivi des tâches",

        statusText:
            "Marquage des tâches comme terminées ou en cours afin de suivre leur progression.",

        filtersTitle:
            "Filtres",

        filtersText:
            "Filtrage des tâches par statut et par matière.",

        visualTitle:
            "Affichage visuel",

        visualText:
            "Identification visuelle des priorités et de l'état des tâches.",

        screenshotsTitle:
            "Captures d'écran"

    },


    en: {

        back: "← Back to projects",

        projectDescription:
            "MyStudyPlanner is a web platform designed to help students organize their academic work and manage their tasks.",

        presentationTitle:
            "Overview",

        presentationText:
            "MyStudyPlanner is a web application designed to help students organize their academic tasks. The project implements an authentication system, task management, filtering features and task status tracking.",

        featuresTitle:
            "Features",

        authenticationTitle:
            "Authentication",

        authenticationText:
            "Account creation and secure login with encrypted password and JWT token.",

        dashboardTitle:
            "Dashboard",

        dashboardText:
            "Personal dashboard displaying information about the connected user.",

        tasksTitle:
            "Task Management",

        tasksText:
            "Adding, editing and deleting tasks with a subject and priority level.",

        statusTitle:
            "Task Tracking",

        statusText:
            "Marking tasks as completed or in progress to track their progress.",

        filtersTitle:
            "Filters",

        filtersText:
            "Filtering tasks by status and subject.",

        visualTitle:
            "Visual Display",

        visualText:
            "Visual identification of task priorities and status.",

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
            language === "fr" ? "FR" : "EN";

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