import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';
import { BottomTabsStackParamList } from '../../routes/BottomTabs';
import { SafeContainer } from '../../components';

type Props = NativeStackScreenProps<BottomTabsStackParamList, 'Dashboard'>;


const Dashboard: React.FC<Props> = (props) => {
    return (
        <SafeContainer>
            <Text>No Data Found</Text>
        </SafeContainer>
    );
};

export default Dashboard;
