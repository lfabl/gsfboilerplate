import {
    StyleSheet
} from 'react-native';
import {
    colors 
} from '../../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.panel,
        flex: 1
    },
    profileContainer: {
        flexDirection: "row",
        padding: 20
    },
    logo: {
        borderRadius: 25,
        height: 50,
        width: 50
    },
    profileTitleContainer: {
        flexDirection: "column",
        marginLeft: 20,
        flex: 1
    },
    overline: {
        color: colors.hideBody,
        fontWeight: "600"
    },
    profileTitle: {
        color: colors.body,
        fontWeight: "700",
        fontSize: 18
    },
    profileEditButton: {
        paddingHorizontal: 16,
        marginLeft: 20
    },
    row: {
        marginHorizontal: 10,
        
    },
    emptyArea: {
        flex: 1
    }
});
export default styles;
