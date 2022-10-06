import React from "react";
import {
    Image,
    View,
    Text
} from "react-native";
import styles from "./stylesheet";
import {
    colors
} from "../../theme";
import moment from "moment";

const ChatCard = ({
    direction,
    message,
    date
}) => {
    const newDate = new Date(date);
    const isYesterday = moment(newDate).isSame("YESTERDAY", "d");

    return <View
        style={[
            styles.container,
            {
                justifyContent: direction === "Received" ? "flex-start" : "flex-end",
                alignItems: "center"
            }
        ]}
    >
        {
            direction === "Received" ?
                <View
                    style={[
                        styles.imageContainer
                    ]}
                >
                    <Image
                        source={require("../../assets/images/gir.png")}
                        resizeMode="contain"
                        style={[
                            styles.image
                        ]}
                    />
                </View>
                :
                null
        }
        <View
            style={[
                styles.contentContainer,
                {
                    marginTop: direction === "Received" ? 22 : 0
                }
            ]}
        >
            <View
                style={{
                    backgroundColor: direction === "Received" ? colors.background : colors.primary,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    overflow: 'hidden',
                }}
            >
                <Text
                    style={[
                        styles.message,
                        {
                            color: direction === "Received" ? colors.primary : colors.panel
                        }
                    ]}
                >
                    {message}
                </Text>
            </View>
            <Text
                style={[
                    styles.date
                ]}
            >
                {moment(newDate).format(isYesterday ? "Yesterday hh:mm A" : "ddd, MMM DD, hh:mm A")}
            </Text>
        </View>
    </View>;
};
export default ChatCard;
