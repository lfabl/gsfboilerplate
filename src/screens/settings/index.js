import React, {
    useState
} from 'react';
import {
    ScrollView,
    Image,
    View,
    Text
} from 'react-native';
import {
    useNavigation 
} from '@react-navigation/native';
import stylesheet from './stylesheet';
import {
    useGlobalState 
} from '../../context';
import {
    MAIN_URL 
} from '../../constants';
import Button from '../../components/button';
import SVGPencil from '../../assets/svgs/svgPencil';
import {
    colors 
} from '../../theme';
import Row from '../../components/row';
import SVGChevronRight from '../../assets/svgs/svgChevronRight';
import SVGChangePassword from '../../assets/svgs/svgChangePassword';
import SVGSignOut from '../../assets/svgs/svgSignOut';
import storage from '../../storage';
import RNRestart from 'react-native-restart';
import api from '../../api';
import ErrorDialog from '../../components/errorDialog';
import DateRange from "../../components/dateRange";

const Settings = ({

}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const navigation = useNavigation();

    const [process, setProcess] = useState(false);
    const [responseModal, setResponseModal] = useState({
        confirmTitle: "Delete",
        cancelTitle: "Cancel",
        isVisible: false,
        type: "error",
        color: "#FF9FA1",
        onClose: () => {},
        content: "",
        title: "",
        onConfirm: () => {}
    });

    navigation.setOptions({
        headerTitleAlign: "left",
        headerShown: true,
        headerLeft: () => null,
        headerRight: () => null,
        headerTitle: () => {
            return <Text
                style={{
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "black",
                    fontSize: 18
                }}
            >
                    Settings
            </Text>;
        },
        headerStyle: {
            backgroundColor: colors.panel,
            height: 64
        }
    });

    const renderProfileC = () => {
        const imageSource = globalState.profileImage && globalState.profileImage.type && globalState.profileImage.type.length ? {
            uri: `data:image/${globalState.profileImage.type};base64,${globalState.profileImage.data}`,
            headers: {
                Authorization: `Bearer ${globalState.accessToken}`
            }
        } : require("../../assets/images/emptyuser.png");

        return <View
            style={[
                stylesheet.profileContainer
            ]}
        >
            <Image
                source={imageSource}
                resizeMode="cover"
                style={[
                    stylesheet.logo
                ]}
            />
            <View
                style={[
                    stylesheet.profileTitleContainer
                ]}
            >
                <Text
                    style={[
                        stylesheet.overline
                    ]}
                >
                    Hello
                </Text>
                <Text
                    style={[
                        stylesheet.profileTitle
                    ]}
                >
                    {globalState.contact.FirstName}
                </Text>
            </View>
            <Button
                image={<SVGPencil
                    theme="dark"
                />}
                color={"rgba(33, 54, 125, 0.1)"}
                disabled={process}
                onPress={() => {
                    if(!process) {
                        navigation.navigate("profileDetail");
                    }
                }}
                style={{
                    ...stylesheet.profileEditButton,
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderStyle: "solid"
                }}
            />
        </View>;
    };

    const renderResponseModal = () => {
        return <ErrorDialog
            isActive={responseModal.isVisible}
            content={responseModal.content}
            title={responseModal.title}
            type={responseModal.type}
            cancelText={responseModal.cancelTitle}
            confirmText={responseModal.confirmTitle}
            color={responseModal.color}
            loading={process}
            onClose={() => {
                if(responseModal.onClose) responseModal.onClose();
                setResponseModal({
                    ...responseModal,
                    isVisible: false
                });
            }}
            onConfirm={() => {
                if(responseModal.onConfirm) responseModal.onConfirm();
            }}
        />;
    };

    // TODO: will be covert to View
    return <ScrollView
        style={[
            stylesheet.container
        ]}
    >
        {renderProfileC()}
        <Row
            title="Change Password"
            disabled={true}
            frontContent={<SVGChangePassword
                theme="black"
                size={1.5}
            />}
            backContent={<SVGChevronRight
                theme="light"
                size="medium"
            />}
            style={{
                ...stylesheet.row,
                opacity: 0.5
            }}
        />
        {/*<Row
            title="Support"
            frontContent={<SVGSupport
                theme="light"
            />}
            backContent={<SVGChevronRight
                size="medium"
            />}
            style={{
                ...stylesheet.row
            }}
        />*/}
        <View
            style={[
                stylesheet.emptyArea
            ]}
        />
        <View
            style={{
                padding: 20
            }}
        >
            <DateRange/>
        </View>
        <Row
            title="Sign Out"
            frontContent={<SVGSignOut
                theme="lightRed"
            />}
            backContent={<SVGChevronRight
                theme="red"
                size="large"
            />}
            disabled={process}
            onPress={() => {
                if(!process) {
                    setResponseModal({
                        cancelTitle: "Cancel",
                        color: "#FFCE5E",
                        confirmTitle: "Sign out",
                        content: "Are you sure you want to sign out?",
                        isVisible: true,
                        title: "Sign Out",
                        type: "warning",
                        onClose: () => {},
                        onConfirm: () => {
                            setProcess(true);
                            api({
                                url: `${MAIN_URL}/services/oauth2/revoke?token=${globalState.accessToken}`,
                                navigation: navigation,
                                globalState: globalState,
                                setGlobalState: setGlobalState,
                                method: "POST",
                                body: JSON.stringify({
                                    token: globalState.accessToken
                                }),
                                accessToken: globalState.accessToken,
                                directResponse: true
                            })
                                .then(res => {
                                    if(res) {
                                        setResponseModal({
                                            cancelTitle: "Okay",
                                            color: "#6EE18D",
                                            content: "Session successfully closed.",
                                            isVisible: true,
                                            title: "Sign Out",
                                            type: "success",
                                            onClose: () => {
                                                storage.delete("refreshToken");
                                                storage.delete("token");
                                                RNRestart.Restart();
                                            }
                                        });
                                        setTimeout(() => {
                                            storage.delete("refreshToken");
                                            storage.delete("token");
                                            RNRestart.Restart();
                                        }, 3000);
                                    } else {
                                        setProcess(false);
                                        throw new Error("Session close error. Something went wrong.");
                                    }
                                })
                                .catch(err => {
                                    setResponseModal({
                                        cancelTitle: "Okay",
                                        color: "#6EE18D",
                                        content: "Session successfully closed.",
                                        isVisible: true,
                                        title: "Sign Out",
                                        type: "success",
                                        onClose: () => {
                                            storage.delete("refreshToken");
                                            storage.delete("token");
                                            RNRestart.Restart();
                                        }
                                    });
                                    setTimeout(() => {
                                        storage.delete("refreshToken");
                                        storage.delete("token");
                                        RNRestart.Restart();
                                    }, 3000);
                                });
                                    }
                                });
                }
            }}
            color={colors.red}
            style={{
                ...stylesheet.row
            }}
        />
        {renderResponseModal()}
    </ScrollView>;
};
export default Settings;
