import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { AppColors } from '../constants/AppColors'

type Props = PropsWithChildren
const SafeContainer:React.FC<Props> = ({children}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:AppColors.white }}>
     { children && children}
    </SafeAreaView>
  )
}

export default SafeContainer

