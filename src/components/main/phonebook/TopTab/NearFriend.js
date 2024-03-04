import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from '../styles/NearFriendStyles'
const NearFriend = () => {
  return (
    <View>
   
   <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
   <Text>Bạn bè mới gần đây</Text>
   <Text>Quản lí</Text>
   </View>
    </View>
  )
}

export default NearFriend

