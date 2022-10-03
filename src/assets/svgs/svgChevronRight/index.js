import React from "react";
import {
    Image
} from 'react-native';

const themes = {
    light: require("../../icons/chevronRightLight.png"),
    red: require("../../icons/chevronRightLightMediumRed.png")
};

const sizes = {
    "small": {
        height: 17,
        width: 11
    },
    "medium": {
        height: 20,
        width: 13
    },
    "large": {
        height: 22,
        width: 14
    }
};

const SVGChevronRight = ({
    theme = "light",
    size = "large",
    style,
    ...props
}) => {
    let image = theme === "red" ? themes["red"] : null;

    if(!image) {
        image = themes["light"];
    }

    const _size = sizes[size];

    return <Image
        source={image}
        height={_size.height}
        width={_size.width}
        style={{
            height: _size.height,
            width: _size.width,
            ...style
        }}
    />;
};
export default SVGChevronRight;
