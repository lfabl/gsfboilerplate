import React from "react";
import {
    Image
} from "react-native";

const themes = {
    dark: require("../../icons/sendDark.png")
};

const SVGSend = ({
    theme = "dark",
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={26.25}
        width={26.25}
        style={{
            height: 26.25,
            width: 26.25
        }}
    />
);
export default SVGSend;
