import * as React from "react";
import Svg, { Circle } from "react-native-svg";

const DashboardSvg = ({ fillColor, ...props }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={13} cy={3} r={3} fill={fillColor} />
    <Circle cx={13} cy={13} r={3} fill={fillColor} />
    <Circle cx={3} cy={13} r={3} fill={fillColor} />
    <Circle cx={3} cy={3} r={3} fill={fillColor} />
  </Svg>
);

export default DashboardSvg;
