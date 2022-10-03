import React, {
    createRef,
    useEffect
} from 'react';
import {
    NavigationContainer,
    useNavigation
} from '@react-navigation/native';
import {
    createStackNavigator
} from '@react-navigation/stack';
import {
    createBottomTabNavigator 
} from '@react-navigation/bottom-tabs';
import {
    useGlobalState 
} from '../context';
import SVGHome from '../assets/svgs/svgHome';
import {
    colors 
} from '../theme';
import SVGChat from '../assets/svgs/svgChat';
import SVGCog from '../assets/svgs/svgCog';

import LoginPage from '../screens/login';
// import RegisterPage from '../screens/register';
import LoadingPage from '../screens/loading/index';
import HomePage from '../screens/home';
// import ChatPage from '../screens/chat';
// import SettingsPage from '../screens/settings';
// import ForgotPasswordPage from '../screens/forgotPassword';
// import PropertyNewEditPage from '../screens/propertyNewEdit';
// import PropertyDetailPage from '../screens/propertyDetail';
// import InspectionPage from '../screens/inspection';
// import InspectionDetailPage from '../screens/inspectionNewEdit';
// import InspectionItemFilePage from '../screens/inspectionItemFile';
// import ProfileDetailPage from '../screens/profileDetail';
import DebugModePage from "../screens/debugMode";
// import PrivacyPolicy from '../screens/privacypolicy';

export const isReadyRef = createRef();
export const navigationRef = createRef();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeStackNav = () => {
    return <HomeStack.Navigator>
        <HomeStack.Screen name="home" component={HomePage}/>
        {/*
        <Stack.Screen name="inspection" component={InspectionPage} />
        <Stack.Screen name="propertyNewEdit" component={PropertyNewEditPage} />
        <Stack.Screen name="propertyDetail" component={PropertyDetailPage} />
        <Stack.Screen name="inspectionDetail" component={InspectionDetailPage} />
        <Stack.Screen name="inspectionItemFile" component={InspectionItemFilePage} />
        */}
    </HomeStack.Navigator>;
};

const BottomStack = () => {
    return <Tab.Navigator
        initialRouteName="home"
        screenOptions={({
            route
        }) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.panel,
                borderBottomColor: "#d3d3d3",
                borderTopWidth: 0.5,
                shadowOpacity: 0,
                shadowOffset: {
                    height: 0,
                    width: 0
                },
                borderWidth: 0,
                paddingTop: 6,
                elevation: 0,
                height: 60
            },
            tabBarIcon: ({
                focused
            }) => {
                switch(route.name) {
                case "home":
                    return <SVGHome
                        theme={focused ? "dark" : "light"}
                    />;
                case "chat":
                    return <SVGChat
                        theme={focused ? "dark" : "black"}
                        size={1.25}
                    />;
                case "settings":
                    return <SVGCog
                        theme={focused ? "dark" : "light"}
                    />;
                }
            }
        })}
    >
        <Tab.Screen name="home" component={HomeStackNav}/>
        <Tab.Screen name="chat" component={ChatPage} />
        <Tab.Screen name="settings" component={SettingsPage} />
    </Tab.Navigator>;
};

const MainStack = () => {
    const navigation = useNavigation();
    const [globalState] = useGlobalState();

    useEffect(() => {
        if(globalState.accessToken && globalState.accessToken !== "") {
            navigation.navigate("app");
        }
    }, [globalState.accessToken]);

    return <Stack.Navigator
        initialRouteName={'loading'}
    >
        <Stack.Screen name="loading" component={LoadingPage} />
        <Stack.Screen name="login" component={LoginPage} />
        {/*
        <Stack.Screen name="register" component={RegisterPage} />
        <Stack.Screen name="forgotPassword" component={ForgotPasswordPage} />
        <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="profileDetail" component={ProfileDetailPage} />
        */}
        <Stack.Screen name="devLogin" component={DebugModePage} />
        <Stack.Screen
            name="app"
            component={BottomStack}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>;
};

const Root = () => {
    return <NavigationContainer
        ref={navigationRef}
        onReady={() => {
            isReadyRef.current = true;
        }}
    >
        <MainStack/>
    </NavigationContainer>;
};
export default Root;
