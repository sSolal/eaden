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
            placeholder: "Enter your name",
            empty: "The name is empty",
            tooLongError: "Name is too long",
            notValidError: "Incorrect name format",
        },
    },
    genericError: "An error occurred",
    terms: "By continuing, you are agreeing our {links}.",
    termsOfUse: "terms of use",
    privacyPolicy: "privacy policy",
    cookiePolicy: "cookie policy",
    continue: "Continue",
};

export default login;
