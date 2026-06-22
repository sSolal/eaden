import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const error: DeepPartial<Translation["error"]> = {
    accessLink: {
        title: "Lien d'accès incorrect",
        subTitle: "Impossible de trouver la carte. Veuillez vérifier votre lien d'accès.",
        details:
            "Si vous souhaitez obtenir de plus amples informations, vous pouvez contacter l'administrateur.",
    },
    connectionRejected: {
        title: "Connexion rejetée",
        subTitle: "Vous ne pouvez pas rejoindre le monde. Réessayer plus tard {error}.",
        details:
            "Si vous souhaitez obtenir de plus amples informations, vous pouvez contacter l'administrateur.",
    },
    connectionRetry: {
        unableConnect: "Connexion au serveur perdue. Vous ne pourrez pas parler aux autres.",
    },
    errorDialog: {
        title: "Erreur 😱",
        hasReportIssuesUrl:
            "Si vous souhaitez obtenir de plus amples informations, vous pouvez contacter l'administrateur ou signaler un problème à l'adresse suivante:",
        noReportIssuesUrl:
            "Si vous souhaitez obtenir de plus amples informations, vous pouvez contacter l'administrateur du monde.",
        messageFAQ: "Vous pouvez également consulter notre:",
        reload: "Recharger",
        close: "Fermer",
    },
};

export default error;
