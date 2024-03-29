import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SearchSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={20}
    viewBox="0 0 19 20"
    
    fill="#fff"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.7128 16.3588L12.6602 12.3061C13.3773 11.3564 13.8026 10.174 13.8026 8.89224C13.8026 5.76079 11.2641 3.22224 8.13265 3.22224C5.00119 3.22224 2.46265 5.76079 2.46265 8.89224C2.46265 12.0237 5.00119 14.5622 8.13265 14.5622C9.4144 14.5622 10.5968 14.1369 11.5465 13.4198L15.5992 17.4724L16.7128 16.3588ZM12.2276 8.89225C12.2276 11.1539 10.3942 12.9872 8.13258 12.9872C5.87097 12.9872 4.03758 11.1539 4.03758 8.89225C4.03758 6.63064 5.87097 4.79725 8.13258 4.79725C10.3942 4.79725 12.2276 6.63064 12.2276 8.89225Z"
      fill="#202C43"
    />
  </Svg>
);
export default SearchSvg;
