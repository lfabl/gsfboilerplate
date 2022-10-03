import React from "react";
import {
    Image
} from "react-native";

const themes = {
    dark: require("../../icons/pencilDark.png")
};

const SVGPencil = ({
    theme = "dark",
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={18}
        width={18}
        style={{
            height: 18,
            width: 18
        }}
    />
);
export default SVGPencil;
