import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const DotsSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={4}
    viewBox="0 0 20 4"
    fill="none"
    {...props}
  >
    <Circle cx={2} cy={2} r={2} fill="#61C3F2" />
    <Circle cx={10} cy={2} r={2} fill="#61C3F2" />
    <Circle cx={18} cy={2} r={2} fill="#61C3F2" />
  </Svg>
);
export default DotsSvg;
