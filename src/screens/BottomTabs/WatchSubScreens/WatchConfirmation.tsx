import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FullWatchStackParamList } from '../../../routes/BottomTabs';
import { useAppSelector } from '../../../store/configure';
import { useMoviesState } from '../../../storeSlices/movies';
import LeftArrowSvg from '../../../../assets/svgs/LeftArrowSvg';
import { AppColors, GenresColors } from '../../../constants/AppColors';
import moment from 'moment';
import { hp } from '../../../dimension';
import { AppPoppinsFonts } from '../../../constants/AppFonts';
import ZoomImage from '../../../components/ZoomImage';
import { CinemaHallSettingType, SeatChairs } from '../../../constants/Dummydata';
import CrossSvg from '../../../../assets/svgs/CrossSvg';
import { Button } from '../../../components';

type Props = NativeStackScreenProps<FullWatchStackParamList, 'WatchConfirmation'>;

const WatchConfirmation: React.FC<Props> = ({ navigation, route }) => {

    const { movieDetails, confirmationData } = useAppSelector(useMoviesState)
    const MovieDetailHeader = () => {

        return (
            <View style={[styles.WatchHeaderBg, { justifyContent: 'flex-start' }]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }} style={styles.searchBtn}>
                    <LeftArrowSvg fillColor={AppColors.black} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title]}>{movieDetails?.title}</Text>
                    <Text style={[styles.subText, {
                        color: AppColors.secondry
                    }]}>{moment(new Date(`${confirmationData?.date}`).toISOString()).format('MMMM D, YYYY')} : {confirmationData?.hall?.title}</Text>
                </View>
                {/* for title center */}
                <View style={{ width: hp('3%') }} />
            </View>)

    }

    const SeatCatagories = () => {
        return <View style={styles.chairsContainer}>
            {
                SeatChairs.map((cat, index) => {
                    return <View key={index} style={styles.catContainer}>
                        <View style={styles.chairContainer}>
                            <View style={[styles.top, { backgroundColor: cat.bgColor }]} />
                            <View style={[styles.bottom, { backgroundColor: cat.bgColor }]} />
                        </View>
                        <Text style={styles.catText}>{cat.text}</Text>
                    </View>
                })
            }
        </View>
    }

    const RowButton = () => {
        return (
            <TouchableOpacity style={styles.rowBtn}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.catText, { fontSize: hp('1.8%'), }]}>{'4 / '}</Text>
                    <Text style={{ fontFamily: AppPoppinsFonts.Regular, opacity: .7 }}>{'3 row'}</Text>
                </View>
                <CrossSvg height={hp('2.5%')} width={hp('2.5%')} />
            </TouchableOpacity>
        )
    }
    const PiceTag = () => {
        return (
            <TouchableOpacity style={[styles.rowBtn, { height: hp('7%'), flexDirection: 'column' }]}>
                <Text style={{ fontFamily: AppPoppinsFonts.Regular, opacity: .7 }}>{'Total Price'}</Text>
                <Text style={[styles.catText, { fontSize: hp('2.5%') }]}>{'$ 50'}</Text>
            </TouchableOpacity >
        )
    }

    return (
        <View style={styles.container}>
            <MovieDetailHeader />

            <View style={{
                flex: 2
            }}>

                <ScrollView
                    horizontal
                    contentContainerStyle={{
                        // width: '100%',
                        flexGrow: 1
                    }}
                >

                    <ZoomImage imageUri={confirmationData?.hall?.image || ''} />
                </ScrollView>
            </View>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, }}
            >
                <View style={styles.row2}>
                    <SeatCatagories />
                    <View style={{ height: hp('2%') }} />
                    <RowButton />
                    <View style={{ height: hp('5%') }} />
                    <View style={styles.bottomBtnsContainer}>
                        <PiceTag />
                        <Button
                            text={'Proceed to pay'}
                            type={'fill'}
                            style={styles.proceedBtn}
                            onPress={function (): void {
                                Alert.alert('Payment done!!');
                                navigation.popToTop()
                            }}
                        />
                    </View>
                </View>

            </ScrollView>
        </View >
    )
}

export default WatchConfirmation

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: hp('1.6%')
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center'
    },
    dateContainer: {
        marginTop: hp('1.5%'),
        flexDirection: 'row',
        height: hp('4.5%'),
    },
    catContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth:1,
        width: '40%',
        marginTop: hp('2%')

    },
    chairContainer: {
        // height: hp('6%'),
        // justifyContent: 'space-around',
        alignItems: 'center',
        marginRight: hp('2%')
    },
    top: {
        height: hp('3.5%'),
        width: hp('4%'),
        // aspectRatio: 1,
        borderRadius: hp('1%'),
        // borderWidth:1
    },
    bottom: {
        marginTop: hp('.3%'),
        height: hp('.7%'),
        width: hp('3%'),
        borderRadius: hp('1%'),
        // borderWidth:1
    },
    catText: {
        fontFamily: AppPoppinsFonts.SemiBold,
        fontSize: hp('1.6%'),
        color: AppColors.inActive
    },
    rowBtn: {
        flexDirection: 'row',
        width: hp('15%'),
        height: hp('5%'),
        backgroundColor: AppColors.dateBgColor,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: hp('1.5%'),
    },
    proceedBtn: {
        borderRadius: hp('1.5%'),
        marginBottom: 0,
        width: '60%',
    },
    bottomBtnsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row2: {
        flex: 1,
        paddingHorizontal: hp('2%'),
        justifyContent: 'center'
    },
   chairsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})