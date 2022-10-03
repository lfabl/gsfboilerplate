import React from "react";
import {
    Image
} from "react-native";

const themes = {
    light: require("../../icons/chevronBottomLight.png")
};

const SVGChevronBottom = ({
    size = 1,
    theme,
    style,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={11.5}
        width={20.7}
        style={{
            height: 11.5,
            width: 20.7
        }}
    />
);
export default SVGChevronBottom;
