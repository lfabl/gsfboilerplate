import React, {
    useEffect
} from 'react';
import {
    SafeAreaView,
    StatusBar,
    Linking,
    View
} from 'react-native';
import Navigation, {
    isReadyRef 
} from './navigation';
import GlobalStateProvider, {
    useGlobalState 
} from './context';
import Toast from 'react-native-simple-toast';
import storage from './storage';
import {
    getKeyAndValuesFromURLString 
} from './util';
import {
    Host
} from 'react-native-portalize';
import {
    colors
} from './theme';
import RNRestart from 'react-native-restart';

const GlobalStateContextAPI = () => {
    const [globalState, setGlobalState] = useGlobalState();

    useEffect(async () => {
        Linking.addEventListener("url", handleUri);

        return () => {
            Linking.removeAllListeners("url");
        };
    }, []);

    const handleUri = (event) => {
        if(event.url.indexOf("error") !== -1) {
            storage.delete("refreshToken");
            storage.delete("token");
            RNRestart.Restart();
            return;
        }

        try {
            const response = getKeyAndValuesFromURLString(decodeURIComponent(event.url).split('#')[1]);
            if(!response.access_token) {
                throw new Error("Token is invalid.");
            }

            storage.set("token", response.access_token);
            storage.set("refreshToken", response.refresh_token);
            setGlobalState({
                accessToken: response.access_token,
                refreshToken: response.refresh_token
            });
        } catch(e) {
            Toast.show("An error exception: " + e.message, Toast.LONG);
        }
    };

    return <View
        style={{
            flex: 1
        }}
    >
        <Navigation/>
    </View>;
};

const App = () => {
    useEffect(() => {
        return () => {
            isReadyRef.current = false;
        };
    }, []);

    return <GlobalStateProvider>
        <StatusBar
            barStyle="dark-content"
            hidden={false}
        />
        <Host>
            <SafeAreaView
				 style={{
					 backgroundColor: colors.panel,
					 flex: 1
				 }}
            >
            	<GlobalStateContextAPI/>
            </SafeAreaView>
        </Host>
    </GlobalStateProvider>;
};
export default App;
