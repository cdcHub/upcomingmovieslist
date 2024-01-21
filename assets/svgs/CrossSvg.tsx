import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CrossSvg = ({ fillColor, height, width, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || 30}
    height={height || 30}
    viewBox="0 0 30 30"
    fill="none"
    {...props}
  >
    <Path
      d="M7.5 7.5L22.5 22.5"
      stroke={fillColor || "#202C43"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 22.5L22.5 7.5"
      stroke={fillColor || "#202C43"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CrossSvg;
