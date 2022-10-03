import React from "react";
import {
    Image
} from "react-native";

const themes = {
    dark: require("../../icons/cogDark.png"),
    light: require("../../icons/cogLight.png")
};

const SVGCog = ({
    theme,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={30.22}
        width={32}
        style={{
            height: 30.22,
            width: 32
        }}
    />
);
export default SVGCog;
