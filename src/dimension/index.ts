import { PixelRatio } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from 'react-native-responsive-screen';

export const convertToDp =(pixelValue:number)=> PixelRatio.roundToNearestPixel(pixelValue / PixelRatio.get());

export {
    wp,
    hp
}