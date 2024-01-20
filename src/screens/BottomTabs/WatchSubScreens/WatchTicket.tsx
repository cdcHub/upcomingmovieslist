import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FullWatchStackParamList } from '../../../routes/BottomTabs';
import { hp } from '../../../dimension';
import LeftArrowSvg from '../../../../assets/svgs/LeftArrowSvg';
import { AppColors } from '../../../constants/AppColors';
import { AppPoppinsFonts } from '../../../constants/AppFonts';
import { useAppSelector } from '../../../store/configure';
import { useMoviesState } from '../../../storeSlices/movies';
import moment from 'moment';
type Props = NativeStackScreenProps<FullWatchStackParamList, 'WatchTicket'>;

const WatchTicket: React.FC<Props> = ({ navigation }) => {
    const MovieDetailHeader = () => {
        const { movie_details_list_loader, movieDetails, } = useAppSelector(useMoviesState)

        return (
            <View style={[styles.WatchHeaderBg, { justifyContent: 'flex-start' }]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }} style={styles.searchBtn}>
                    <LeftArrowSvg fillColor={AppColors.black} />
                    <View style={styles.titleContainer}>
                        <Text style={[styles.title, {
                            // color: AppColors.white
                        }]}>{movieDetails?.title}</Text>
                        <Text style={[styles.subText, {
                            color: AppColors.secondry
                        }]}>In theaters {moment(movieDetails?.release_date).format('MMMM D, YYYY')}</Text>
                    </View>
                </TouchableOpacity>
            </View>)

    }

    return (
        <View style={styles.container}>
            <MovieDetailHeader />
        </View>
    )
}

export default WatchTicket

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: AppColors.white,

    },
    WatchHeaderBg: {
        backgroundColor: AppColors.white,
        padding: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp('5%'),
    },
    searchBtn: {
        padding: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontFamily: AppPoppinsFonts.Regular,
        fontWeight: '500',
        fontSize: hp('2%')
    },
    subText: {
        fontFamily: AppPoppinsFonts.Regular,
        color: AppColors.inActive,
        fontSize: hp('1.7%')
    },
    titleContainer:{
      
        flex:1,
        alignItems:'center'
    }
})