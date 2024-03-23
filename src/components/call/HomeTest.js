import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'

const HomeTest = ({ navigation }) => {
  
  return (
    <View>
      <Text>HomeTest</Text>
      <Button title="VideoCallPage" onPress={() => {navigation.navigate('VideoCallPage')}} />
    </View>
  )
}

export default HomeTest

const styles = StyleSheet.create({})