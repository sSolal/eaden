import type { Translation } from "../i18n-types";

export default {
    welcome: {
        title: "Welkom bij {worldName}! 🚀",
        description:
            "Maak je klaar om een virtuele wereld te verkennen waar je kunt bewegen, chatten met anderen en in realtime samenwerken. Laten we een snelle rondleiding maken om je op weg te helpen!",
        start: "Laten we gaan!",
        skip: "Tutorial overslaan",
    },
    movement: {
        title: "Bewegen",
        descriptionDesktop:
            "Gebruik de pijltjestoetsen of WASD om je personage te bewegen. Je kunt ook rechtsklikken om te bewegen. Probeer nu te bewegen!",
        descriptionMobile: "Gebruik de joystick of tik op de kaart om je personage te bewegen. Probeer nu te bewegen!",
        next: "Volgende",
    },
    communication: {
        title: "Communicatiebellen",
        description:
            "Wanneer je dicht bij andere spelers komt, kom je automatisch in een communicatiebel. Je kunt chatten met anderen in dezelfde bel!",
        video: "./static/Videos/Meet.mp4",
        next: "Begrepen!",
    },
    lockBubble: {
        title: "Je gesprek vergrendelen",
        description:
            "Klik op de vergrendelknop om te voorkomen dat anderen zich bij je communicatiebel voegen. Dit is handig voor privégesprekken!",
        video: "./static/Videos/LockBubble.mp4",
        hint: "Klik op de gemarkeerde vergrendelknop om het uit te proberen!",
        next: "Volgende",
    },
    screenSharing: {
        title: "Je scherm delen",
        description: "Deel je scherm met anderen in je communicatiebel. Perfect voor presentaties en samenwerking!",
        video: "./static/images/screensharing.mp4",
        hint: "Klik op de gemarkeerde schermdelingsknop om te beginnen met delen!",
        next: "Volgende",
    },
    pictureInPicture: {
        title: "Picture in Picture",
        description:
            "Gebruik de Picture in Picture-modus om videogesprekken zichtbaar te houden terwijl je op de kaart navigeert. Geweldig voor multitasking!",
        video: "./static/Videos/PictureInPicture.mp4",
        hint: "Klik op de gemarkeerde PiP-knop om deze te activeren!",
        next: "Volgende",
    },
    atmosphere: {
        title: "Make yourself at home",
        description:
            "This isn't a Zoom call — think of it like a real coffee-shop or a cozy living room. You can walk up to people, hang out, settle in to work, or just wander. It takes a moment to get used to, but we hope you'll quickly feel at home!",
        next: "Next",
    },
    menuTopLeft: {
        title: "Chat & who's around",
        description:
            "Up in the top-left you'll find the room chat — type a message anytime — and a list of everyone currently connected.",
        next: "Next",
    },
    mediaControls: {
        title: "Your camera & microphone",
        description: "This top row lets you turn your camera and microphone on or off whenever you like.",
        next: "Next",
    },
    topRightMenu: {
        title: "Settings & help",
        description:
            "From the top-right menu you can change your appearance, adjust your settings, or get help whenever you need it.",
        next: "Got it!",
    },
    complete: {
        title: "Je bent klaar! 🎉",
        description:
            "Je hebt de basis van {worldName} geleerd! Voel je vrij om te verkennen, nieuwe mensen te ontmoeten en plezier te hebben. Je kunt altijd hulp openen via het menu als je het nodig hebt.",
        finish: "Begin met verkennen!",
    },
} satisfies Translation["onboarding"];
