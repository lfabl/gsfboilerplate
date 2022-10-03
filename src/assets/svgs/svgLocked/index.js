import React from "react";
import {
    Image
} from "react-native";

const themes = {
    dark: require("../../icons/lockedDark.png")
};

const SVGLocked = ({
    theme = "dark",
    ...props
}) => {
    return <Image
        resizeMode="cover"
        source={themes[theme]}
        height={27}
        width={27}
        style={{
            height: 27,
            width: 27
        }}
    />;
};
export default SVGLocked;
