import {
    StyleSheet
} from 'react-native';
import {
    colors 
} from '../../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.panel,
        flexDirection: "column",
        marginHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    image: {
        borderRadius: 6,
        height: 150
    },
    contentContainerCustomStyle: {
        overflow: "hidden",
        borderRadius: 6
    },
    leftIcon: {
        paddingVertical: 40,
        paddingRight: 10,
        paddingLeft: 15
    },
    rightIcon: {
        paddingVertical: 40,
        paddingRight: 15,
        paddingLeft: 10
    },
    addressContainer: {
        borderBottomColor: colors.seperator,
        paddingHorizontal: 20,
        flexDirection: "row",
        borderBottomWidth: 1
    },
    address2: {
        color: colors.hideBody,
        marginBottom: 6,
        width: "100%",
        fontSize: 18,
        flex: 1
    },
    address: {
        color: colors.body,
        marginBottom: 20,
        fontSize: 18,
        flex: 1
    },
    detailsContainer: {
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 20
    },
    detailContentContainer: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        flex: 1
    },
    detailContent: {
        color: colors.body,
        fontWeight: "bold",
        marginBottom: 6,
        fontSize: 14
    },
    detailContentTitle: {
        color: colors.hideBody,
        fontSize: 12
    },
    verticalSeperator: {
        backgroundColor: colors.seperator,
        height: "100%",
        width: 1
    },
    addressesContent: {
        flexDirection: "column",
        marginLeft: 20,
        flex: 1
    }
});
export default styles;
