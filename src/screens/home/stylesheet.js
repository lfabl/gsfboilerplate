import {
    StyleSheet
} from 'react-native';
import {
    colors 
} from '../../theme';

const styles = StyleSheet.create({
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    container: {
        backgroundColor: colors.background,
        flex: 1
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    contentContainer: {
        // flex: 1
    },
    propertiesTitleContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10
    },
    propertiesTitle: {
        fontFamily: "Poppins-Medium",
        fontWeight: "700",
        color: "black",
        fontSize: 18
    },
    propertiesCreateButton: {
        alignSelf: "baseline",
        paddingRight: 0
    },
    item: {
        marginBottom: 20
    }
});
export default styles;
