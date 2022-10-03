import moment from 'moment';

const QUOTE_REGEX = /"/g;

export const getKeyAndValuesFromURLString = (paramsString) => {
    let urlVariables = {
    };
    
    const keyAndValues = paramsString.split("&");
    keyAndValues.forEach(item => {
        const currentObject = item.split("=");
        urlVariables[currentObject[0]] = currentObject[1];
    });

    return urlVariables;
};

export const dataConverterWithString = (value, type) => {
    const newVal = value.replace(QUOTE_REGEX, "");
    switch(type) {
    case "DATETIME":
        return moment(new Date(newVal)).format("MM/DD/YYYY");
    case "STRING":
        return newVal === "null" ? "" : newVal;
    case "DOUBLE":
        return Number(newVal);
    case "PICKLIST":
        return newVal;
    case "TEXTAREA":
        return newVal;
    case "ID":
        return newVal;
    case "CURRENCY":
        return Number(newVal);
    case "DOCUMENT":
        return newVal;
    case "BOOLEAN":
        return newVal === "true" ? true: false;
    }
};

export async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
	  	await callback(array[index], index, array);
    }
};
