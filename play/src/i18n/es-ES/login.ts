import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    genericError: "Ocurrió un error",
    welcome: {
        title: "Hey! Welcome to EAden 👋",
        intro: "This is a place where we gather for events, coworking, or just to chill out… Feel free to come by anytime!",
        firstTime:
            "Since it's your first time connecting here, we'll just ask you for a name and to pick an appearance — then you'll be able to join the group!",
    },
    input: {
        name: {
            placeholder: "Introduzca su nombre",
            empty: "El nombre está vacío",
            tooLongError: "El nombre es muy largo",
            notValidError: "El nombre no es válido",
        },
    },
    terms: "Si continúa, está de acuerdo con nuestros {links}.",
    termsOfUse: "términos de uso",
    privacyPolicy: "política de privacidad",
    cookiePolicy: "política de cookie",
    continue: "Continuar",
};

export default login;
