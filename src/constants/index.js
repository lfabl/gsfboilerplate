export const DEBUG_MODE = false;

export let MAIN_URL = DEBUG_MODE ? "https://sbox-gablesinsurancerecovery.cs1.force.com" : "https://gablesinsurancerecovery.my.site.com";

export const SERVICE_VERSION = "54.0";

export let SERVICE_URL = `${MAIN_URL}/services/data/v${SERVICE_VERSION}/sobjects`;
export let AUTHORIZATION_URL = `${MAIN_URL}/services/oauth2/authorize`;
export let TOKEN_URL = `${MAIN_URL}/services/oauth2/token`;

export const setMainUrl = (mode) => {
    MAIN_URL = mode === "sandbox" ? "https://sbox-gablesinsurancerecovery.cs1.force.com" : "https://gablesinsurancerecovery.my.site.com";
    SERVICE_URL = `${MAIN_URL}/services/data/v${SERVICE_VERSION}/sobjects`;
    AUTHORIZATION_URL = `${MAIN_URL}/services/oauth2/authorize`;
    TOKEN_URL = `${MAIN_URL}/services/oauth2/token`;
    AUTH_URL = `${AUTHORIZATION_URL}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;
};

export const NEW_TOKEN_GRANT_TYPE = "password";
export const REFRESH_TOKEN_GRANT_TYPE = "refresh_token";
export const CLIENT_ID = "3MVG9p1Q1BCe9GmDC8P3LbQFfVOxDlaBHBs5GoUlN8z7iLwOwK3MGlf1rWAWLhWHSnkJ7ETCAp9XUoaAmKlX2";
export const CLIENT_SECRET = "02C99F086E54968639F366DB578CA685D318B0A5BDF21DFD82DE5EECF3F05D35";
export const REDIRECT_URI = "https://login.salesforce.com/services/oauth2/success";
export const RESPONSE_TYPE = "token";
export const CALLBACK_URL = encodeURIComponent("girapp://success");

export let AUTH_URL = `${AUTHORIZATION_URL}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

export const GLOBAL_STATE_STORE = {
    debugURLForDebugMode: null,
    accessToken: undefined,
    refreshToken: undefined,
    contact: {
    },
    properties: {
    },
    itemValuesByCategory: {
    },
    user: {
    },
    templates: {
    },
    account: {
    },
    profileImage: {
        data: "",
        type: ""
    },
    modal: {
        isActive: false,
        content: null,
        icon: null,
        buttonText: "Okay",
        title: "Oops!",
        iconColor: "##FEADAD"
    },
    cachedDatas: []
};

export const GENDERS = [
    "Female",
    "Male"
];
