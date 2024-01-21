import * as React from "react";
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg";
const WatchSvg = ({ fillColor, ...props }) => (
  <Svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={18} height={18} fill="#3D3D3D" />
    <G id={2}>
      <G clipPath="url(#clip0_21_234)">
        <Rect
         
        
        
          fill={fillColor}
        />
        <G id="Frame 19625114" clipPath="url(#clip1_21_234)">
          <Rect
            id="Rectangle 2159"
         
            rx={27}
            fill={fillColor}
          />
          <G id="Frame 19624906">
            <G id="Group 19624902">
              <Path
                id="Vector"
                d="M16.8166 1.16263C16.0484 0.415225 15.0311 0 13.9723 0H4.00692C2.92734 0 1.9308 0.415225 1.16263 1.18339C0.394464 1.95156 0 2.9481 0 4.00692V13.9723C0 15.0519 0.415225 16.0484 1.18339 16.8166C1.95156 17.5848 2.9481 18 4.02768 18H13.9723C15.0519 18 16.0484 17.5848 16.8166 16.8166C17.5848 16.0484 18 15.0519 18 13.9723V4.00692C17.9792 2.9481 17.564 1.9308 16.8166 1.16263ZM12.2907 9.50865L7.07958 12.519C6.99654 12.5813 6.89273 12.6021 6.78893 12.6021C6.68512 12.6021 6.58131 12.5813 6.49827 12.519C6.31142 12.4152 6.20761 12.2076 6.20761 12V5.97924C6.20761 5.77163 6.31142 5.56401 6.49827 5.46021C6.68512 5.3564 6.91349 5.3564 7.10035 5.46021L12.3114 8.47059C12.4983 8.57439 12.6021 8.78201 12.6021 8.98962C12.6021 9.19723 12.4775 9.40484 12.2907 9.50865Z"
                fill={fillColor}
              />
            </G>
          </G>
        </G>
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_21_234">
        <Rect x={-137} y={-758} width={375} height={812} rx={30} fill="white" />
      </ClipPath>
      <ClipPath id="clip1_21_234">
        <Rect
          width={375}
          height={75}
          fill="white"
          transform="translate(-137 -20)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default WatchSvg;
