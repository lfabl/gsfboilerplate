import {
    StyleSheet 
} from "react-native";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        flex: 1
    },
    headerContainer: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
        width: "100%"
    },
    logo: {
        height: 100,
        width: 150
    },
    title: {
        fontSize: 22
    },
    button: {
        paddingVertical: 0,
        marginBottom: 10,
        width: "100%"
    },
    buttonTitle: {
        paddingVertical: 20,
        fontSize: 20
    }
});
export default styles;
