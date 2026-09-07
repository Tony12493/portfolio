/* =========================================================
   HORLOGE — LE TEMPS
========================================================= */

function updateClock() {

    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();


    const secondAngle =
        seconds * 6;

    const minuteAngle =
        minutes * 6 +
        seconds * 0.1;

    const hourAngle =
        (hours % 12) * 30 +
        minutes * 0.5;


    const secondHand =
        document.getElementById("second-hand");

    const minuteHand =
        document.getElementById("minute-hand");

    const hourHand =
        document.getElementById("hour-hand");


    if (secondHand) {

        secondHand.style.transform =
            `translateX(-50%) rotate(${secondAngle}deg)`;

    }


    if (minuteHand) {

        minuteHand.style.transform =
            `translateX(-50%) rotate(${minuteAngle}deg)`;

    }


    if (hourHand) {

        hourHand.style.transform =
            `translateX(-50%) rotate(${hourAngle}deg)`;

    }

}


updateClock();

setInterval(updateClock, 1000);


/* =========================================================
   ANIMATION FINALE
========================================================= */

const timeSection =
    document.querySelector("#temps");

const timeEnding =
    document.querySelector(".time-ending");


if (timeSection && timeEnding) {

    const timeObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        timeEnding.classList.add("visible");

                    }

                });

            },

            {
                threshold: 0.35
            }

        );


    timeObserver.observe(timeSection);

}
/* =========================================================
   DRAGON INTERACTIF
========================================================= */

const canvas = document.getElementById("dragon-canvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;


    /* -----------------------------------------------------
       CONFIGURATION
    ----------------------------------------------------- */

    const dragon = {

        segments: 32,

        points: [],

        head: {
            x: 0,
            y: 0
        },

        scale: 1

    };


    /* -----------------------------------------------------
       REDIMENSIONNEMENT
    ----------------------------------------------------- */

    function resizeDragon() {

        const rect =
            canvas.getBoundingClientRect();

        const ratio =
            window.devicePixelRatio || 1;

        width = rect.width;
        height = rect.height;

        canvas.width =
            width * ratio;

        canvas.height =
            height * ratio;

        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


        dragon.head.x =
            width * 0.5;

        dragon.head.y =
            height * 0.45;


        dragon.points = [];


        for (
            let i = 0;
            i < dragon.segments;
            i++
        ) {

            dragon.points.push({

                x:
                    dragon.head.x -
                    i * 5,

                y:
                    dragon.head.y +
                    Math.sin(i * 0.35) * 3,

                size:
                    Math.max(
                        2,
                        13 - i * 0.35
                    )

            });

        }

    }


    /* -----------------------------------------------------
       SOURIS
    ----------------------------------------------------- */

    document.addEventListener(
        "mousemove",
        function (event) {

            targetX =
                event.clientX;

            targetY =
                event.clientY;

        }
    );


    /* -----------------------------------------------------
       MOUVEMENT DOUX
    ----------------------------------------------------- */

    function updateDragon() {

        const rect =
            canvas.getBoundingClientRect();


        /*
         * Position de la souris
         * relativement au canvas
         */

        const localMouseX =
            targetX - rect.left;

        const localMouseY =
            targetY - rect.top;


        /*
         * Le dragon ne suit pas
         * directement la souris.
         *
         * Il la suit progressivement.
         */

        mouseX +=
            (localMouseX - mouseX) * 0.025;

        mouseY +=
            (localMouseY - mouseY) * 0.025;


        /*
         * Mouvement naturel du dragon
         */

        const time =
            Date.now() * 0.001;


        const targetHeadX =
            width * 0.5 +
            (mouseX - width * 0.5) * 0.18;


        const targetHeadY =
            height * 0.45 +
            (mouseY - height * 0.45) * 0.12;


        dragon.head.x +=
            (targetHeadX - dragon.head.x)
            * 0.035;


        dragon.head.y +=
            (targetHeadY - dragon.head.y)
            * 0.035;


        /*
         * Premier segment
         */

        dragon.points[0].x =
            dragon.head.x;

        dragon.points[0].y =
            dragon.head.y;


        /*
         * Corps du dragon
         */

        for (
            let i = 1;
            i < dragon.points.length;
            i++
        ) {

            const previous =
                dragon.points[i - 1];

            const current =
                dragon.points[i];


            const distance = 9;


            current.x +=
                (
                    previous.x -
                    current.x
                ) * 0.18;


            current.y +=
                (
                    previous.y -
                    current.y
                ) * 0.18;


            /*
             * Petite ondulation
             */

            current.y +=
                Math.sin(
                    time * 2 +
                    i * 0.45
                ) * 0.12;


            /*
             * Maintenir les segments
             * suffisamment proches
             */

            const dx =
                current.x -
                previous.x;

            const dy =
                current.y -
                previous.y;

            const length =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (length > distance) {

                const ratio =
                    distance / length;

                current.x =
                    previous.x +
                    dx * ratio;

                current.y =
                    previous.y +
                    dy * ratio;

            }

        }

    }


    /* -----------------------------------------------------
       DESSIN DU DRAGON
    ----------------------------------------------------- */

    function drawDragon() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /*
         * Lueur très discrète
         */

        ctx.shadowColor =
            "rgba(201, 162, 39, 0.35)";

        ctx.shadowBlur = 8;


        /*
         * Corps
         */

        for (
            let i = 0;
            i < dragon.points.length - 1;
            i++
        ) {

            const current =
                dragon.points[i];

            const next =
                dragon.points[i + 1];


            const opacity =
                0.85 -
                i /
                dragon.points.length *
                0.65;


            ctx.beginPath();

            ctx.moveTo(
                current.x,
                current.y
            );

            ctx.lineTo(
                next.x,
                next.y
            );


            ctx.strokeStyle =
                `rgba(201, 162, 39, ${opacity})`;

            ctx.lineWidth =
                Math.max(
                    0.7,
                    current.size * 0.18
                );

            ctx.stroke();

        }


        /*
         * Écailles / petites lignes
         */

        for (
            let i = 2;
            i < dragon.points.length - 2;
            i += 2
        ) {

            const current =
                dragon.points[i];

            const previous =
                dragon.points[i - 1];

            const next =
                dragon.points[i + 1];


            const angle =
                Math.atan2(
                    next.y - previous.y,
                    next.x - previous.x
                );


            const sideAngle =
                angle + Math.PI / 2;


            const length =
                Math.max(
                    3,
                    current.size * 0.8
                );


            ctx.beginPath();

            ctx.moveTo(
                current.x,
                current.y
            );

            ctx.lineTo(
                current.x +
                Math.cos(sideAngle) *
                length,

                current.y +
                Math.sin(sideAngle) *
                length
            );


            ctx.strokeStyle =
                "rgba(201, 162, 39, 0.35)";

            ctx.lineWidth = 0.7;

            ctx.stroke();

        }


        /*
         * Tête
         */

        drawDragonHead();


        ctx.shadowBlur = 0;

    }


    /* -----------------------------------------------------
       TÊTE DU DRAGON
    ----------------------------------------------------- */

    function drawDragonHead() {

        const head =
            dragon.points[0];

        const neck =
            dragon.points[2];


        const angle =
            Math.atan2(
                head.y - neck.y,
                head.x - neck.x
            );


        ctx.save();

        ctx.translate(
            head.x,
            head.y
        );

        ctx.rotate(angle);


        /*
         * Tête
         */

        ctx.beginPath();

        ctx.moveTo(0, -7);

        ctx.lineTo(15, 0);

        ctx.lineTo(0, 7);

        ctx.lineTo(-5, 0);

        ctx.closePath();


        ctx.strokeStyle =
            "#c9a227";

        ctx.lineWidth = 1;

        ctx.stroke();


        /*
         * Corne supérieure
         */

        ctx.beginPath();

        ctx.moveTo(4, -4);

        ctx.lineTo(11, -12);

        ctx.stroke();


        /*
         * Corne inférieure
         */

        ctx.beginPath();

        ctx.moveTo(4, 4);

        ctx.lineTo(11, 12);

        ctx.stroke();


        /*
         * Œil
         */

        ctx.beginPath();

        ctx.arc(
            7,
            -2,
            1.4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#d9b94c";

        ctx.fill();


        ctx.restore();

    }


    /* -----------------------------------------------------
       BOUCLE D'ANIMATION
    ----------------------------------------------------- */

    function animateDragon() {

        updateDragon();

        drawDragon();

        requestAnimationFrame(
            animateDragon
        );

    }


    /* -----------------------------------------------------
       INITIALISATION
    ----------------------------------------------------- */

    resizeDragon();

    window.addEventListener(
        "resize",
        resizeDragon
    );

    animateDragon();

}
/* =========================================================
   FORMULAIRE DE CONTACT — EMAILJS
========================================================= */

emailjs.init({
    publicKey: "nQko6wbAX15j6Ks83"
});


const contactForm = document.getElementById("contact-form");


if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const button = contactForm.querySelector(
            'button[type="submit"]'
        );


        button.textContent = "Envoi en cours...";
        button.disabled = true;


        emailjs.sendForm(
    "default_service",
    "template_atjwqfr",
    contactForm
)
        .then(function () {

            button.textContent = "Message envoyé ✓";

            contactForm.reset();


            setTimeout(function () {

                button.textContent = "Envoyer";
                button.disabled = false;

            }, 3000);

        })

        .catch(function (error) {

    console.error("ERREUR EMAILJS :", error);
    console.error("STATUS :", error.status);
    console.error("TEXT :", error.text);

    alert(
        "Erreur EmailJS\n\n" +
        "Code : " + (error.status || "inconnu") + "\n" +
        "Message : " + (error.text || "inconnu")
    );

    button.textContent = "Réessayer";
    button.disabled = false;

});

    });

}
/* =========================================================
   MODE SOMBRE — THEME TOGGLE
========================================================= */

/* =========================================================
   MODE SOMBRE — THEME TOGGLE
========================================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");

function updateThemeIcon() {

    if (document.body.classList.contains("dark-mode")) {
        themeIcon.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Passer au mode clair");
    } else {
        themeIcon.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Passer au mode sombre");
    }
}

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

        updateThemeIcon();
    });

    // Restaurer le thème sauvegardé
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateThemeIcon();
}
/* =========================================================
   TRADUCTION FR / EN
========================================================= */

const translations = {

    fr: {
        navAccueil: "Accueil",
        navTravaux: "Mes travaux",
        navParcours: "Parcours",
        navContact: "Contact",

        heroIntro: "Bienvenue dans mon univers",
        heroJob: "Développeur Web",
        heroSubtitle: "Génie Logiciel & Administration Réseau",

        storyTitle: "Mon histoire",

        story1: `Je m'appelle Fokam Mogo Onil Tony, titulaire d'une Licence en Génie Logiciel et Administration Réseau.`,

        story2: `L'informatique fait partie de ces domaines qui m'ont intrigué pendant plusieurs années. Je savais qu'il s'agissait d'une science qui me plaisait, mais je n'avais pas encore trouvé ce qui allait réellement me pousser à m'y investir.`,

        story3: `Puis est arrivé un projet. Un projet que je n'ai malheureusement pas réussi à terminer du premier coup.`,

        storyHighlight: `Pourtant, quelque chose avait changé : je voulais comprendre, recommencer et réussir.`,

        story4: `J'ai continué à apprendre, à expérimenter et à avancer, jusqu'au jour où j'ai finalement réussi à réaliser quelque chose qui, pour d'autres, pouvait sembler simple, mais qui pour moi représentait beaucoup.`,

        story5: `Cette petite réussite est devenue un déclic. Depuis, je trace progressivement mon chemin dans cette vaste science.`,

        story6: `Le parcours n'est pas toujours facile, mais cette satisfaction que je ressens lorsque je parviens à créer, résoudre ou comprendre quelque chose continue de me pousser à avancer.`,

        story7: `Aujourd'hui, mon objectif est de continuer à apprendre, d'acquérir de nouvelles connaissances au fil des années et, par la grâce de Dieu, de construire une carrière dans l'un des nombreux domaines de l'informatique.`,

        discover: "Découvrir mes travaux",

        worksTitle: "Mes travaux",
        worksDescription: "Découvrez les différents projets et travaux réalisés au cours de mon parcours.",

        development: "Développement",
        developmentDescription: "Applications web, applications mobiles, sites web et solutions logicielles.",

        localProjects: "Travaux locaux",
        hostedProjects: "Travaux hébergés",

        localProject: "Projet local",
        online: "En ligne",

        cheznousTitle: "CHEZNOUS",
        mystudyplannerTitle: "MyStudyPlanner",
        certificatsTitle: "Gestion des certificats",
        websitesTitle: "Sites web vitrines",
        ecobankTitle: "Maquette Ecobank",
        tiktokTitle: "Application TikTok",

        seeProject: "Voir le projet →",
        seeProjects: "Voir les réalisations →",

        cloudTitle: "Cloud · Sécurité · Réseaux · Systèmes",
        cloudDescription: "Travaux pratiques et projets liés aux infrastructures, au cloud, à la virtualisation, aux réseaux et à la sécurité.",

        educationTitle: "Parcours",
        degreeObtained: "Diplôme obtenu",
        skillsTitle: "Technologies & compétences",

        databases: "Bases de données",
        cloudDevops: "Cloud & DevOps",
        systemsNetworks: "Systèmes & Réseaux",
        modeling: "Modélisation",

        contactTitle: "Contact",
        contactIntro: "Une opportunité, un projet ou simplement envie d'échanger ? N'hésitez pas à me contacter.",
        letsTalk: "Parlons-en.",

        email: "Email",
        phone: "Numéro de téléphone",
        linkedin: "LinkedIn",
        github: "GitHub",

        name: "Nom",
        yourName: "Votre nom",
        message: "Message",
        yourMessage: "Votre message...",
        send: "Envoyer",

        timeTitle: "Le temps",
        timeQuote: "« Chaque instant consacré à apprendre construit l'expérience de demain. »",
        timeEnding: "Le temps passe.",
        timeEndingSub: "Ce que nous en faisons construit la suite.",

        footerPortfolio: "Portfolio" ,
        cloudVirtualizationTitle: "Cloud & Virtualisation",
cloudVirtualizationDescription: `Déploiement d'une application conteneurisée
dans une architecture Cloud locale basée
sur des machines virtuelles Linux.`,

softwareCloudTitle: "Architecture logicielle & Cloud",
softwareCloudDescription: `Déploiement d'une application composée
d'une base MongoDB Atlas, d'une API Express
et d'un frontend Next.js.`,

gitLabsTitle: "Labs Git & GitHub",
gitLabsDescription: `Travaux pratiques réalisés pour comprendre
la gestion de versions, les branches,
les commits et la collaboration avec GitHub.`,

smarttechTitle: "Supervision & Administration d'infrastructure",
smarttechDescription1: `Projet SMARTTECH consacré au déploiement et à
l'administration d'une infrastructure informatique
sous Linux.`,

smarttechDescription2: `Configuration de services SSH, FTP, MariaDB et SNMP,
déploiement de Zabbix avec Docker Compose et supervision
des hôtes Linux et Windows.`,
emailPlaceholder: "votre@email.com",
cheznousDescription:
    "Plateforme de mise en relation entre clients, commerçants et livreurs pour la vente de produits alimentaires étrangers au Sénégal.",

mystudyplannerDescription:
    "Plateforme d'organisation académique destinée à aider les étudiants à mieux gérer leur travail et leur temps.",

certificatsDescription:
    "Application web Laravel permettant la gestion des certificats d'une communauté.",

sitesVitrinesDescription:
    "Conception de sites web vitrines et professionnels ainsi que de sites événementiels.",

ecobankDescription:
    "Conception d'une maquette d'application mobile inspirée d'une solution bancaire, réalisée avec Flutter.",

tiktokDescription:
    "Réalisation d'une application mobile inspirée de TikTok avec Flutter.",
        
    },

    en: {
        navAccueil: "Home",
        navTravaux: "My Work",
        navParcours: "Background",
        navContact: "Contact",

        heroIntro: "Welcome to my world",
        heroJob: "Web Developer",
        heroSubtitle: "Software Engineering & Network Administration",

        storyTitle: "My Story",

        story1: `My name is Fokam Mogo Onil Tony, holder of a Bachelor's degree in Software Engineering and Network Administration.`,

        story2: `Computer science has been one of the fields that intrigued me for several years. I knew it was a science I enjoyed, but I had not yet found what would truly push me to fully invest myself in it.`,

        story3: `Then came a project. A project that, unfortunately, I was not able to complete on my first attempt.`,

        storyHighlight: `Yet something had changed: I wanted to understand, start again and succeed.`,

        story4: `I kept learning, experimenting and moving forward, until the day I finally managed to create something that may have seemed simple to others, but meant a lot to me.`,

        story5: `That small achievement became a turning point. Since then, I have been gradually building my path through this vast field.`,

        story6: `The journey is not always easy, but the satisfaction I feel when I manage to create, solve or understand something continues to push me forward.`,

        story7: `Today, my goal is to keep learning, acquire new knowledge over the years and, by the grace of God, build a career in one of the many fields of computer science.`,

        discover: "Discover my work",

        worksTitle: "My Work",
        worksDescription: "Discover the different projects and work I have completed throughout my journey.",

        development: "Development",
        developmentDescription: "Web applications, mobile applications, websites and software solutions.",

        localProjects: "Local Projects",
        hostedProjects: "Hosted Projects",

        localProject: "Local Project",
        online: "Online",

        cheznousTitle: "CHEZNOUS",
        mystudyplannerTitle: "MyStudyPlanner",
        certificatsTitle: "Certificate Management",
        websitesTitle: "Showcase Websites",
        ecobankTitle: "Ecobank Mockup",
        tiktokTitle: "TikTok Application",

        seeProject: "View project →",
        seeProjects: "View projects →",

        cloudTitle: "Cloud · Security · Networks · Systems",
        cloudDescription: "Practical work and projects related to infrastructure, cloud computing, virtualization, networks and security.",

        educationTitle: "Background",
        degreeObtained: "Degree obtained",
        skillsTitle: "Technologies & Skills",

        databases: "Databases",
        cloudDevops: "Cloud & DevOps",
        systemsNetworks: "Systems & Networks",
        modeling: "Modeling",

        contactTitle: "Contact",
        contactIntro: "An opportunity, a project, or simply want to get in touch? Feel free to contact me.",
        letsTalk: "Let's Talk.",

        email: "Email",
        phone: "Phone",
        linkedin: "LinkedIn",
        github: "GitHub",

        name: "Name",
        yourName: "Your name",
        message: "Message",
        yourMessage: "Your message...",
        send: "Send",

        timeTitle: "Time",
        timeQuote: "“Every moment spent learning builds tomorrow's experience.”",
        timeEnding: "Time passes.",
        timeEndingSub: "What we do with it shapes what comes next.",

        footerPortfolio: "Portfolio" ,
        cloudVirtualizationTitle: "Cloud & Virtualization",
cloudVirtualizationDescription: `Deployment of a containerized application
in a local Cloud architecture based
on Linux virtual machines.`,

softwareCloudTitle: "Software Architecture & Cloud",
softwareCloudDescription: `Deployment of an application composed
of a MongoDB Atlas database, an Express API
and a Next.js frontend.`,

gitLabsTitle: "Git & GitHub Labs",
gitLabsDescription: `Practical work carried out to understand
version control, branches, commits
and collaboration with GitHub.`,

smarttechTitle: "Infrastructure Monitoring & Administration",
smarttechDescription1: `SMARTTECH project focused on the deployment and
administration of a Linux-based IT infrastructure.`,

smarttechDescription2: `Configuration of SSH, FTP, MariaDB and SNMP services,
deployment of Zabbix with Docker Compose and monitoring
of Linux and Windows hosts.`,
emailPlaceholder: "your@email.com",
cheznousDescription:
    "Platform connecting customers, merchants and delivery drivers for the sale of foreign food products in Senegal.",

mystudyplannerDescription:
    "Academic organization platform designed to help students better manage their work and time.",

certificatsDescription:
    "Laravel web application for managing certificates within a community.",

sitesVitrinesDescription:
    "Design of showcase and professional websites, as well as event websites.",

ecobankDescription:
    "Design of a mobile application mockup inspired by a banking solution, created with Flutter.",

tiktokDescription:
    "Mobile application developed with Flutter and inspired by TikTok.",
    }

};

/* =========================================================
   SYSTÈME DE TRADUCTION FR / EN
========================================================= */

const languageToggle = document.getElementById("language-toggle");

let currentLanguage = localStorage.getItem("language") || "fr";

function translatePage(language) {

    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((element) => {

        const key = element.getAttribute("data-i18n");

        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }

    });

    /* Traduction des placeholders */

    const placeholderElements =
        document.querySelectorAll("[data-i18n-placeholder]");

    placeholderElements.forEach((element) => {

        const key = element.getAttribute("data-i18n-placeholder");

        if (translations[language] && translations[language][key]) {
            element.placeholder = translations[language][key];
        }

    });

    /* Mise à jour du bouton */

    if (languageToggle) {
        languageToggle.textContent = language === "fr" ? "FR" : "EN";
    }

    document.documentElement.lang = language;

    localStorage.setItem("language", language);

    currentLanguage = language;
}


/* CLIC SUR FR / EN */

if (languageToggle) {

    languageToggle.addEventListener("click", function () {

        const newLanguage =
            currentLanguage === "fr" ? "en" : "fr";

        translatePage(newLanguage);

    });

}
/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.querySelector(".navbar nav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", function () {

        mobileNav.classList.toggle("active");

        if (mobileNav.classList.contains("active")) {
            menuToggle.textContent = "✕";
            menuToggle.setAttribute("aria-label", "Fermer le menu");
        } else {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        }

    });


    /* Fermer le menu lorsqu'on clique sur un lien */

    const navLinks = mobileNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileNav.classList.remove("active");

            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-label", "Ouvrir le menu");

        });

    });

}


/* LANGUE AU CHARGEMENT */

translatePage(currentLanguage);