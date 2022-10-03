import React from "react";
import {
    Image
} from "react-native";

const themes = {
    light: require("../../icons/infoLight.png")
};

const SVGInfo = ({
    theme = "light",
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={27}
        width={27}
        style={{
            height: 27,
            width: 27
        }}
    />
);
export default SVGInfo;
