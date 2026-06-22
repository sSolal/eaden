import type { DeepPartial } from "../DeepPartial";
import type { Translation } from "../i18n-types";

const error: DeepPartial<Translation["error"]> = {
    accessLink: {
        title: "Enllaç d'accés incorrecte",
        subTitle: "No s'ha trobat el mapa. Si us plau, reviseu el vostre enllaç d'accés.",
        details:
            "Si voleu més informació, podeu contactar amb l'administrador.",
    },
    connectionRejected: {
        title: "Conexió rebutjada",
        subTitle: "No podeu unir-vos al Món. Intenteu-lo de nou més tard {error}.",
        details:
            "Si voleu més informació, podeu contactar amb l'administrador.",
    },
    connectionRetry: {
        unableConnect: "S'ha perdut la connexió amb el servidor. No podràs parlar amb els altres.",
    },
    errorDialog: {
        title: "Error 😱",
        hasReportIssuesUrl: "Si voleu més informació, podeu contactar amb l'administrador o informar d'un problema a:",
        noReportIssuesUrl: "Si voleu més informació, podeu contactar amb l'administrador del món.",
        messageFAQ: "També podeu consultar la nostra:",
        reload: "Recarregar",
        close: "Tancar",
    },
};

export default error;
