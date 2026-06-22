import type { Translation } from "../i18n-types";

export default {
    welcome: {
        title: "Welcome to {worldName}! 🚀",
        description:
            "Get ready to explore a virtual world where you can move around, chat with others, and collaborate in real-time. Let's take a quick tour to help you get started!",
        start: "Let's go!",
        skip: "Skip tutorial",
    },
    movement: {
        title: "Move around",
        descriptionDesktop:
            "Use your keyboard arrow keys or WASD to move your character. You can also right-click to move. Try moving now!",
        descriptionMobile: "Use the joystick or tap on the map to move your character. Try moving now!",
        next: "Next",
    },
    communication: {
        title: "Communication bubbles",
        description:
            "When you get close to other players, you'll automatically enter a communication bubble. You can chat with others in the same bubble!",
        video: "./static/Videos/Meet.mp4",
        next: "Got it!",
    },
    lockBubble: {
        title: "Lock your conversation",
        description:
            "Click the lock button to prevent others from joining your conversation bubble. This is useful for private discussions!",
        video: "./static/Videos/LockBubble.mp4",
        hint: "Click the highlighted lock button to try it out!",
        next: "Next",
    },
    screenSharing: {
        title: "Share your screen",
        description:
            "Share your screen with others in your conversation bubble. Perfect for presentations and collaboration!",
        video: "./static/images/screensharing.mp4",
        hint: "Click the highlighted screen share button to start sharing!",
        next: "Next",
    },
    pictureInPicture: {
        title: "Picture in Picture",
        description:
            "Use Picture in Picture mode to keep video calls visible while you navigate the map. Great for multitasking!",
        video: "./static/Videos/PictureInPicture.mp4",
        hint: "Click the highlighted PiP button to activate it!",
        next: "Next",
    },
    atmosphere: {
        title: "Make yourself at home",
        description:
            "This isn't a Zoom call — think of it like a real coffee-shop or a cozy living room. You can walk up to people, hang out, settle in to work, or just wander. It takes a moment to get used to, but we hope you'll quickly feel at home!",
        next: "Next",
    },
    menuTopLeft: {
        title: "Chat & who's around",
        description:
            "Up in the top-left you'll find the room chat — type a message anytime — and a list of everyone currently connected.",
        next: "Next",
    },
    mediaControls: {
        title: "Your camera & microphone",
        description: "This top row lets you turn your camera and microphone on or off whenever you like.",
        next: "Next",
    },
    topRightMenu: {
        title: "Settings & help",
        description:
            "From the top-right menu you can change your appearance, adjust your settings, or get help whenever you need it.",
        next: "Got it!",
    },
    complete: {
        title: "You're all set! 🎉",
        description:
            "You've learned the basics of {worldName}! Feel free to explore, meet new people, and have fun. You can always access help from the menu if you need it.",
        finish: "Start exploring!",
    },
} satisfies Translation["onboarding"];
