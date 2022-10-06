import {
    StyleSheet
} from 'react-native';
import {
    colors 
} from '../../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.modalBackground,
        flex: 1
    },
    dialogContainer: {
        justifyContent: "center",
        position: "absolute",
        alignItems: "center",
        padding: 20,
        bottom: 0,
        right: 0,
        left: 0,
        top: 0
    },
    contentContainer: {
        backgroundColor: colors.background,
        alignSelf: "center",
        borderRadius: 10,
        width: "100%",
        padding: 20
    },
    headerContainer: {
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        fontFamily: "Poppins-SemiBold",
        color: colors.body,
        fontWeight: "600",
        fontSize: 18
    },
    content: {
        textAlign: "center",
        width: "100%"
    },
    contentText: {
        textAlign: "center"
    },
    buttons: {
        flexDirection: "row",
        width: "100%"
    },
    button: {
        width: "50%"
    },
    buttonTitle: {
        fontFamily: "Poppins-Bold"
    }
});
export default styles;
