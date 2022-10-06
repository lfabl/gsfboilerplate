import React from 'react';
import {
    TouchableOpacity,
    View,
    Text
} from 'react-native';
import {
    colors 
} from '../../theme';
import stylesheet from './stylesheet';

const Row = ({
    frontContent,
    backContent,
    disabled,
    onPress,
    style,
    color,
    title
}) => {
    return <TouchableOpacity
        onPress={disabled ? null : onPress}
        disabled={disabled}
        style={[
            stylesheet.container,
            style
        ]}
    >
        <View
            style={[
                stylesheet.leftContainer
            ]}
        >
            {frontContent}
            <Text
                style={[
                    stylesheet.title,
                    {
                        color: color ? color : colors.body,
                        marginLeft: frontContent ? 20 : 0
                    }
                ]}
            >
                {title}
            </Text>
        </View>
        {backContent}
    </TouchableOpacity>;
};
export default Row;
