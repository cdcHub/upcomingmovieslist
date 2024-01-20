import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/BottomTabs/Dashboard';
import More from '../screens/BottomTabs/More';
import MediaLibrary from '../screens/BottomTabs/MediaLibrary';
import Watch from '../screens/BottomTabs/Watch';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from './components/CustomBottomTab';
import { WatchItemDetails, WatchSearch, WatchTicket } from '../screens/BottomTabs/WatchSubScreens';
import Header from '../components/Watch/Header';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppPoppinsFonts } from '../constants/AppFonts';
import { hp } from '../dimension';
import { AppColors } from '../constants/AppColors';
import SearchSvg from '../../assets/svgs/SearchSvg';
import LeftArrowSvg from '../../assets/svgs/LeftArrowSvg';

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
    // More: undefined;
    // MediaLibrary: undefined;
};
const Tab = createBottomTabNavigator<BottomTabsStackParamList>();

const WatchStack = createNativeStackNavigator<FullWatchStackParamList>()

const FullWatchStack = () => {
    return (
        <WatchStack.Navigator screenOptions={{
            // headerShown:false
            headerStyle: {
                backgroundColor: AppColors.white
            }
        }}>
            <WatchStack.Screen name='Watch' component={Watch}
                options={{
                    headerShown: false,

                    header(props) {
                        return (
                            <View style={styles.WatchHeaderBg}>
                                <Text style={styles.title}>Watch</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate('WatchSearch')
                                    }} style={styles.searchBtn}>
                                    <SearchSvg />
                                </TouchableOpacity>
                            </View>)
                    }
                }}
            />
            <WatchStack.Screen name='WatchSearch' component={WatchSearch}
                options={{
                    header(props) {
                        return <Header props={props} />
                    }
                }}
            />
            <WatchStack.Screen name='WatchItemDetails' component={WatchItemDetails}
                options={{
                    headerShown: false,
                    header(props) {
                        return (
                            <View style={[styles.WatchHeaderBg, { justifyContent: 'flex-start' }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.goBack()
                                    }} style={styles.searchBtn}>
                                    <LeftArrowSvg fillColor={AppColors.white} />
                                </TouchableOpacity>
                                <Text style={styles.title}>Watch</Text>
                            </View>)
                    }
                }}
            />
            <WatchStack.Screen name='WatchTicket' component={WatchTicket}
                options={{
                    headerShown: false
                }}
            />
        </WatchStack.Navigator>
    )
}


export default function BottomTabs() {
    return (
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
})
