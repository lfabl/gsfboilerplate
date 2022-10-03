import React from "react";
import {
    Image
} from "react-native";

const themes = {
    dark: require("../../icons/chatlight.png"),
    light: require("../../icons/chatdark.png"),
    black: require("../../icons/chatblack.png")
};

const SVGChat = ({
    theme,
    size = 1,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={25.14}
        width={30}
        style={{
            height: 27.14,
            width: 30
        }}
    />
);
export default SVGChat;
