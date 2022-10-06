import React, {
    useEffect,
    useState
} from 'react';
import {
    TextInput,
    FlatList,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import api from '../../api';
import SVGSend from '../../assets/svgs/svgSend';
import Button from '../../components/button';
import ChatCard from '../../components/chatCard';
import {
    MAIN_URL 
} from '../../constants';
import {
    useGlobalState 
} from '../../context';
import {
    colors 
} from '../../theme';
import Toast from "react-native-simple-toast";

const Chat = ({
    navigation
}) => {
    const [globalState, setGlobalState] = useGlobalState();

    const [isSendingLoading, setIsSendingLoading] = useState(false);
    const [isCanGetMoreData, setIsCanGetMoreData] = useState(true);
    const [messageCount, setMessageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0.5,
                borderBottomColor: "#d3d3d3"
            },
            headerTitle: () => <Text
                style={{
                    fontFamily: "Poppins-SemiBold",
                    alignSelf: "center",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "black",
                    width: "100%",
                    fontSize: 20
                }}
            >
                Chat
            </Text>
        });
    });

    useEffect(() => {
        getMessages({
            setMessages,
            messages
        });
    }, []);

    const getMessages = ({
        setMessages,
        messages
    }) => {
        if(!isCanGetMoreData) {
            return;
        }
        setLoading(true);

        api({
            url: `${MAIN_URL}/services/apexrest/v1/MessageResource${messageCount ? "/" + messageCount : ""}`,
            accessToken: globalState.accessToken,
            setGlobalState: setGlobalState,
            globalState: globalState,
            navigation: navigation
        })
            .then((res) => {
                if(!res.length) {
                    setIsCanGetMoreData(false);
                }

                setMessageCount(messageCount + res.length);
                setMessages([
                    ...messages,
                    ...res
                ]);
                setLoading(false);
            })
            .catch((err) => {
                Toast.show(err.message, Toast.LONG);
            });
    };

    const sendMessage = () => {
        if(!message || !message.length) {
            Toast.show("Please enter any message.", Toast.SHORT);
            return;
        }

        setIsSendingLoading(true);
        api({
            url: `${MAIN_URL}/services/apexrest/v1/MessageResource`,
            accessToken: globalState.accessToken,
            setGlobalState: setGlobalState,
            globalState: globalState,
            navigation: navigation,
            method: "POST",
            body: JSON.stringify({
                message: message
            })
        })
            .then((res) => {
                if(!res.length) {
                    setIsCanGetMoreData(false);
                }

                setMessage("");
                setMessageCount(messageCount + 1);
                let newMessages = JSON.parse(JSON.stringify(messages));
                newMessages.unshift(res);
                setMessages(newMessages);
                setIsSendingLoading(false);
            })
            .catch((err) => {
                Toast.show(err.message, Toast.LONG);
            });
    };

    return <View
        style={{
            backgroundColor: "#fff",
            paddingBottom: 10,
            paddingRight: 10,
            paddingLeft: 10,
            paddingTop: 0,
            flex: 1
        }}
    >
        <FlatList
            data={messages}
            inverted={true}
            onEndReached={() => {
                if(isCanGetMoreData) {
                    getMessages({
                        setMessages,
                        messages
                    });
                }
            }}
            onEndReachedThreshold={0.01}
            ListEmptyComponent={!messages.length && loading ? <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}
            >
                <ActivityIndicator
                    color={colors.primary}
                    size="large"
                />
            </View> : null}
            ListFooterComponent={messages.length && loading ? <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    padding: 20
                }}
            >
                <ActivityIndicator
                    color={colors.primary}
                    size="small"
                />
            </View> : null}
            keyExtractor={(_, index) => `message-${index}`}
            renderItem={({
                item,
                index 
            }) => {
                return <ChatCard
                    key={`message-${index}`}
                    direction={item.direction}
                    message={item.message.replace(/\\n/g, "\n")}
                    date={item.sentOn}
                />;
            }}
            contentContainerStyle={loading && !messages.length ? {
                flex: 1
            } : undefined}
            style={{
                flex: 1
            }}
        />
        <View
            style={{
                backgroundColor: colors.shadowPrimary,
                flexDirection: "row",
                borderRadius: 50,
                width: "100%"
            }}
        >
            <TextInput
                placeholder="Message"
                placeholderTextColor={colors.hideBody}
                value={message}
                onChangeText={(text) => setMessage(text)}
                style={{
                    paddingHorizontal: 20,
                    flex: 1
                }}
            />
            <Button
                image={isSendingLoading ? <ActivityIndicator
                    color={colors.primary}
                    size="small"
                /> : <SVGSend
                    theme="dark"
                />}
                style={{
                    backgroundColor: "transparent",
                    paddingHorizontal: 30
                }}
                onPress={() => {
                    sendMessage();
                }}
            />
        </View>
    </View>;
};
export default Chat;
