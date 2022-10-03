import React from "react";
import {
    Image
} from "react-native";

const themes = {
    light: require("../../icons/closeLight.png")
};

const SVGClose = ({
    theme,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={20.5}
        width={20.5}
        style={{
            height: 20.5,
            width: 20.5
        }}
    />
);
export default SVGClose;
