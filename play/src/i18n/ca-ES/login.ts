import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    genericError: "S'ha produït un error",
    welcome: {
        title: "Hey! Welcome to EAden 👋",
        intro: "This is a place where we gather for events, coworking, or just to chill out… Feel free to come by anytime!",
        firstTime:
            "Since it's your first time connecting here, we'll just ask you for a name and to pick an appearance — then you'll be able to join the group!",
    },
    input: {
        name: {
            placeholder: "Introduïu el vostre nombre",
            empty: "El nom està buit",
            tooLongError: "El nom és molt llarg",
            notValidError: "El nom no és vàlid",
        },
    },
    terms: `Si continueu, esteu d'acord amb els nostres {links}.`,
    termsOfUse: "termes d'ús",
    privacyPolicy: "política de privacitat",
    cookiePolicy: "política de cookie",
    continue: "Continuar",
};

export default login;
