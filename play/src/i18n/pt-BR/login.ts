import type { BaseTranslation } from "../i18n-types";

const login: BaseTranslation = {
    welcome: {
        title: "Hey! Welcome to EAden 👋",
        intro: "This is a place where we gather for events, coworking, or just to chill out… Feel free to come by anytime!",
        firstTime:
            "Since it's your first time connecting here, we'll just ask you for a name and to pick an appearance — then you'll be able to join the group!",
    },
    input: {
        name: {
            placeholder: "Digite seu nome",
            empty: "O nome está vazio",
            tooLongError: "O nome é muito longo",
            notValidError: "O nome não é válido",
        },
    },
    genericError: "Ocorreu um erro",
    terms: "Ao continuar, você concorda com nossos {links}.",
    termsOfUse: "termos de uso",
    privacyPolicy: "política de privacidade",
    cookiePolicy: "política de cookies",
    continue: "Continuar",
};

export default login;
