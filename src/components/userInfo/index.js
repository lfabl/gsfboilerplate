import React from 'react';
import {
    ImageSourcePropType,
    Image,
    View,
    Text
} from 'react-native';
import { useGlobalState } from '../../context';
import {
    colors 
} from '../../theme';
import stylesheet from './stylesheet';

interface IUserInfoProps {
	logo?: string | ImageSourcePropType;
    profileImageURL: string;
	profileImage: string;
    userType?: string;
    userName: string;
};

const UserInfo = ({
    profileImageURL,
    profileImage,
    userType,
    userName,
    logo
}: IUserInfoProps) => {
    const [globalState, setGlobalState] = useGlobalState();

    const renderUserType = () => {
        return <Text
            style={[
                stylesheet.userType,
                {
                    marginLeft: logo ? 0 : 10
                }
            ]}
        >
            {userType}
        </Text>;
    };

    const renderLogo = () => {
        if(typeof logo === "string") {
            return <Image
                resizeMode="contain"
                source={{
                    uri: logo
                }}
                style={[
                    stylesheet.logo
                ]}
            />;
        }

        return <Image
            resizeMode="contain"
            source={logo}
            style={[
                stylesheet.logo
            ]}
        />;
    };

    const imageSource = profileImage && profileImage.type && profileImage.type.length? {
        uri: `data:image/${profileImage.type};base64,${profileImage.data}`,
        headers: {
            Authorization: `Bearer ${globalState.accessToken}`
        }
    } : require("../../assets/images/emptyuser.png");

    return <View
        style={[
            stylesheet.container,
            {
                backgroundColor: colors.panel
            }
        ]}
    >
        <View
            style={[
                stylesheet.content
            ]}
        >
            <Image
                source={imageSource}
                resizeMode="cover"
                style={[
                    stylesheet.profile
                ]}
            />
            <View
                style={[
                    stylesheet.title
                ]}
            >
                <Text
                    numberOfLines={1}
                    style={[
                        stylesheet.welcome
                    ]}
                >
                    <Text
                        style={[
                            stylesheet.userName
                        ]}
                        numberOfLines={1}
                    >{userName}</Text>
                </Text>
                {
                    logo ?
                        renderUserType()
                        :
                        null
                }
            </View>
        </View>
        {
            logo ?
                renderLogo()
                :
                renderUserType()
        }
    </View>;
};
export default UserInfo;
