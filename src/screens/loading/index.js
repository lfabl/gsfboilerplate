import React, {
    useEffect
} from 'react';
import {
    ActivityIndicator,
    View
} from 'react-native';
import {
    useIsFocused,
    useNavigation
} from '@react-navigation/native';
import stylesheet from './stylesheet';
import {
    useGlobalState 
} from '../../context';
import storage from '../../storage';
import {
    refreshToken 
} from '../../api';
import {
    DEBUG_MODE,
    setMainUrl 
} from '../../constants';

const Loading = () => {
    const navigation = useNavigation();
    const [globalState, setGlobalState] = useGlobalState();
    const isFocused = useIsFocused();

    navigation.setOptions({
        header: () => null
    });

    useEffect(() => {
        if(DEBUG_MODE && !globalState.debugMode) {
            navigation.navigate("devLogin");
            return;
        }

        getRefreshToken();
    }, []);

    useEffect(() => {
        if(isFocused) {
            if(DEBUG_MODE && !globalState.debugMode) {
                navigation.navigate("devLogin");
                return;
            }

            setMainUrl(DEBUG_MODE ? globalState.debugMode : "production");
            getRefreshToken();
        }
    }, [isFocused]);

    const getRefreshToken = () => {
        const storageToken = storage.getString("refreshToken");
        if(!storageToken) {
            navigation.navigate("login");
        }

        refreshToken({
            refreshToken: storageToken
        })
            .then((newAccessToken) => {
                storage.set("token", newAccessToken);
                setGlobalState({
                    accessToken: newAccessToken
                });
            })
            .catch(err => {
                if(err.toString() === "invalid_grant" || err.error.indexOf("invalid_grant") !== -1) {
                    navigation.navigate("login");
                }
            });
    };

    return <View
        style={stylesheet.container}
    >
        <ActivityIndicator
            size="large"
            color="#444444"
        />
    </View>;
};
export default Loading;
