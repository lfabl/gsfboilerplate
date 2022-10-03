import React from "react";
import {
    Image
} from "react-native";

const themes = {
    light: require("../../icons/imagesLight.png"),
    dark: require("../../icons/imagesDark.png")
};

const SVGImages = ({
    theme = "light",
    width = 31.25,
    height = 27.5,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={height}
        width={width}
        style={{
            height: height,
            width: width
        }}
    />
);
export default SVGImages;
