import React from "react";
import {
    Image
} from "react-native";

const themes = {
    light: require("../../icons/folderLight.png"),
    dark: require("../../icons/folderDark.png")
};

const SVGFolder = ({
    theme,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={32.94}
        width={33}
        style={{
            height: 32.94,
            width: 33
        }}
    />
);
export default SVGFolder;
