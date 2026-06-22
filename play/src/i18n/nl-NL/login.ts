import type { Translation } from "../i18n-types";
import type { DeepPartial } from "../DeepPartial";

const login: DeepPartial<Translation["login"]> = {
    welcome: {
        title: "Hey! Welcome to EAden 👋",
        intro: "This is a place where we gather for events, coworking, or just to chill out… Feel free to come by anytime!",
        firstTime:
            "Since it's your first time connecting here, we'll just ask you for a name and to pick an appearance — then you'll be able to join the group!",
    },
    input: {
        name: {
            placeholder: "Voer je naam in",
            empty: "De naam is leeg",
            tooLongError: "Naam is te lang",
            notValidError: "Onjuist naamformaat",
        },
    },
    genericError: "Er is een fout opgetreden",
    terms: "Door door te gaan, ga je akkoord met onze {links}.",
    termsOfUse: "gebruikersvoorwaarden",
    privacyPolicy: "privacybeleid",
    cookiePolicy: "cookiebeleid",
    continue: "Doorgaan",
};

export default login;
