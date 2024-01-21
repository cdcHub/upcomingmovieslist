import { Image, ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FullWatchStackParamList } from '../../../routes/BottomTabs';
import { useAppDispatch, useAppSelector } from '../../../store/configure';
import { openVideoPlayer, useMoviesState } from '../../../storeSlices/movies';
import { Loader } from '../../../components';
import { hp, wp } from '../../../dimension';
import { ImageBaseUrl } from '../../../constants/AppContants';
import { AppPoppinsFonts } from '../../../constants/AppFonts';
import { AppColors, GenresColors } from '../../../constants/AppColors';
import LeftArrowSvg from '../../../../assets/svgs/LeftArrowSvg';
import LinearGradient from 'react-native-linear-gradient';
import PlaySvg from '../../../../assets/svgs/PlaySvg';
import moment from 'moment';

type Props = NativeStackScreenProps<FullWatchStackParamList, 'WatchItemDetails'>;

const WatchItemDetails: React.FC<Props> = ({ navigation }) => {
    const { movie_details_list_loader, movieDetails, } = useAppSelector(useMoviesState)

    const dispatch = useAppDispatch()

    const onWatchClick = () => {
        dispatch(openVideoPlayer({
            status: true
        }))
    }

    if (movie_details_list_loader) {
        return <Loader />
    }

    const Button = ({ text, type = 'fill', onPress, icon, bgColor, style, txtStyle }: { text: string, type: 'fill' | 'outline', onPress: () => void, icon?: any, bgColor?: string, style?: ViewStyle, txtStyle?: TextStyle }) => {
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
    const Top = () => {

        return (
            <View style={styles.topContainer}>
                <ImageBackground
                    source={{ uri: `${ImageBaseUrl}${movieDetails?.poster_path}` }}
                    style={[styles.img]}
                >
                    <LinearGradient
                        colors={[`${AppColors.black}01`, `${AppColors.black}50`, `${AppColors.black}`]}
                        style={{
                            flex: 1,
                        }}
                    >
                        <MovieDetailHeader />
                        {
                            movieDetails?.production_companies && movieDetails?.production_companies?.length > 0 &&
                            <View style={styles.logoContainer}>
                                <Image
                                    source={{ uri: `${ImageBaseUrl}${movieDetails?.production_companies[0].logo_path}` }}
                                    resizeMode='contain'
                                    style={{
                                        height: hp('8%'),
                                        width: '30%',
                                    }}
                                />
                                <Text style={[styles.title, { color: AppColors.white }]}>In theaters {moment(movieDetails?.release_date).format('MMMM D, YYYY')}</Text>
                                <View style={styles.spaceV} />
                                <Button
                                    text='Get Tickets'
                                    type='fill'
                                    onPress={() => {
                                        navigation.navigate('WatchTicket')
                                    }}
                                />

                                <Button
                                    text='Watch Trailer'
                                    type='outline'
                                    onPress={onWatchClick}
                                    icon={() => <PlaySvg />}
                                />
                                <View style={styles.spaceV} />
                            </View>
                        }
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
    }

    const MovieDetailHeader = () => {

        return (
            <View style={[styles.WatchHeaderBg, {
                justifyContent: 'flex-start',
            }]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }} style={styles.searchBtn}>
                    <LeftArrowSvg fillColor={AppColors.white} />
                    <Text style={[styles.title, {
                        color: AppColors.white
                    }]}>Watch</Text>
                </TouchableOpacity>
            </View>)

    }

    const Genres = () => {
        return (
            <View style={{
                width: '90%',
                alignSelf: 'center'
            }}>

                <Text style={[styles.title]}>Genres</Text>
                <ScrollView horizontal

                    contentContainerStyle={{
                        // width: '100%',
                        marginTop: hp('1%')
                    }}
                >
                    {
                        movieDetails?.genres?.map((genre, index) => {
                            let bgColor = AppColors.secondry;
                            let name = genre?.name?.toLowerCase()
                            switch (name) {
                                case 'documentaries':
                                    bgColor = GenresColors.darkCyan
                                    break;
                                case 'action':
                                    bgColor = GenresColors.darkCyan
                                    break;
                                case 'animation':
                                    bgColor = GenresColors.darkCyan
                                    break;
                                case 'crime':
                                    bgColor = GenresColors.pink
                                    break;
                                case 'thriller':
                                    bgColor = GenresColors.pink
                                    break;
                                case 'adventure':
                                    bgColor = GenresColors.pink
                                    break;
                                case 'science':
                                    bgColor = GenresColors.purple
                                case 'comedy':
                                    bgColor = GenresColors.purple
                                    break;
                                case 'fiction':
                                    bgColor = GenresColors.yellow;
                                    break
                                case 'horror':
                                    bgColor = GenresColors.yellow;
                                    break
                                case 'family':
                                    bgColor = GenresColors.yellow
                                    break;
                                default:
                                    break;
                            }
                            return <Button
                                bgColor={bgColor}
                                key={index}
                                type='fill'
                                onPress={() => { }}
                                style={{
                                    height: hp('4%'),
                                    flex: 1,
                                    paddingHorizontal: hp('1%'),
                                    marginRight: hp('1%'),
                                    borderWidth: 0,

                                }}
                                txtStyle={{
                                    fontSize: hp('1.6%')
                                }}
                                text={genre.name}

                            />
                        })
                    }
                </ScrollView>
            </View>
        )
    }

    const OverView = () => {
        return (
            <View style={{
                width: '90%',
                alignSelf: 'center'
            }}>

                <Text style={[styles.title]}>Overview</Text>
                <Text style={[styles.subText]}>{movieDetails?.overview}</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <Top />
                <View style={styles.spaceV} />
                <Genres />
                <View style={styles.spaceV} />
                <OverView />
            </ScrollView>
        </View>
    )
}

export default WatchItemDetails

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContainer: {
        height: hp('50%'),

    },
    img: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    title: {
        fontFamily: AppPoppinsFonts.Regular,
        fontWeight: '500',
        fontSize: hp('2%')
    },
    subText: {
        fontFamily: AppPoppinsFonts.Regular,
        marginTop: hp('1%'),
        color: AppColors.inActive,
        fontSize: hp('1.7%')
    },
    WatchHeaderBg: {
        // backgroundColor: AppColors.white,
        padding: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? hp('5%') : 0,
    },
    searchBtn: {
        padding: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
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
    spaceV: {
        height: hp('3%')
    }
})

