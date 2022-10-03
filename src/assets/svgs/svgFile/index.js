import React from "react";
import {
    ImageStyle,
    Image
} from "react-native";

const themes = {
    dark: require("../../icons/fileDark.png")
};

const SVGFile = ({
    theme = "dark",
    style,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={33}
        width={27}
        style={{
            height: 33,
            width: 27
        }}
    />
);
export default SVGFile;
