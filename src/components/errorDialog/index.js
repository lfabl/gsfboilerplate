import React, {
    useEffect
} from 'react';
import {
    ActivityIndicator,
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native';
import {
    Portal
} from 'react-native-portalize';
import SVGClose from '../../assets/svgs/svgClose';
import {
    colors 
} from '../../theme';
import Button from '../button';
import stylesheet from './stylesheet';

const TYPES = {
    "error": {
        color: "#FF9FA1",
        image: require("../../assets/images/error.png")
    },
    "warning": {
        color: "#FFCE5E",
        image: require("../../assets/images/warning.png")
    },
    "success": {
        color: "#6EE18D",
        image: require("../../assets/images/success.png")
    }
};

interface IDialogProps {
    type: "error" | "warning" | "success";
    onConfirm: () => void;
    confirmText?: string;
    onClose?: () => void;
    cancelText?: string;
    isActive: boolean;
    loading?: boolean;
    content: string;
    color?: string;
    title: string;
};

const ErrorDialog = ({
    cancelText = "Cancel",
    isActive = false,
    confirmText,
    onConfirm,
    loading,
    content,
    onClose,
    title,
    color,
    type
}: IDialogProps) => {
    if(!isActive) {
        return null;
    }

    useEffect(() => {
        if(isActive && type === "success") {
            setTimeout(() => {
                if(onClose) onClose();
            }, 1500);
        }
    }, [isActive]);

    return <Portal>
        <View
            style={[
                stylesheet.container
            ]}
        >
            <TouchableOpacity
                onPress={loading ? () => {} : onClose}
                disabled={loading}
                style={{
                    flex: 1
                }}
            >
                <View style={{
                    flex: 1 
                }}></View>
            </TouchableOpacity>
            <View
                style={[
                    stylesheet.dialogContainer
                ]}
            >
                <View
                    style={[
                        stylesheet.contentContainer
                    ]}
                >
                    <View
                        style={[
                            stylesheet.headerContainer
                        ]}
                    >
                        <Text
                            style={[
                                stylesheet.title
                            ]}
                        >
                            {title}
                        </Text>
                        <Image
                            source={TYPES[type].image}
                            height={100}
                            width={100}
                            style={{
                                height: 100,
                                width: 100
                            }}
                        />
                    </View>
                    <View
                        style={[
                            stylesheet.content
                        ]}
                    >
                        <Text
                            style={[
                                stylesheet.contentText,
                                {
                                    marginBottom: 10
                                }
                            ]}
                        >
                            {content}
                        </Text>
                        <View
                            style={[
                                stylesheet.buttons
                            ]}
                        >
                            <Button
                                color="transparent"
                                textColor={colors.hideBody}
                                onPress={loading ? () => {} : onClose}
                                disabled={loading}
                                title={cancelText}
                                titleStyle={{
                                    ...stylesheet.buttonTitle
                                }}
                                style={{
                                    ...stylesheet.button,
                                    width: confirmText ? "50%" : "100%"
                                }}
                            />
                            {
                                confirmText ? <Button
                                    color="transparent"
                                    textColor={color ? color : TYPES[type].color}
                                    onPress={loading ? () => {} : onConfirm}
                                    title={confirmText}
                                    disabled={loading}
                                    image={loading ? <ActivityIndicator
                                        size="small"
                                        color={color ? color : TYPES[type].color}
                                    /> : null}
                                    titleStyle={{
                                        ...stylesheet.buttonTitle
                                    }}
                                    style={{
                                        ...stylesheet.button
                                    }}
                                /> : null
                            }
                        </View>
                    </View>
                </View>
            </View>
        </View>
    </Portal>;
};
export default ErrorDialog;
