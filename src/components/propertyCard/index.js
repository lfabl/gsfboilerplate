import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import {
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    View,
    Text
} from 'react-native';
import SVGChevronRight from '../../assets/svgs/svgChevronRight';
import ReactNativeBlobUtil from 'react-native-blob-util';
import SVGPencil from '../../assets/svgs/svgPencil';
import Carousel from 'react-native-snap-carousel';
import DeviceInfo from 'react-native-device-info';
import StreetView from 'react-native-streetview';
import MapView from 'react-native-maps';
import stylesheet from './stylesheet';
import Button from '../button';
import {
    dataConverterWithString
} from '../../util';
import {
    MAIN_URL
} from '../../constants';
import {
    useGlobalState
} from '../../context';
import {
    colors
} from '../../theme';

const PropertyCard = ({
    onImageUpdate,
    postCount,
    preCount,
    property,
    onPress,
    onEdit,
    style
}) => {
    const [globalState, setGlobalState] = useGlobalState();
    const [image, setImage] = useState({
        format: "base64",
        loading: true
    });

    const carouselRef = useRef();
    const cardWidth = Dimensions.get("window").width - 30;

    if(!(property && property.fieldByName)) {
        return null;
    }

    const {
        Primary_Image_ContentVersionId__c,
        Address_Line_One__c,
        Address_Line_Two__c,
        LastModifiedDate,
        Postal_Code__c,
        Longitude__c,
        Latitude__c,
        State__c,
        City__c
    } = property.fieldByName;

    useEffect(() => {
        if(Primary_Image_ContentVersionId__c && (Primary_Image_ContentVersionId__c.thumbValue || Primary_Image_ContentVersionId__c.value) && dataConverterWithString(Primary_Image_ContentVersionId__c.thumbValue ? Primary_Image_ContentVersionId__c.thumbValue : Primary_Image_ContentVersionId__c.value, "STRING")) {
            loadImage(dataConverterWithString(Primary_Image_ContentVersionId__c.thumbValue ? Primary_Image_ContentVersionId__c.thumbValue : Primary_Image_ContentVersionId__c.value, "STRING"), image, Primary_Image_ContentVersionId__c.thumbValue ? Primary_Image_ContentVersionId__c.thumbDataExt : Primary_Image_ContentVersionId__c.fileExt, globalState, setGlobalState);
        } else {
            setImage({
                loading: false
            });
        }
    }, []);

    const loadImage = async (imageId, _data, dataExt, _globalState, _setGlobalState) => {
        if(_globalState.cachedDatas && _globalState.cachedDatas.length && _globalState.cachedDatas.findIndex(e => e.id === imageId) !== -1) {
            const cachedData = _globalState.cachedDatas.find(e => e.id === imageId);
            if(onImageUpdate) onImageUpdate({
                ..._data,
                data: String(cachedData.data),
                dataExt: cachedData.dataExt,
                loading: false
            });

            setImage({
                ..._data,
                data: String(cachedData.data),
                dataExt: cachedData.dataExt,
                loading: false
            });
            return;
        }

        await ReactNativeBlobUtil.fetch(
            "GET",
            `${MAIN_URL}/services/data/v54.0/sobjects/ContentVersion/${imageId}/VersionData`,
            {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${_globalState.accessToken}`
            }
        )
            .then(e => {
                if(onImageUpdate) onImageUpdate({
                    ..._data,
                    data: String(e.data),
                    dataExt: dataExt,
                    loading: false
                });

                let _globalStateCachedDatas = JSON.parse(JSON.stringify(_globalState.cachedDatas));
                _globalStateCachedDatas.push({
                    data: String(e.data),
                    dataExt: dataExt,
                    id: imageId
                });
                _setGlobalState({
                    cachedDatas: _globalStateCachedDatas
                });

                setImage({
                    ..._data,
                    data: String(e.data),
                    dataExt: dataExt,
                    loading: false
                });
            })
            .catch(e => {
                // console.error("load image error:", e);
            });
    };

    const renderHeader = () => {
        let images = [];

        if(Primary_Image_ContentVersionId__c && (Primary_Image_ContentVersionId__c.value !== "null" || Primary_Image_ContentVersionId__c.thumbValue !== null)) {
            images.push({
                type: "image",
                url: `data:image/${image.dataExt};base64,${image.data}`
            });
        }

        if(Longitude__c && Longitude__c.value !== "null" && Latitude__c && Latitude__c.value !== "null") {
            images.push({
                type: "map",
                longitude: dataConverterWithString(Longitude__c.value, Longitude__c.fieldDesc.fieldType),
                latitude: dataConverterWithString(Latitude__c.value, Latitude__c.fieldDesc.fieldType),
                mapType: "standard"
            });
        }

        if(Longitude__c && Longitude__c.value !== "null" && Latitude__c && Latitude__c.value !== "null") {
            images.push({
                type: "map",
                longitude: dataConverterWithString(Longitude__c.value, Longitude__c.fieldDesc.fieldType),
                latitude: dataConverterWithString(Latitude__c.value, Latitude__c.fieldDesc.fieldType),
                mapType: "streetview"
            });
        }

        if(!(Longitude__c && Longitude__c.value !== "null" && Latitude__c && Latitude__c.value !== "null")) {
            images.push({
                type: "emptyMap"
            });
        }

        return <View
            style={[
                stylesheet.header
            ]}
        >
            <TouchableOpacity
                onPress={() => carouselRef.current?.snapToPrev?.()}
                style={[
                    stylesheet.leftIcon
                ]}
            >
                <SVGChevronRight
                    size="small"
                    theme="light"
                    style={{
                        transform: [{
                            rotateZ: "180deg"
                        }]
                    }}
                />
            </TouchableOpacity>
            <Carousel
                data={images}
                ref={carouselRef}
                sliderWidth={cardWidth}
                itemWidth={cardWidth - 10}
                contentContainerCustomStyle={[
                    stylesheet.contentContainerCustomStyle
                ]}
                loop={true}
                autoplay={false}
                autoplayDelay={3000}
                autoplayInterval={3000}
                enableSnap={true}
                scrollEnabled={true}
                horizontal={true}
                loopClonesPerSide={images.length}
                firstItem={-images.length}
                renderItem={({
                    item
                }) => {
                    switch(item.type) {
                    case "image":
                        return image.loading ?
                            <View
                                style={{
                                    width: DeviceInfo.isTablet() ? Platform.OS === "ios" ? cardWidth - 500 : cardWidth - 400 : cardWidth - 90,
                                    height: "100%",
                                    backgroundColor: colors.softBackground,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flex: 1
                                }}
                            >
                                <ActivityIndicator
                                    size="large"
                                    color={colors.primary}
                                />
                            </View>
                            :
                            <Image
                                resizeMode={DeviceInfo.isTablet() ? "contain" : "cover"}
                                key={item.url}
                                source={{
                                    uri: item.url,
                                    cache: "reload"
                                }}
                                style={[
                                    {
                                        width: DeviceInfo.isTablet() ? Platform.OS === "ios" ? cardWidth - 500 : cardWidth - 400 : cardWidth - 90
                                    },
                                    stylesheet.image
                                ]}
                            />;
                    case "emptyMap":
                        return <View
                            style={{
                                width: DeviceInfo.isTablet() ? Platform.OS === "ios" ? cardWidth - 500 : cardWidth - 400 : cardWidth - 90,
                                height: 150,
                                backgroundColor: colors.softBackground,
                                justifyContent: "center",
                                alignItems: "center",
                                flex: 1
                            }}
                        >
                            <Image
                                source={require("../../assets/images/map.png")}
                                height={35}
                                width={35}
                                style={{
                                    height: 35,
                                    width: 35
                                }}
                            />
                        </View>;
                    case "map":
                        if(item.mapType === "streetview") {
                            return <StreetView
                                allGesturesEnabled={true}
                                coordinate={{
                                    'latitude': item.latitude,
                                    'longitude': item.longitude
                                }}
                                pov={{
                                    tilt: parseFloat(0),
                                    bearing: parseFloat(0),
                                    zoom: parseInt(1)
                                }}
                                style={{
                                    width: cardWidth - 65,
                                    height: 150
                                }}
                            />;
                        } else {
                            return <MapView
                                initialRegion={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }}
                                mapType={item.mapType}
                                pointerEvents="none"
                                zoomEnabled={false}
                                rotateEnabled={false}
                                scrollEnabled={false}
                                pitchEnabled={false}
                                style={{
                                    width: cardWidth - 65,
                                    height: 150
                                }}
                            />;
                        }
                    }
                }}
            />
            <TouchableOpacity
                onPress={() => carouselRef.current?.snapToNext?.()}
                style={[
                    stylesheet.rightIcon
                ]}
            >
                <SVGChevronRight
                    theme="light"
                    size="small"
                />
            </TouchableOpacity>
        </View>;
    };

    const renderAddresses = () => {
        return <View
            style={[
                stylesheet.addressContainer
            ]}
        >
            <View
                style={[
                    stylesheet.addressesContent
                ]}
            >
                <Text
                    style={[
                        stylesheet.address2
                    ]}
                >
                    {dataConverterWithString(Address_Line_One__c.value, Address_Line_One__c.fieldDesc.fieldType)}
                </Text>
                <Text
                    style={[
                        stylesheet.address2,
                        {
                            marginBottom: 20
                        }
                    ]}
                >
                    {dataConverterWithString(City__c.value, City__c.fieldDesc.fieldType)},{" "}
                    {dataConverterWithString(State__c.value, State__c.fieldDesc.fieldType)},{" "}
                    {dataConverterWithString(Postal_Code__c.value, Postal_Code__c.fieldDesc.fieldType)}
                </Text>
            </View>
            {
                onEdit ?
                    <Button
                        onPress={onEdit}
                        color="transparent"
                        image={<SVGPencil
                            theme="dark"
                        />}
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 0
                        }}
                    />
                    :
                    null
            }
        </View>;
    };

    const renderDetails = () => {
        return <View
            style={[
                stylesheet.detailsContainer
            ]}
        >
            {renderDetailContent({
                content: dataConverterWithString(LastModifiedDate.value, LastModifiedDate.fieldDesc.fieldType),
                title: "Last Modified"
            })}
            {verticalSeperator()}
            {renderDetailContent({
                title: "PRE-LOSS",
                content: preCount
            })}
            {verticalSeperator()}
            {renderDetailContent({
                title: "POST-LOSS",
                content: postCount
            })}
        </View>;
    };

    const renderDetailContent = ({
        content,
        title
    }) => {
        return <View
            style={[
                stylesheet.detailContentContainer
            ]}
        >
            <Text
                style={[
                    stylesheet.detailContent
                ]}
            >
                {content ? content : "-"}
            </Text>
            <Text
                style={[
                    stylesheet.detailContentTitle
                ]}
            >
                {title}
            </Text>
        </View>;
    };

    const verticalSeperator = () => {
        return <View
            style={[
                stylesheet.verticalSeperator
            ]}
        ></View>;
    };

    return <View
        style={[
            stylesheet.container,
            style
        ]}
    >
        {renderHeader()}
        <TouchableOpacity
            onPress={onPress}
        >
            {renderAddresses()}
            {renderDetails()}
        </TouchableOpacity>
    </View>;
};
export default PropertyCard;
