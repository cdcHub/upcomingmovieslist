import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';
import { BottomTabsStackParamList } from '../../routes/BottomTabs';

type Props = NativeStackScreenProps<BottomTabsStackParamList, 'Watch'>;


const Watch: React.FC<Props> = (props) => {
  return (
    <View>
      <Text>Watch</Text>
      <Text>No Data Found</Text>
    </View>
  );
};

export default Watch;
