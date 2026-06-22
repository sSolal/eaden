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
            placeholder: "名前を入力してください",
            empty: "名前が入力されていません",
            tooLongError: "名前が長すぎます",
            notValidError: "名前の形式が正しくありません",
        },
    },
    genericError: "エラーが発生しました",
    terms: "続行すると、{links} に同意したことになります。",
    termsOfUse: "利用規約",
    privacyPolicy: "プライバシーポリシー",
    cookiePolicy: "クッキーに関する方針",
    continue: "続ける",
};

export default login;
