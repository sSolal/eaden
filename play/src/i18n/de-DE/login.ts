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
            placeholder: "Trage deinen Namen ein",
            empty: "Kein Name angegeben",
            tooLongError: "Der Name ist zu lang",
            notValidError: "Der Name ist ungültig",
        },
    },
    genericError: "Ein Fehler ist aufgetreten",
    terms: "Wenn du fortfährst, akzeptierst du die {links}.",
    termsOfUse: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutzerklärung",
    cookiePolicy: "Cookierichtlinien",
    continue: "Fortfahren",
};

export default login;
