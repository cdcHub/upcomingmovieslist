// MovieItem.tsx
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, ViewStyle, ImageStyle, TouchableOpacity } from 'react-native';
import { Result } from '../../types/movies@Interfaces.ds';
import { ImageBaseUrl } from '../../constants/AppContants';
import { convertToDp, hp } from '../../dimension';
import { AppPoppinsFonts } from '../../constants/AppFonts';
import { AppColors } from '../../constants/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import DotsSvg from '../../../assets/svgs/DotsSvg';

interface MovieItemProps {
    movie: Result;
    onItemClick: () => void;
    containerStyle?: ViewStyle
    imageStyle?: ImageStyle;
    type?: 'list' | 'default';
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, containerStyle, onItemClick, imageStyle, type = 'default' }) => {

    const onPress = () => {
        onItemClick && onItemClick()
    }
    if (type == 'list') {
        return (
            <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.listContainer, containerStyle && containerStyle]}>
                <Image
                    source={{ uri: `${ImageBaseUrl}${movie?.poster_path}` }}
                    style={[styles.listImage, imageStyle && imageStyle]}
                />
                <View style={styles.col2}>
                    <Text numberOfLines={1} style={styles.listTitle}>{movie.title}</Text>
                    <Text numberOfLines={1} style={styles.listsubTitle}>{'Sci-Fi'}</Text>
                </View>

                <TouchableOpacity>
                    <DotsSvg />
                </TouchableOpacity>
                {/* <Text style={styles.title}>{movie.title}</Text> */}
            </TouchableOpacity>)
    }
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.container, containerStyle && containerStyle]}>
            <ImageBackground
                source={{ uri: `${ImageBaseUrl}${movie?.poster_path}` }}
                style={[styles.img, imageStyle && imageStyle]}
            >
                <LinearGradient
                    colors={[`${AppColors.black}10`, `${AppColors.black}`]} style={styles.textContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: hp('24%'),
    },
    img: {
        flex: 1,
        // height: hp('24%'),
        width: '100%',
        justifyContent: 'flex-end',
        borderRadius: hp('2%'),
        // borderWidth:1,
        // borderColor:'red',
        overflow: 'hidden',
        // resizeMode:'cover',


    },
    title: {
        fontFamily: AppPoppinsFonts.Regular,
        color: AppColors.white,
        padding: hp('2%'),
        fontWeight: '500',
        fontSize: hp('2.4%')
    },
    textContainer: {
        // backgroundColor:'#00000060'
    },
    listImage: {
        height: hp('12%'),
        width: undefined,
        aspectRatio: 1,
        borderRadius: hp('2%')
    },
    listContainer: {
        flexDirection: 'row',
        margin: hp('2%'),
        alignItems: 'center'
    },
    listTitle: {
        fontFamily: AppPoppinsFonts.Regular,
        color: AppColors.searchTextColor,

        fontWeight: '500',
        fontSize: hp('2%')
    },
    col2: {
        marginHorizontal: hp('1%'),
        flex: 1
    },
    listsubTitle: {
        fontFamily: AppPoppinsFonts.Regular,
        color: AppColors.searchTextColor,

        // fontWeight: '500',
        fontSize: hp('1.5%')
    }
});

export default MovieItem;
