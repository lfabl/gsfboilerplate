import React from "react";
import {
    Image
} from "react-native";

const images = {
    light: require("../../icons/cameralight.png"),
    dark: require("../../icons/cameradark.png")
};

const SVGCamera = ({
    theme,
    size = 1,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={images[theme]}
        height={27}
        width={30}
        style={{
            height: 27,
            width: 30
        }}
    />
);

export default SVGCamera;
