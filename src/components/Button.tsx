import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React, { FC } from 'react'
import { AppPoppinsFonts } from '../constants/AppFonts'
import { AppColors } from '../constants/AppColors'
import { hp, wp } from '../dimension'

type IButtonProps = {
    text: string,
    type: 'fill' | 'outline',
    onPress: () => void, icon?: any,
    bgColor?: string,
    style?: ViewStyle,
    txtStyle?: TextStyle
}
const Button: FC<IButtonProps> = ({ text, type = 'fill', onPress, icon, bgColor, style, txtStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.btn, { backgroundColor: type == 'fill' ? (bgColor || AppColors.secondry) : 'transparent' }, style && style]}>
            {
                icon && <View style={{ marginRight: wp('2%') }}>
                    {
                        icon()
                    }
                </View>
            }
            <Text style={[styles.btnText, txtStyle && txtStyle]}>{text}</Text>

        </TouchableOpacity>
    )
}

export default Button
const styles = StyleSheet.create({
    btn: {
        height: hp('7%'),
        width: '65%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp('2.1%'),
        borderWidth: 1,
        borderColor: AppColors.secondry,
        marginBottom: hp('1.5%'),
        flexDirection: 'row'
    },
    btnText: {
        fontFamily: AppPoppinsFonts.Regular,
        color: AppColors.white,
        fontSize: hp('2%'),
        fontWeight: '600'
    },
})
