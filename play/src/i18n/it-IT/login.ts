import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    welcome: {
        title: "Hey! Welcome to EAden 👋",
        intro: "This is a place where we gather for events, coworking, or just to chill out… Feel free to come by anytime!",
        firstTime:
            "Since it's your first time connecting here, we'll just ask you for a name and to pick an appearance — then you'll be able to join the group!",
    },
    input: {
        name: {
            placeholder: "Inserisci il tuo nome",
            empty: "Il nome è vuoto",
            tooLongError: "Il nome è troppo lungo",
            notValidError: "Formato del nome non corretto",
        },
    },
    genericError: "Si è verificato un errore",
    terms: "Continuando, accetti i nostri {links}.",
    termsOfUse: "termini di utilizzo",
    privacyPolicy: "politica sulla privacy",
    cookiePolicy: "politica sui cookie",
    continue: "Continua",
};

export default login;
