import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/BottomTabs/Dashboard';
import More from '../screens/BottomTabs/More';
import MediaLibrary from '../screens/BottomTabs/MediaLibrary';
import Watch from '../screens/BottomTabs/Watch';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from './components/CustomBottomTab';
import { WatchConfirmation, WatchItemDetails, WatchSearch, WatchTicket } from '../screens/BottomTabs/WatchSubScreens';
import Header from '../components/Watch/Header';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppPoppinsFonts } from '../constants/AppFonts';
import { hp } from '../dimension';
import { AppColors } from '../constants/AppColors';
import SearchSvg from '../../assets/svgs/SearchSvg';
import LeftArrowSvg from '../../assets/svgs/LeftArrowSvg';
import { CinemaHallSettingType } from '../constants/Dummydata';
import { Loader, VideoPlayer } from '../components';
import { useAppDispatch, useAppSelector } from '../store/configure';
import { openVideoPlayer, useMoviesState } from '../storeSlices/movies';
import CrossSvg from '../../assets/svgs/CrossSvg';

export type BottomTabsStackParamList = {
    Dashboard: undefined;
    More: undefined;
    MediaLibrary: undefined;
    FullWatchStack: undefined;
};
export type FullWatchStackParamList = {
    Watch: undefined;
    WatchSearch: undefined;
    WatchItemDetails: undefined;
    WatchTicket: undefined;
    WatchConfirmation: undefined
    // More: undefined;
    // MediaLibrary: undefined;
};
const Tab = createBottomTabNavigator<BottomTabsStackParamList>();

const WatchStack = createNativeStackNavigator<FullWatchStackParamList>()

const FullWatchStack = () => {
    return (
        <WatchStack.Navigator screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: AppColors.white
            }
        }}>
            <WatchStack.Screen name='Watch' component={Watch} />
            <WatchStack.Screen name='WatchSearch' component={WatchSearch} />
            <WatchStack.Screen name='WatchItemDetails' component={WatchItemDetails} />
            <WatchStack.Screen name='WatchTicket' component={WatchTicket} />
            <WatchStack.Screen name='WatchConfirmation' component={WatchConfirmation} />
        </WatchStack.Navigator>
    )
}


export default function BottomTabs() {
    const { isOpenVideoPlayer, movie_videos_loader } = useAppSelector(useMoviesState)
    const dispatch = useAppDispatch()
    const onCrossClick = () => {
        dispatch(openVideoPlayer({
            status: false
        }))
    }
    return (
        <>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{ headerShown: false }}
                    tabBar={(props) => <CustomBottomTab {...props} />}
                >
                    <Tab.Screen name="Dashboard" component={Dashboard} />
                    <Tab.Screen name="FullWatchStack" component={FullWatchStack} />
                    <Tab.Screen name="MediaLibrary" component={MediaLibrary} />
                    <Tab.Screen name="More" component={More} />
                </Tab.Navigator>
            </NavigationContainer>
            <Modal visible={isOpenVideoPlayer}>
                <TouchableOpacity
                    onPress={onCrossClick}
                    style={styles.crossBtn}>
                    <CrossSvg fillColor={AppColors.white} />
                </TouchableOpacity>
                {
                    movie_videos_loader ? <Loader /> :
                        <VideoPlayer />
                }
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    title: {
        fontFamily: AppPoppinsFonts.Regular,
        fontWeight: '500',
        fontSize: hp('2%')
    },
    WatchHeaderBg: {
        backgroundColor: AppColors.white,
        padding: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    searchBtn: {
        padding: hp('1%'),
    },
    crossBtn: {
        position: 'absolute',
        zIndex: 999,
        right: hp('3%'),
        top: hp('6%'),

    }
})
