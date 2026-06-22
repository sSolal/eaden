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
            placeholder: "zapisaj swoje mjeno",
            empty: "žane mjeno zapodate",
            tooLongError: "mjeno je předołhe",
            notValidError: "mjeno je njepłaćiwe",
        },
    },
    terms: "Hdyž pokročuješ, akceptuješ {links}.",
    termsOfUse: "wužiwanske wuměnjenja",
    privacyPolicy: "wozjewjenje wo škiće datow",
    cookiePolicy: "cookie směrnicy",
    continue: "pokročować",
    genericError: "Zmólka jo póstawała",
};

export default login;
