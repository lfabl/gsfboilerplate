import React, {
    useEffect,
    useState,
    useRef
} from "react";
import {
    TextInput,
    View,
    Text
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import SVGCalendar from "../../assets/svgs/svgCalendar";
import Toast from "react-native-simple-toast";
import stylesheet from "./stylesheet";
import Button from "../button";
import moment from "moment";
import {
    colors
} from "../../theme";

// MOCK DATA:
const CURRENT_DATE = new Date();
const LAST_YEAR_DATE = new Date(moment(new Date()).subtract("years", 1));
const MOCK_DATA = {
    df: `${CURRENT_DATE.getFullYear()}-${CURRENT_DATE.getMonth(2)}-${CURRENT_DATE.getDay(2)}T00:00:00.000Z`, //Date From
    dt: `${LAST_YEAR_DATE.getFullYear()}-${LAST_YEAR_DATE.getMonth(2)}-${LAST_YEAR_DATE.getDay(2)}T00:00:00.000Z`, //Date To
    isLit: true,
    lit: "LAST WEEK",
    wf: 1, //Week From
    wt: 1, //Week To
    yf: 2020, //Year From
    yt: 2020, //Year To
    cf: 2019, //Comparison Year
    acf: true, //Allow Comparison Year
    adc: false //Allow Date Change
};

const LIT_DATA = [
    "CURRENT WEEK",
    "CURRENT WEEK + 1",
    "CURRENT WEEK + 2",
    "CURRENT WEEK - 1",
    "CURRENT WEEK - 2",
    "CURRENT WEEK - 3",
    "CURRENT WEEK - 4",
    "YESTERDAY",
    "TODAY",
    "TOMORROW",
    "LAST WEEK",
    "YEAR TO DATE"
];

const litCalculate = (type) => {
    const currentDate = new Date();

    if(type && type.indexOf("CURRENT WEEK +") !== -1) {
        const addedWeek = Number(type.split(" + ")[1]);
        const week = new Date(moment(new Date()).add("weeks", addedWeek));
        const firstDayOfWeek = new Date(moment(week).startOf("week"));
        const lastDayOfWeek = new Date(moment(week).endOf("week"));

        return {
            df: firstDayOfWeek.toISOString(),
            dt: lastDayOfWeek.toISOString(),
            wf: moment(firstDayOfWeek).get("week"),
            wt: moment(lastDayOfWeek).get("week"),
            yf: firstDayOfWeek.getFullYear(),
            yt: lastDayOfWeek.getFullYear()
        };
    }

    if(type && type.indexOf("CURRENT WEEK -") !== -1) {
        const substractedWeek = Number(type.split(" - ")[1]);
        const week = new Date(moment(new Date()).subtract("weeks", substractedWeek));
        const firstDayOfWeek = new Date(moment(week).startOf("week"));
        const lastDayOfWeek = new Date(moment(week).endOf("week"));

        return {
            df: firstDayOfWeek.toISOString(),
            dt: lastDayOfWeek.toISOString(),
            wf: moment(firstDayOfWeek).get("week"),
            wt: moment(lastDayOfWeek).get("week"),
            yf: firstDayOfWeek.getFullYear(),
            yt: lastDayOfWeek.getFullYear()
        };
    }

    switch(type) {
        case "YESTERDAY":
            const yesterday = new Date(moment(new Date()).subtract("days", 1));

            return {
                df: yesterday.toISOString(),
                dt: yesterday.toISOString(),
                wf: moment(yesterday).get("week"),
                wt: moment(yesterday).get("week"),
                yf: yesterday.getFullYear(),
                yt: yesterday.getFullYear()
            };
        case "TODAY":
            return {
                df: currentDate.toISOString(),
                dt: currentDate.toISOString(),
                wf: moment(currentDate).get("week"),
                wt: moment(currentDate).get("week"),
                yf: currentDate.getFullYear(),
                yt: currentDate.getFullYear()
            };
        case "TOMORROW":
            const tomorrow = new Date(moment(new Date()).add("days", 1));

            return {
                df: tomorrow.toISOString(),
                dt: tomorrow.toISOString(),
                wf: moment(tomorrow).get("week"),
                wt: moment(tomorrow).get("week"),
                yf: tomorrow.getFullYear(),
                yt: tomorrow.getFullYear(),
            };
        case "CURRENT WEEK":
            const currentWeekFirstDate = new Date(moment(new Date()).startOf("week"));
            const currentWeekLastDate = new Date(moment(new Date()).endOf("week"));

            return {
                df: currentWeekFirstDate.toISOString(),
                dt: currentWeekLastDate.toISOString(),
                wf: moment(currentWeekFirstDate).get("week"),
                wt: moment(currentWeekLastDate).get("week"),
                yf: currentWeekFirstDate.getFullYear(),
                yt: currentWeekLastDate.getFullYear()
            };
        case "LAST WEEK":
            const lastWeek = new Date(moment(new Date()).subtract("weeks", 1));
            const lastWeekFirstDate = new Date(moment(lastWeek).startOf("week"));
            const lastWeekLastDate = new Date(moment(lastWeek).endOf("week"));

            return {
                df: lastWeekFirstDate.toISOString(),
                dt: lastWeekLastDate.toISOString(),
                wf: moment(lastWeekFirstDate).get("week"),
                wt: moment(lastWeekLastDate).get("week"),
                yf: lastWeekFirstDate.getFullYear(),
                yt: lastWeekLastDate.getFullYear()
            };
        case "YEAR TO DATE":
            const currentYearFirstDay = new Date(moment(new Date()).startOf("year"));

            return {
                df: currentYearFirstDay.toISOString(),
                dt: currentDate.toISOString(),
                wf: moment(currentYearFirstDay).get("week"),
                wt: moment(currentDate).get("week"),
                yf: currentYearFirstDay.getFullYear(),
                yt: currentDate.getFullYear()
            };
    }
};

const Lit = ({
    currentData,
    disabled,
    setData,
    process,
    litData
}) => {
    const [selectedLit, setSelectedLit] = useState();

    useEffect(() => {
        const newData = {
            ...JSON.parse(JSON.stringify(currentData)),
            lit: selectedLit,
            isLit: true,
            ...litCalculate(selectedLit)
        };
        setData(newData);
    }, [selectedLit]);

    return <View>
        <SelectDropdown
            data={litData}
            onSelect={(selectedItem) => {
                setSelectedLit(selectedItem);
            }}
            disabled={process || disabled}
            defaultValueByIndex={litData.findIndex(e => e === currentData.lit)}
            buttonStyle={{
                height: Platform.OS === "ios" ? 51.3 : 60,
                backgroundColor: colors.softBackground,
                borderRadius: 12,
                width: "100%"
            }}
            buttonTextStyle={{
                color: colors.body,
                textAlign: "left"
            }}
            dropdownStyle={{
                borderColor: "transparent",
                borderRadius: 15,
                borderWidth: 0
            }}
        />
    </View>;
};

const NoLit = ({
    currentData,
    disabled,
    setData,
    process
}) => {
    const [error, setError] = useState(null);

    const [toWeekText, setToWeekText] = useState(Number(currentData.wt.toString()));
    const [fromWeekText, setFromWeekText] = useState(Number(currentData.wf.toString()));
    const [dFState, setDFState] = useState(currentData.df.toString());
    const [dTState, setDTState] = useState(currentData.dt.toString());
    const [fromYear, setFromYear] = useState(Number(currentData.yf.toString()));
    const [toYear, setToYear] = useState(Number(currentData.yt.toString()));

    useEffect(() => {
        const dTWithWeek = new Date(moment(new Date(dTState)).set("week", toWeekText));
        const dFWithWeek = new Date(moment(new Date(dFState)).set("week", fromWeekText));

        const dateDiff = dTWithWeek.getTime() < dFWithWeek.getTime();

        let variables = {
            ...currentData,
            dt: dTWithWeek.toISOString(),
            wt: moment(dTWithWeek).get("week"),
            yt: dTWithWeek.getFullYear()
        };

        if(!/[0-9]/g.test(toWeekText)) {
            setError({
                message: "The week selection cannot be empty.",
                input: "toWeek"
            });
        } else if(toWeekText === "" || toWeekText === null) {
            setError({
                message: "The week cannot be empty.",
                input: "toWeek"
            });
        } else if(toWeekText < 1) {
            setError({
                message: "The week cannot be less than 1.",
                input: "toWeek"
            });
        } else if(toWeekText > 52) {
            setError({
                message: "The week cannot be greater than 52.",
                input: "toWeek"
            });
        } else {
            if(error && error.input === "toWeek") {
                setError(null);
            }
        }

        if(dateDiff) {
            setDFState(dTWithWeek.toISOString());
            setFromWeekText(Number(moment(dTWithWeek).get("week")));
            setFromYear(Number(dTWithWeek.getFullYear()));
            variables = {
                ...variables,
                df: dTWithWeek.toISOString(),
                wf: moment(dTWithWeek).get("week"),
                yf: dTWithWeek.getFullYear()
            }
        }

        setDTState(dTWithWeek.toISOString());
        setData(variables);
    }, [toWeekText]);

    useEffect(() => {
        const dTWithWeek = new Date(moment(new Date(dTState)).set("week", toWeekText));
        const dFWithWeek = new Date(moment(new Date(dFState)).set("week", fromWeekText));

        const dateDiff = dTWithWeek.getTime() < dFWithWeek.getTime();

        let variables = {
            ...currentData,
            df: dFWithWeek.toISOString(),
            wf: moment(dFWithWeek).get("week"),
            yf: dFWithWeek.getFullYear()
        };

        if(!/[0-9]/g.test(fromWeekText)) {
            setError({
                message: "The week selection cannot be empty.",
                input: "fromWeek"
            });
        } else if(fromWeekText === "" || fromWeekText === null) {
            setError({
                message: "The week cannot be empty.",
                input: "fromWeek"
            });
        } else if(toWeekText < 1) {
            setError({
                message: "The week cannot be less than 1.",
                input: "fromWeek"
            });
        } else if(toWeekText > 52) {
            setError({
                message: "The week cannot be greater than 52.",
                input: "fromWeek"
            });
        } else {
            if(error && error.input === "fromWeek") {
                setError(null);
            }
        }

        if(dateDiff) {
            setDTState(dFWithWeek.toISOString());
            setToWeekText(Number(moment(dFWithWeek).get("week")));
            setToYear(Number(dFWithWeek.getFullYear()));
            variables = {
                ...variables,
                dt: dFWithWeek.toISOString(),
                wt: moment(dFWithWeek).get("week"),
                yt: dFWithWeek.getFullYear()
            }
        }

        setDFState(dFWithWeek.toISOString());
        setData(variables);
    }, [fromWeekText]);

    useEffect(() => {
        const dTWithYear = new Date(moment(new Date(dTState)).set("year", toYear));
        const dFWithYear = new Date(moment(new Date(dFState)).set("year", fromYear));

        const dateDiff = dTWithYear.getTime() < dFWithYear.getTime();

        let variables = {
            ...currentData,
            df: dFWithYear.toISOString(),
            wf: moment(dFWithYear).get("week"),
            yf: dFWithYear.getFullYear()
        };

        if(!/[0-9]/g.test(fromYear)) {
            setError({
                message: "The year selection cannot be empty.",
                input: "fromYear"
            });
        } else if(fromYear > 2100) {
            setError({
                message: "The year selection cannot be greater than 2100.",
                input: "fromYear"
            });
        } else if(fromYear < 1800) {
            setError({
                message: "The year selection cannot be less than 1800.",
                input: "fromYear"
            });
        } else {
            if(error && error.input === "fromYear") {
                setError(null);
            }
        }

        if(dateDiff && dFWithYear.getFullYear().toString().length === 4) {
            setDTState(dFWithYear.toISOString());
            setToWeekText(Number(moment(dFWithYear).get("week")));
            setToYear(Number(dFWithYear.getFullYear()));
            variables = {
                ...variables,
                dt: dFWithYear.toISOString(),
                wt: moment(dFWithYear).get("week"),
                yt: dFWithYear.getFullYear()
            };
        }

        setDFState(dFWithYear.toISOString());
        setData(variables);
    }, [fromYear]);

    useEffect(() => {
        const dTWithYear = new Date(moment(new Date(dTState)).set("year", toYear));
        const dFWithYear = new Date(moment(new Date(dFState)).set("year", fromYear));

        const dateDiff = dTWithYear.getTime() < dFWithYear.getTime();

        let variables = {
            ...currentData,
            dt: dTWithYear.toISOString(),
            wt: moment(dTWithYear).get("week"),
            yt: dTWithYear.getFullYear()
        };

        if(!/[0-9]/g.test(toYear)) {
            setError({
                message: "The year selection cannot be empty.",
                input: "toYear"
            });
        } else if(toYear > 2100) {
            setError({
                message: "The year selection cannot be greater than 2100.",
                input: "toYear"
            });
        } else if(toYear < 1800) {
            setError({
                message: "The year selection cannot be less than 1800.",
                input: "toYear"
            });
        } else {
            if(error && error.input === "toYear") {
                setError(null);
            }
        }

        if(dateDiff && dTWithYear.getFullYear().toString().length === 4) {
            setDFState(dTWithYear.toISOString());
            setFromWeekText(Number(moment(dTWithYear).get("week")));
            setFromYear(Number(dTWithYear.getFullYear()));
            variables = {
                ...variables,
                df: dTWithYear.toISOString(),
                wf: moment(dTWithYear).get("week"),
                yf: dTWithYear.getFullYear()
            }
        }

        setDTState(dTWithYear.toISOString());
        setData(variables);
    }, [toYear]);

    return <View>
        {
            error ?
                <Text
                    style={{
                        marginBottom: 10,
                        color: "red"
                    }}
                >
                    {error.message}
                </Text>
            :
                null
        }
        <Text>
            From
        </Text>
        <View
            style={{
                marginBottom: 10
            }}
        >
            <View
                style={{
                    flexDirection: "row"
                }}
            >
                <TextInput
                    value={fromWeekText.toString()}
                    onChangeText={(text) => {
                        if(text.length > 2) {
                            return;
                        }
                        setFromWeekText(Number(text));
                    }}
                    style={[
                        stylesheet.input,
                        {
                            flex: 1,
                            marginRight: 5,
                            borderWidth: 1,
                            borderColor: error && error.input === "fromWeek" ? "red" : "transparent"
                        }
                    ]}
                    editable={!process && !disabled}
                />
                <TextInput
                    value={fromYear.toString()}
                    onChangeText={(text) => {
                        if(text.length > 4) {
                            return;
                        }
                        setFromYear(Number(text));
                    }}
                    style={[
                        stylesheet.input,
                        {
                            flex: 1,
                            marginLeft: 5,
                            borderWidth: 1,
                            borderColor: error && error.input === "fromYear" ? "red" : "transparent"
                        }
                    ]}
                    editable={!process && !disabled}
                />
            </View>
            <TextInput
                value={moment(new Date(dFState)).format("DD/MM/YYYY").toString()}
                style={[
                    stylesheet.input,
                    stylesheet.disabled
                ]}
                editable={false}
            />
        </View>
        <Text>
            To
        </Text>
        <View>
            <View
                style={{
                    flexDirection: "row"
                }}
            >
                <TextInput
                    value={toWeekText.toString()}
                    onChangeText={(text) => {
                        if(text.length > 2) {
                            return;
                        }
                        setToWeekText(Number(text));
                    }}
                    style={[
                        stylesheet.input,
                        {
                            flex: 1,
                            marginRight: 5,
                            borderWidth: 1,
                            borderColor: error && error.input === "toWeek" ? "red" : "transparent"
                        }
                    ]}
                    editable={!process && !disabled}
                />
                <TextInput
                    value={toYear.toString()}
                    onChangeText={(text) => {
                        if(text.length > 4) {
                            return;
                        }
                        setToYear(Number(text));
                    }}
                    style={[
                        stylesheet.input,
                        {
                            flex: 1,
                            marginLeft: 5,
                            borderWidth: 1,
                            borderColor: error && error.input === "toYear" ? "red" : "transparent"
                        }
                    ]}
                    editable={!process && !disabled}
                />
            </View>
            <TextInput
                value={moment(new Date(dTState)).format("DD/MM/YYYY").toString()}
                style={[
                    stylesheet.input,
                    stylesheet.disabled
                ]}
                editable={false}
            />
        </View>
    </View>;
};

const Compression = ({
    setData,
    data
}) => {
    const [currentCF, setCurrentCF] = useState(data.cf.toString());
    const lastYear = Number(data.yf.toString()) - 1;

    useEffect(() => {
        setData({
            ...data,
            cf: currentCF.toString()
        });
    }, [currentCF]);

    return <View
        style={{
            flexDirection: "row",
            marginTop: 10
        }}
    >
        <Button
            title={lastYear.toString()}
            color={lastYear.toString() === currentCF ? colors.primary : colors.shadowPrimary}
            textColor={lastYear.toString() === currentCF ? colors.panel : colors.primary}
            onPress={() => {
                setCurrentCF(lastYear.toString());
            }}
            style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                marginRight: 10
            }}
        />
        <Button
            title={(lastYear - 1).toString()}
            color={(lastYear - 1).toString() === currentCF ? colors.primary : colors.shadowPrimary}
            textColor={(lastYear - 1).toString() === currentCF ? colors.panel : colors.primary}
            onPress={() => {
                setCurrentCF((lastYear - 1).toString());
            }}
            style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                marginRight: 10
            }}
        />
        <Button
            title={(lastYear - 2).toString()}
            color={(lastYear - 2).toString() === currentCF ? colors.primary : colors.shadowPrimary}
            textColor={(lastYear - 2).toString() === currentCF ? colors.panel : colors.primary}
            onPress={() => {
                setCurrentCF((lastYear - 2).toString());
            }}
            style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                marginRight: 10
            }}
        />
    </View>;
};

const DateRange = ({
    initialData = MOCK_DATA,
    litData = LIT_DATA,
    disabled,
    onChange,
    process
}) => {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        if(onChange) onChange(data);
    }, [data]);

    return <View>
        <View
            style={stylesheet.headerContainer}
        >
            <Text
                style={stylesheet.title}
            >
                {data.isLit ? "Departure Date" : "Date Range"}
            </Text>
            <Button
                image={<SVGCalendar
                    color={data.isLit ? colors.primary : colors.panel}
                />}
                titleStyle={stylesheet.switchTitle}
                style={stylesheet.switchContainer}
                color={data.isLit ? "transparent" : colors.primary}
                onPress={() => {
                    let newData = JSON.parse(JSON.stringify(data));
                    newData.isLit = !data.isLit;
                    setData(newData);
                }}
            />
        </View>
        {
            data.isLit ?
                <Lit
                    currentData={data}
                    setData={setData}
                    disabled={disabled}
                    litData={litData}
                    process={process}
                />
            :
                <NoLit
                    disabled={disabled}
                    currentData={data}
                    process={process}
                    setData={setData}
                />
        }
        {
            data.acf ?
                <Compression
                    setData={setData}
                    data={data}
                />
            :
                null
        }
    </View>;
};
export default DateRange;
