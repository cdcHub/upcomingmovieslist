import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';
import { BottomTabsStackParamList } from '../../routes/BottomTabs';

type Props = NativeStackScreenProps<BottomTabsStackParamList, 'Dashboard'>;


const Dashboard: React.FC<Props> = (props) => {
    return (
        <View>
            <Text>No Data Found</Text>
        </View>
    );
};

export default Dashboard;
