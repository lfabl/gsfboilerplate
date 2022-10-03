import {
    REFRESH_TOKEN_GRANT_TYPE,
    CLIENT_SECRET,
    CLIENT_ID,
    TOKEN_URL,
    MAIN_URL
} from "../constants";
import storage from "../storage";

const TIME_OUT = 100000;

const timer = ({
    timeout = TIME_OUT
}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Connection timed out.");
        }, timeout);
    });
};

const request = ({
    method = "GET",
    setGlobalState,
    directResponse,
    globalState,
    accessToken,
    navigation,
    headers,
    body,
    url
}) => {
    return new Promise((resolve, reject) => {
        const _headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            ...headers
        };

        if(accessToken) {
            _headers.Authorization = `Bearer ${accessToken}`;
        }

        fetch(url, {
            method: method,
            headers: _headers,
            body: body
        })
            .then(async (res) => {
                if(method === "DELETE" && (res.status === 200 || res.status === 201)) {
                    resolve(true);
                    return true;
                }

                if(directResponse && (res.status === 200 || res.status === 201)) {
                    resolve(true);
                    return true;
                }

                const data = await res.json();
                if(res.status === 200 || res.status === 201) {
                    resolve(data);
                    return data;
                }

                try {
                    if(data.recordErrorsById) {
                        const keys = Object.keys(data.recordErrorsById);
                        const _data = data.recordErrorsById[keys[0]];
                        if(_data && _data.fieldErrors) {
                            reject(_data.fieldErrors);
                            return false;
                        } else {
                            reject({
                                message: "Failed to this process. Please contact GIR."
                            });
                        }
                    }
                } catch(error) {
                    reject(error);
                    return false;
                }

                reject(data);
                throw new Error('Something went wrong');
            })
            .catch(async (err) => {
                if(err.error === "invalid_grant") {
                    if(err.message.indexOf("expired access") !== -1) {
                        storage.delete("token");
                        storage.delete("refreshToken");
                        navigation.navigate("login");
                        reject("Session closed.");
                        return;
                    }
                    const refreshToken = storage.getString("refreshToken");
                    refreshToken({
                        refreshToken: refreshToken,
                        setGlobalState,
                        globalState
                    })
                        .then((newAccessToken) => {
                            request({
                                accessToken: newAccessToken,
                                setGlobalState,
                                globalState,
                                navigation,
                                headers,
                                method,
                                body,
                                url
                            });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    reject(err);
                }
            });
    });
};

export const refreshToken = ({
    setGlobalState,
    globalState,
    refreshToken,
    navigation
}) => {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams({
            grant_type: REFRESH_TOKEN_GRANT_TYPE,
            refresh_token: refreshToken,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        });

        api({
            url: `${TOKEN_URL}?${params}`,
            setGlobalState,
            globalState,
            method: "POST",
            navigation
        })
            .then((res: ResponseParams) => {
                if(res.error) {
                    reject(res.error);
                    return;
                }
                resolve(res.access_token);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const init = ({
    setGlobalState,
    globalState,
    accessToken,
    navigation
}) => {
    return new Promise((resolve, reject) => {
        const url = `${MAIN_URL}/services/apexrest/v1/GIRAppGlobalInit`;
        api({
            setGlobalState,
            globalState,
            accessToken,
            navigation,
            url: url
        })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

const api = ({
    accessToken,
    setGlobalState,
    directResponse,
    globalState,
    navigation,
    headers,
    timeout,
    method,
    body,
    url
}) => {
    return new Promise((resolve, reject) => {
        Promise.race([
            timer({
                timeout
            }),
            request({
                setGlobalState,
                directResponse,
                globalState,
                accessToken,
                navigation,
                headers,
                method,
                body,
                url
            })
        ])
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
export default api;
