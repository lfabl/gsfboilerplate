import {
    StyleSheet
} from "react-native";
import {
    colors
} from "../../theme";

export default StyleSheet.create({
    headerContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    switchContainer: {
        paddingHorizontal: 20,
        alignSelf: "baseline"
    },
    switchTitle: {
    },
    title: {
        fontWeight: "700",
        marginBottom: 10,
        fontSize: 18
    },
    input: {
        backgroundColor: colors.background,
        paddingHorizontal: 15,
        paddingVertical: 20,
        color: colors.body,
        borderRadius: 12,
        marginBottom: 8
    },
    disabled: {
        opacity: 0.5
    }
});
