import React from "react";
import {
    Image
} from "react-native";

const themes = {
    dark: require("../../icons/homeDark.png"),
    light: require("../../icons/homeLight.png")
};

const SVGHome = ({
    theme,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={28.5}
        width={33}
        style={{
            height: 28.5,
            width: 33
        }}
    />
);
export default SVGHome;
