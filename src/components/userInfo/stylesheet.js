import {
    StyleSheet    
} from 'react-native';
import {
    colors 
} from '../../theme';

const styles = StyleSheet.create({
    container: {
        borderBottomColor: "#d3d3d3",
        borderBottomWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 20,
        width: "100%",
        padding: 20
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    profile: {
        borderRadius: 25,
        marginRight: 10,
        height: 50,
        width: 50
    },
    welcome: {
        fontFamily: "Poppins-Medium",
        color: "black",
        fontSize: 18
    },
    userName: {
        fontFamily: "Poppins-Medium",
        fontWeight: "bold"
    },
    userType: {
        fontFamily: "Poppins-Medium",
        color: colors.hideBody,
        fontWeight: "500",
        fontSize: 14
    },
    title: {
        flexDirection: "column",
        flex: 1
    },
    logo: {
        marginLeft: 20,
        height: 50,
        width: 50
    }
});
export default styles;
