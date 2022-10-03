import React, {
    ReactNode
} from 'react';
import {
    TouchableOpacity,
    TextStyle,
    ViewStyle,
    Text
} from 'react-native';
import {
    colors 
} from '../../theme';
import stylesheet from './stylesheet';

interface IButtonProps {
    titleStyle?: TextStyle;
    onPress: () => void;
    disabled?: boolean;
    textColor?: string;
    image?: ReactNode;
    style?: ViewStyle;
    title?: string;
    color?: string;
};

const Button = ({
    titleStyle,
    textColor,
    disabled,
    onPress,
    title,
    color,
    image,
    style
}: IButtonProps) => {
    return <TouchableOpacity
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        style={[
            stylesheet.container,
            {
                backgroundColor: color ? color : colors.primary
            },
            style
        ]}
    >
        {image ? image : null}
        {
            title ?
                <Text
                    style={[
                        stylesheet.title,
                        {
                            color: textColor ? textColor : "#fff",
                            marginLeft: image ? 10 : 0
                        },
                        titleStyle
                    ]}
                >
                    {title}
                </Text>
                :
                null
        }
    </TouchableOpacity>;
};
export default Button;
