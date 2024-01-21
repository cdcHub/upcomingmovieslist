import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LeftArrowSvg = ({ fillColor, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    {...props}
  >
    <Path d="M18.75 22.5L11.25 15L18.75 7.5" stroke={fillColor || "#202C43"} strokeWidth={2} />
  </Svg>
);
export default LeftArrowSvg;
