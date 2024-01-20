import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text } from 'react-native';
import { BottomTabsStackParamList } from '../../routes/BottomTabs';

type Props = NativeStackScreenProps<BottomTabsStackParamList, 'More'>;

const More: React.FC<Props> = (props) => {
  return (
    <View>
      <Text>More</Text>
      <Text>No Data Found</Text>
    </View>
  );
};

export default More;
