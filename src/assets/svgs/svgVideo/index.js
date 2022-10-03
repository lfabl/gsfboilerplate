import React from 'react';
import {
    Image
} from "react-native";

const themes = {
    dark: require("../../icons/videoDark.png")
};

const SVGVideo = ({
    theme = "dark",
    ...props
}) => (
    <Image
        resizeMode="cover"
        source={themes[theme]}
        height={33}
        width={28.18}
        style={{
            height: 33,
            width: 28.18
        }}
    />
);
export default SVGVideo;
