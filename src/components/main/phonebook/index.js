import React, { useState, useCallback } from 'react';
import { FlatList, TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './styles/IndexStyles';
import AllFriend from './TopTab/AllFriend';
import NearFriend from './TopTab/NearFriend';
import MyModal from './modal/MDBirthday';
import OtherFriend from './TopTab/OtherFriend';

import { useNavigation } from '@react-navigation/native';

import QRCODE from './Feature/QRCODE';

const Tab = createMaterialTopTabNavigator();

const data = [
  { id: '1', title: require('../../../assets/hppn2.png'), name: 'Sinh nhật' },
  { id: '2', title: require('../../../assets/friends2.png'), name: 'Lời mời' },
  { id: '3', title: require('../../../assets/qr-scan2.png'), name: 'Quét mã' },
  { id: '4', title: require('../../../assets/cluold2.png'), name: 'Thời tiết' },
];
const PhoneBookScreen = props => {
  const { navigation } = props;
  const renderItem = useCallback(({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (item.id === '1') {
            navigation.navigate('SinhNhat');
          } if (item.id === '3') {
            navigation.navigate('QRCODE');
          } if (item.id === '2') {
            navigation.navigate('LoiMoiKetBan');
          } if (item.id === '4') {
            navigation.navigate('ThoiTiet');
          }
          else {

          } {
            // Xử lý logic cho các button khác nếu cần
          }
        }}>
        <Image source={item.title} style={styles.buttonImg} />
      </TouchableOpacity>
      <Text style={styles.txtFlatlist}>{item.name}</Text>
    </View>
  ), [setModalVisible]);


  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <NavigationContainer independent={true}>

      <View style={styles.wrapBackground}>
      <Text style={styles.txtFlat2}>Danh sách bạn bè</Text>
      </View>
      <View style={styles.ViewFlatlist}>
       
        <View style={styles.WrapFaltlist}>
       <View style={{flexDirection:"row",borderBottomWidth:0.5,
          borderColor:'#22b6c0',marginHorizontal:5}}>
        <Image 
        style={{width:35,height:35,marginLeft:5,marginVertical:4}}
        source={require('../../../assets/fireworks.png')}/>
       <Text style={styles.txtFlat}>Tính năng nổi bật</Text>
       </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </View>

      <MyModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />

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
      <Tab.Screen name="Tất cả" component={AllFriend} />
      <Tab.Screen name="Gần đây" component={NearFriend} />
      <Tab.Screen name="Khác" component={OtherFriend} />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default PhoneBookScreen;
