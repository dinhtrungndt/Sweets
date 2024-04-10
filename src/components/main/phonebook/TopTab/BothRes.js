import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();
import LoiMoiKetBan from '../Feature/LoiMoiKetBan';
import LoiMoiDaGui from '../Feature/LoiMoiDaGui';
const BothRes = (props) => {
    const { navigation } = props;
  return (
    <NavigationContainer independent={true}>
  <View style={styles.wrapContent1}>
        <TouchableOpacity style={styles.friendItem}  onPress={() => navigation.goBack()}>
          <Image source={require('../../../../assets/icon_back.png')} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.txtContent1}>Lời mời kết bạn</Text>
        
      </View>

      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 15, fontWeight: 'bold' },
          tabStyle: { width: 'auto' },
          style: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          activeTintColor: '#22b6c0',
          inactiveTintColor: '#bdc3c7',
          indicatorStyle: { backgroundColor: '#22b6c0' },
          activeBackgroundColor: '#22b6c0', // Thay đổi màu nền của tab hiện tại khi được chọn
        }}
      >
        <Tab.Screen name="Đã nhận" component={LoiMoiKetBan} />
        <Tab.Screen name="Đã gửi" component={LoiMoiDaGui} />
        
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BothRes

const styles = StyleSheet.create({
    wrapContent1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#22b6c0',
       
      },
      friendItem: {
        padding: 10,
      },
      avatar: {
        width: 24,
        height: 24,
      },
      txtContent1: {
        fontSize: 19,
        fontWeight: 'bold',
        
        marginRight:116
       
      },
})