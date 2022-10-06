import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SVGCalendar = ({
    color = "#000",
    ...props
}) => {
    return <Svg
        width={18}
        height={20}
        fill="none"
        {...props}
    >
        <Path
            d="M18 18V4c0-1.103-.897-2-2-2h-2V0h-2v2H6V0H4v2H2C.897 2 0 2.897 0 4v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2ZM6 16H4v-2h2v2Zm0-4H4v-2h2v2Zm4 4H8v-2h2v2Zm0-4H8v-2h2v2Zm4 4h-2v-2h2v2Zm0-4h-2v-2h2v2Zm2-5H2V5h14v2Z"
            fill={color}
        />
    </Svg>;
};
export default SVGCalendar;
