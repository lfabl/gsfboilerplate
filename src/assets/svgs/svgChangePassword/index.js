import React from 'react';
import {
    Image
} from "react-native";

const themes = {
    light: require("../../icons/changePasswordLight.png"),
    dark: require("../../icons/changePasswordDark.png"),
    black: require("../../icons/changePasswordBlack.png")
};

const SVGChangePassword = ({
    theme,
    size = 1,
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={30}
        width={30}
        style={{
            height: 30,
            width: 30
        }}
    />
);
export default SVGChangePassword;
