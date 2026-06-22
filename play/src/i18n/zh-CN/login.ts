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
            placeholder: "输入你的名字",
            empty: "名字为空",
            tooLongError: "名字太长",
            notValidError: "名字格式不正确",
        },
    },
    genericError: "发生错误",
    terms: "点击继续，意味着你同意我们的{links}.",
    termsOfUse: "使用协议",
    privacyPolicy: "隐私政策",
    cookiePolicy: "Cookie策略",
    continue: "继续",
};

export default login;
