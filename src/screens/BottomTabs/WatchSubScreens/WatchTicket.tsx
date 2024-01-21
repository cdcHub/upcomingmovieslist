import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FullWatchStackParamList } from '../../../routes/BottomTabs';
import { hp } from '../../../dimension';
import LeftArrowSvg from '../../../../assets/svgs/LeftArrowSvg';
import { AppColors } from '../../../constants/AppColors';
import { AppPoppinsFonts } from '../../../constants/AppFonts';
import { useAppDispatch, useAppSelector } from '../../../store/configure';
import { setConfirmationData, useMoviesState } from '../../../storeSlices/movies';
import moment from 'moment';
import cinemaHallSettings, { CinemaHallSettingType } from '../../../constants/Dummydata';
import { Button } from '../../../components';
type Props = NativeStackScreenProps<FullWatchStackParamList, 'WatchTicket'>;

const WatchTicket: React.FC<Props> = ({ navigation }) => {
    const dispatch = useAppDispatch()
    const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
    const [selectedHallIndex, setSelectedHallIndex] = useState<number>(0);
    const { movie_details_list_loader, movieDetails, } = useAppSelector(useMoviesState)


    const onSelectSeatClick = () => {
        let payload = {
            date: getDateList()[selectedDateIndex]?.toString(),
            hall: cinemaHallSettings[selectedHallIndex],
        }
        dispatch(setConfirmationData(payload))
        navigation.navigate('WatchConfirmation')

    }

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
                    }]}>In theaters {moment(movieDetails?.release_date).format('MMMM D, YYYY')}</Text>
                </View>
                {/* for title center */}
                <View style={{ width: hp('3%') }} />
            </View>)

    }


    const getDateList = useCallback(() => {
        const dateList = [];
        const currentDate = new Date();

        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(currentDate.getDate() + i);
            dateList.push(date);
        }

        return dateList;
    }, [])

    const renderDateItem = (date: Date, index: number) => {

        const options = { day: 'numeric', month: 'short' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        let arrangeDate: any = formattedDate?.split(' ');
        arrangeDate = `${arrangeDate[1]} ${arrangeDate[0]}`;
        const isSelected = selectedDateIndex == index

        return (
            <TouchableOpacity
                onPress={() => setSelectedDateIndex(index)}
                key={date.toISOString()} style={[styles.dateItem, { backgroundColor: isSelected ? AppColors.secondry : AppColors.dateBgColor }]}>
                <Text style={[styles.dateText, { color: isSelected ? AppColors.white : AppColors.black }]}>{arrangeDate}</Text>
            </TouchableOpacity>
        );
    };

    const renderCinemaHallSetting = ({ item, index }: { item: CinemaHallSettingType, index: number }) => {
        const isSelected = selectedHallIndex == index

        return (
            <TouchableOpacity
                onPress={() => setSelectedHallIndex(index)}

                style={[styles.cinemaHallContainer,

                ]}
                key={index}>
                <View style={styles.headerContainer}>
                    <Text style={styles.cinemaHallDate}>{item.date}</Text>
                    <Text style={styles.cinemaHallTitle}>{item.title}</Text>
                </View>
                <View style={[styles.imgContainer,
                { borderColor: isSelected ? AppColors.secondry : AppColors.dateBgColor }
                ]}>
                    <Image source={item.image} style={styles.cinemaHallImage} resizeMode='contain' />
                </View>

                <View style={styles.priceContainer}>
                    <Text style={styles.cinemaHallPrice}>{'From '}</Text>
                    <Text style={[{ fontFamily: AppPoppinsFonts.SemiBold, }]}>{item.fromPrice}$</Text>
                    <Text style={styles.cinemaHallPrice}>{' or '}</Text>
                    <Text style={[{ fontFamily: AppPoppinsFonts.SemiBold, }]}>{item.toPrice} bonus</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <MovieDetailHeader />
            <View style={{ paddingLeft: hp('3%'), flex: 1, backgroundColor: AppColors.lightOffWhite, alignSelf: 'center', paddingTop: hp('4%') }}>
                {/* dates */}
                <Text style={[styles.title]}>{'Date'}</Text>
                <View style={{ height: hp('7%') }}>
                    <ScrollView horizontal >
                        <View style={styles.dateContainer}>{getDateList().map(renderDateItem)}</View>
                    </ScrollView>
                </View>
                {/* cinema hall settings */}
                <View style={{}}>
                    <ScrollView horizontal >
                        <View style={styles.dateContainer}>{cinemaHallSettings.map((item, index) => renderCinemaHallSetting({ item, index }))}</View>
                    </ScrollView>
                </View>

            </View>
            <View style={{
                paddingHorizontal: hp('3%'),
            }}>

                <Button
                    text='Select Seats'
                    type='fill'
                    style={{
                        width: '100%',
                        borderRadius: hp('1.5%')
                    }}
                    onPress={onSelectSeatClick} />
            </View>
        </View>
    )
}

export default WatchTicket

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
    dateItem: {

        alignItems: 'center',
        justifyContent: 'center',
        marginRight: hp('1%'),
        paddingHorizontal: hp('2%'),
        borderRadius: hp('1%'),
    },

    dateText: {
        fontFamily: AppPoppinsFonts.SemiBold,
        fontSize: hp('1.5%')
    },
    cinemaHallContainer: {
        // borderWidth:1,
        width: hp('30%'),
        height: hp('30%'),
        marginRight: hp('2%'),
        // borderRadius: hp('4%'),

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgContainer: {
        marginVertical: hp('1.5%'),
        borderWidth: 1,
        borderRadius: hp('2%'),
        // padding:hp('4%'),
        borderColor: AppColors.darkOffWhite,
        justifyContent: 'center',
        alignItems: 'center'

    },
    cinemaHallImage: {

        height: hp('20%'),
    },
    cinemaHallTitle: {
        marginLeft: hp('1%'),
        color: AppColors.inActive
    },
    cinemaHallDate: {
        fontFamily: AppPoppinsFonts.Regular,
        fontWeight: '500'
    },
    cinemaHallPrice: {

    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})