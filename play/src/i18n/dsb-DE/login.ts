import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    genericError: "Zmólka jo póstawała",
    welcome: {
        title: "Hey! Welcome to EAden 👋",
        intro: "This is a place where we gather for events, coworking, or just to chill out… Feel free to come by anytime!",
        firstTime:
            "Since it's your first time connecting here, we'll just ask you for a name and to pick an appearance — then you'll be able to join the group!",
    },
    input: {
        name: {
            placeholder: "Zapódaj swójo mě",
            empty: "Žedno mě njejo zapódane",
            tooLongError: "Mě jo pśeliš dłujke",
            notValidError: "Mě njejo płaśece",
        },
    },
    terms: "Jolic až kliknjoš na 'dalej', akceptěrujoš {links}.",
    termsOfUse: "Wustawki wužywanja",
    privacyPolicy: "Deklaracija dla woplěwanja datow",
    cookiePolicy: "Regule za placki (cookije)",
    continue: "Dalej",
};

export default login;
