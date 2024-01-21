import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors } from '../constants/AppColors'

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={AppColors.primary} />
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})