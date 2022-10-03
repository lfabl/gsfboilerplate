import React from 'react';
import {
    Image
} from "react-native";

const themes = {
    lightRed: require("../../icons/signOutLightRed.png")
};

const SVGSignOut = ({
    theme = "lightRed",
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={28.5}
        width={28.5}
        style={{
            height: 28.5,
            width: 28.5
        }}
    />
);
export default SVGSignOut;
