import React, {
    useEffect
} from "react";
import {
    Image,
    Text,
    View
} from "react-native";
import Button from "../../components/button";
import {
    useGlobalState 
} from "../../context";
import styles from "./stylesheet";

const DebugMode = ({
    navigation
}) => {
    const [globalState, setGlobalState] = useGlobalState();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        });
    });

    useEffect(() => {
        if(globalState.debugMode) navigation.navigate("loading");
    }, [globalState.debugMode]);

    return <View
        style={[
            styles.container
        ]}
    >
        <View
            style={[
                styles.headerContainer
            ]}
        >
            <Image
                source={require("../../assets/images/girdev.png")}
                resizeMode="contain"
                style={[
                    styles.logo
                ]}
            />
            <Text
                style={[
                    styles.title
                ]}
            >
                Welcome to Debug Mode!
            </Text>
            <Text
                style={[
                    styles.title
                ]}
            >
                Open With:
            </Text>
        </View>
        <Button
            title="Sandbox"
            onPress={() => {
                setGlobalState({
                    debugMode: "sandbox"
                });
            }}
            style={{
                ...styles.button
            }}
            titleStyle={{
                ...styles.buttonTitle
            }}
        />
        <Button
            title="Production"
            onPress={() => {
                setGlobalState({
                    debugMode: "production"
                });
            }}
            style={{
                ...styles.button
            }}
            titleStyle={{
                ...styles.buttonTitle
            }}
        />
    </View>;
};
export default DebugMode;
