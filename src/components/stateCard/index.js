import React, {
    ReactNode
} from 'react';
import {
    ImageSourcePropType,
    Image,
    View,
    Text
} from 'react-native';
import Button from '../button';
import stylesheet from './stylesheet';

interface IStateCardProps {
    image?: string | ImageSourcePropType;
    content?: string;
    action?: Action;
};

type Action = {
    onPress: () => void;
    image?: ReactNode;
    title?: string;
};

const StateCard = ({
    content,
    action,
    image
}: IStateCardProps) => {
    return <View
        style={[
            stylesheet.container
        ]}
    >
        {
            image ?
                <Image
                    resizeMode="contain"
                    source={typeof image === "string" ? {
                        uri: image
                    } : image}
                    style={[
                        stylesheet.image,
                        stylesheet.item
                    ]}
                />
                :
                null
        }
        <Text
            style={[
                stylesheet.content,
                stylesheet.item
            ]}
        >
            {content}
        </Text>
        {
            action ?
                <Button
                    {...action}
                    style={{
                        ...stylesheet.item
                    }}
                />
                :
                null
        }
    </View>;
};
export default StateCard;
