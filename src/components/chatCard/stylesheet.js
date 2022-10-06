import {
    StyleSheet
} from "react-native";
import {
    colors 
} from "../../theme";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 20,
        width: "100%"
    },
    imageContainer: {
        borderColor: colors.seperator,
        alignItems: "center",
        borderRadius: 250,
        marginRight: 10,
        borderWidth: 1,
        padding: 10
    },
    image: {
        height: 50,
        width: 50
    },
    contentContainer: {
        justifyContent: "center",
        flexDirection: "column"
    },
    message: {
        textAlignVertical: "center",
        alignItems: "center",
        fontWeight: "800",
        borderRadius: 10,
        lineHeight: 20,
        fontSize: 14,
        padding: 10
    },
    date: {
        color: colors.hideBody,
        fontWeight: "800",
        marginLeft: 10,
        fontSize: 12,
        marginTop: 2
    }
});
export default styles;
