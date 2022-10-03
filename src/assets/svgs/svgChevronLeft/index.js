import React from "react";
import {
    Image
} from "react-native";

const themes = {
    light: require("../../icons/chevronLeftLight.png")
};

const SVGChevronLeft = ({
    size = 1,
    theme = "light",
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={20}
        width={20}
        style={{
            height: 20,
            width: 20
        }}
    />
);
export default SVGChevronLeft;
