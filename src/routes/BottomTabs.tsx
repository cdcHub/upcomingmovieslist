import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/BottomTabs/Dashboard';
import More from '../screens/BottomTabs/More';
import MediaLibrary from '../screens/BottomTabs/MediaLibrary';
import Watch from '../screens/BottomTabs/Watch';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from './components/CustomBottomTab';

export type BottomTabsStackParamList = {
    Dashboard: undefined;
    More: undefined;
    MediaLibrary: undefined;
    Watch: undefined;
};
const Tab = createBottomTabNavigator<BottomTabsStackParamList>();

export default function BottomTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBar={(props) => <CustomBottomTab {...props} />}
            >
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Watch" component={Watch} />
                <Tab.Screen name="MediaLibrary" component={MediaLibrary} />
                <Tab.Screen name="More" component={More} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}