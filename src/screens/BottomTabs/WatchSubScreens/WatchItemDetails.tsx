import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FullWatchStackParamList } from '../../../routes/BottomTabs';

type Props = NativeStackScreenProps<FullWatchStackParamList, 'WatchItemDetails'>;

const WatchItemDetails: React.FC<Props> = ({ navigation }) => {
    return (
        <View>
            <Text>WatchItemDetails</Text>
        </View>
    )
}

export default WatchItemDetails

const styles = StyleSheet.create({})