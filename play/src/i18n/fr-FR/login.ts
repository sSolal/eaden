import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const login: DeepPartial<Translation["login"]> = {
    welcome: {
        title: "Hey ! Bienvenue sur EAden 👋",
        intro: "C'est un endroit où l'on se retrouve pour des événements, du coworking, ou simplement pour se détendre… Passe quand tu veux !",
        firstTime:
            "Comme c'est ta première connexion ici, on va juste te demander un nom et de choisir une apparence — ensuite tu pourras rejoindre le groupe !",
    },
    input: {
        name: {
            placeholder: "Entrez votre nom",
            empty: "Le nom est vide",
            tooLongError: "Le nom est trop long",
            notValidError: "Le nom n'est pas valide",
        },
    },
    genericError: "Une erreur est survenue",
    terms: "En continuant, vous acceptez {links}.",
    termsOfUse: "nos conditions d'utilisation",
    privacyPolicy: "notre politique de confidentialité",
    cookiePolicy: "notre politique relative aux cookies",
    continue: "Continuer",
};

export default login;
