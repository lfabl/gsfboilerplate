import React from "react";
import {
    Image
} from "react-native";

const themes = {
    dark: require("../../icons/plusDark.png"),
    light: require("../../icons/plusLight.png")
};

const sizes = {
    small: {
        height: 20,
        width: 20
    },
    medium: {
        height: 26,
        width: 26
    },
    large: {
        height: 30,
        width: 30
    }
};

const SVGPlus = ({
    theme = "dark",
    size = "small",
    ...props
}) => {
    const _size = sizes[size];

    return <Image
        resizeMode="cover"
        source={themes[theme]}
        height={_size.height}
        width={_size.width}
        style={{
            height: _size.height,
            width: _size.width
        }}
    />;
};
export default SVGPlus;
