import type { Translation } from "../i18n-types";

export default {
    welcome: {
        title: "¡Bienvenido a {worldName}! 🚀",
        description:
            "Prepárate para explorar un mundo virtual donde puedes moverte, chatear con otros y colaborar en tiempo real. ¡Hagamos un recorrido rápido para ayudarte a comenzar!",
        start: "¡Vamos!",
        skip: "Saltar tutorial",
    },
    movement: {
        title: "Moverse",
        descriptionDesktop:
            "Usa las teclas de flecha o WASD para mover tu personaje. También puedes hacer clic derecho para moverte. ¡Prueba a moverte ahora!",
        descriptionMobile: "Usa el joystick o toca el mapa para mover tu personaje. ¡Prueba a moverte ahora!",
        next: "Siguiente",
    },
    communication: {
        title: "Burbujas de comunicación",
        description:
            "Cuando te acerques a otros jugadores, entrarás automáticamente en una burbuja de comunicación. ¡Puedes chatear con otros en la misma burbuja!",
        video: "./static/Videos/Meet.mp4",
        next: "¡Entendido!",
    },
    lockBubble: {
        title: "Bloquear tu conversación",
        description:
            "Haz clic en el botón de bloqueo para evitar que otros se unan a tu burbuja de conversación. ¡Es útil para discusiones privadas!",
        video: "./static/Videos/LockBubble.mp4",
        hint: "¡Haz clic en el botón de bloqueo resaltado para probarlo!",
        next: "Siguiente",
    },
    screenSharing: {
        title: "Compartir tu pantalla",
        description:
            "Comparte tu pantalla con otros en tu burbuja de conversación. ¡Perfecto para presentaciones y colaboración!",
        video: "./static/images/screensharing.mp4",
        hint: "¡Haz clic en el botón de compartir pantalla resaltado para comenzar a compartir!",
        next: "Siguiente",
    },
    pictureInPicture: {
        title: "Imagen en imagen",
        description:
            "Usa el modo Imagen en imagen para mantener las videollamadas visibles mientras navegas por el mapa. ¡Genial para multitarea!",
        video: "./static/Videos/PictureInPicture.mp4",
        hint: "¡Haz clic en el botón PiP resaltado para activarlo!",
        next: "Siguiente",
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
        title: "¡Ya estás listo! 🎉",
        description:
            "¡Has aprendido los conceptos básicos de {worldName}! Siéntete libre de explorar, conocer nuevas personas y divertirte. Siempre puedes acceder a la ayuda desde el menú si la necesitas.",
        finish: "¡Comienza a explorar!",
    },
} satisfies Translation["onboarding"];
