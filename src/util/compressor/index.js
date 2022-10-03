import {
    Image,
    Video
} from 'react-native-compressor';

export const imageCompress = async (path, options) => {
    const res = await Image.compress(path, {
        compressionMethod: "manual",
        ...options
    });
    return res;
};

export const videoCompress = async (path) => {
    const res = await Video.compress(path, {
        compressionMethod: "auto"
    });
    return res;
};
