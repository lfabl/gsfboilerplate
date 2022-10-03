import React, {
    useEffect,
    useState
} from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    Text
} from 'react-native';
import {
    useNavigation
} from '@react-navigation/native';
import {
    SERVICE_VERSION,
    MAIN_URL
} from '../../constants';
import {
    useGlobalState
} from '../../context';
import {
    colors 
} from '../../theme';
import {
    init 
} from '../../api';
import ReactNativeBlobUtil from 'react-native-blob-util';
import PropertyCard from '../../components/propertyCard';
import StateCard from '../../components/stateCard';
import DeviceInfo from 'react-native-device-info';
import UserInfo from '../../components/userInfo';
import SVGPlus from '../../assets/svgs/svgPlus';
import Toast from "react-native-simple-toast";
import Button from '../../components/button';
import stylesheet from './stylesheet';

const Home = () => {
    const navigation = useNavigation();
    const [globalState, setGlobalState] = useGlobalState();

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [initial, setInitial] = useState(true);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    navigation.setOptions({
        headerShown: false,
        gestureEnabled: false
    });

    useEffect(() => {
        if(!initial) setLoading(false);
    }, [data]);

    useEffect(() => {
        // getInitializeData(globalState, setGlobalState);
    }, []);

    useEffect(() => {
        if(!initial) {
            setData(globalState.properties);
        }
        if(initial) setInitial(false);
    }, [globalState.properties]);

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
                return;
            }),
        [navigation]
    );

    const getInitializeData = (_globalState, _setGlobalState) => {
        init({
            accessToken: _globalState.accessToken,
            setGlobalState: setGlobalState,
            globalState: globalState,
            navigation: navigation
        })
            .then(async (res) => {
                if(!res.user["LossInspectionAppAgreement__c"]) {
                    navigation.navigate("privacyPolicy");
                }

                await ReactNativeBlobUtil.fetch(
                    "GET",
                    `${MAIN_URL}/services/data/${SERVICE_VERSION}/sobjects/ContentVersion/${res.user.UserProfilePhoto_CVID__c}/VersionData`,
                    {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${globalState.accessToken}`
                    }
                )
                    .then(async e => {
                        _setGlobalState({
                            user: {
                                ...res.user
                            },
                            profileImage: e && e.data && e.data.length && e.data.indexOf("error") === -1 ? {
                                data: String(e.data),
                                type: "image"
                            } : null,
                            contact: res.contact,
                            itemValuesByCategory: res.itemValuesByCategory,
                            properties: res.properties,
                            templates: res.objTemplateByName,
                            account: res.account
                        });
                        setIsRefreshing(false);
                    })
                    .catch(e => {
                        Toast.show(err.message, Toast.LONG);
                        setIsRefreshing(false);
                    });

            })
            .catch((err) => {
                Toast.show(err.message, Toast.LONG);
                setIsRefreshing(false);
            });
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        getInitializeData(globalState, setGlobalState);
    };

    const renderCards = ({
        item,
        index
    }) => {
        return <PropertyCard
            {...item}
            onPress={() => {
                navigation.navigate("propertyDetail", {
                    id: item.property.id
                });
            }}
            style={{
                ...stylesheet.item
            }}
        />;
    };

    if(loading) {
        return <View
            style={[
                stylesheet.loadingContainer
            ]}
        >
            <ActivityIndicator
                size="large"
                color={colors.primary}
            />
        </View>;
    }

    return <View
        style={[
            stylesheet.container
        ]}
    >
        <UserInfo
            userName={globalState.contact.FirstName}
            userType={`ID: ${globalState.account.AccountNumber}`}
            profileImage={globalState.profileImage}
            logo={require("../../assets/images/gir.png")}
        />
        {
            !data || !data.length ?
                <View
                    style={[
                        stylesheet.emptyContainer
                    ]}
                >
                    <StateCard
                        image={require("../../assets/images/1.png")}
                        content="Add Property to get Started"
                        action={{
                            title: "Add Property",
                            onPress: () => navigation.navigate("propertyNewEdit", {
                                pageType: "new"
                            }),
                            image: <SVGPlus
                                size="small"
                                theme="light"
                            />
                        }}
                    />
                </View>
                :
                null
        }
        <View
            style={[
                {
                    paddingHorizontal: 10,
                    width: DeviceInfo.isTablet() ? "60%" : "auto",
                    alignSelf: "center"
                }
            ]}
        >
            {
                !data || !data.length ?
                    null
                    :
                    <FlatList
                        data={data}
                        renderItem={renderCards}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        maxToRenderPerBatch={3}
                        onRefresh={() => {
                            onRefresh();
                        }}
                        refreshing={isRefreshing}
                        ListHeaderComponent={data && data.length ? <View
                            style={[
                                stylesheet.propertiesTitleContainer
                            ]}
                        >
                            <Text
                                style={[
                                    stylesheet.propertiesTitle
                                ]}
                            >
                                Properties
                            </Text>
                            <Button
                                image={<SVGPlus
                                    size="medium"
                                    theme="dark"
                                />}
                                onPress={() => {
                                    navigation.navigate("propertyNewEdit", {
                                        pageType: "new"
                                    });
                                }}
                                color="transparent"
                                style={{
                                    ...stylesheet.propertiesCreateButton
                                }}
                            />
                        </View> : null}
                        contentContainerStyle={[
                            stylesheet.contentContainer,
                            {
                                paddingBottom: 120
                            }
                        ]}
                    />
            }
        </View>
    </View>;
};
export default Home;
