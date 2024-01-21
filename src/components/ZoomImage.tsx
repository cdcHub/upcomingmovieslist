import React, { useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { hp } from '../dimension';
import { AppColors } from '../constants/AppColors';

type ZoomImageProps = {
    imageUri: string | number
}
const ZoomImage: React.FC<ZoomImageProps> = ({ imageUri }) => {
    console.log('imageUri', typeof imageUri, imageUri);

    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const pinchHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            scale.value = event.scale;
            focalX.value = event.focalX;
            focalY.value = event.focalY;
        },
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: withSpring(scale.value) }],
        };
    });

    const zoomIn = () => {
        scale.value = withSpring(scale.value * 1.2);
    };

    const zoomOut = () => {
        scale.value = withSpring(scale.value / 1.2);
    };

    return (
        <View style={styles.container}>
            <GestureHandlerRootView >
                <PinchGestureHandler onGestureEvent={pinchHandler}>
                    <Animated.View style={[styles.imageContainer, animatedStyle]}>
                        <Image source={typeof imageUri == 'string' ? { uri: imageUri } : imageUri} style={styles.image} />
                    </Animated.View>
                </PinchGestureHandler>
            </GestureHandlerRootView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={zoomIn}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={zoomOut}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.lightOffWhite
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: hp('20%'),
        resizeMode: 'contain',
    },
    buttonsContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
        right: 20,
    },
    button: {
        backgroundColor: AppColors.white,
        borderRadius: hp('5%') / 2,
        width: hp('5%'),
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: AppColors.lightOffWhite
    },
    buttonText: {
        color: AppColors.black,
        fontSize: hp('2.5%'),
    },
});

export default ZoomImage;
