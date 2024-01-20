import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import BottomTabs from './src/routes/BottomTabs'
import { Provider } from 'react-redux'
import { store } from './src/store/configure'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <BottomTabs />
      </Provider>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})