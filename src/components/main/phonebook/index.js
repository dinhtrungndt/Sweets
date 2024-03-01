import React, { useState ,useCallback} from 'react';
import { FlatList, TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './styles/IndexStyles';
import AllFriend from './TopTab/AllFriend';
import NearFriend from './TopTab/NearFriend';
import MyModal from './modal/MDBirthday'; // Import Modal component
import OtherFriend from './TopTab/OtherFriend';

import { useNavigation } from '@react-navigation/native';

import QRCODE from './Feature/QRCODE';

const Tab = createMaterialTopTabNavigator();

const data = [
  { id: '1', title: require('../../../assets/hppn.png'),name:'Sự kiện' },
  { id: '2', title: require('../../../assets/friends.png'),name:'Lời mời' },
  { id: '3', title: require('../../../assets/qr-scan.png'),name :'Quét mã' },
  { id: '4', title: require('../../../assets/cluold.png'),name:'Thời tiết' },
];
const PhoneBookScreen = props => {
  const {navigation} = props;
const renderItem = useCallback(({ item }) => (
  <View>
    <TouchableOpacity
    style={styles.button}
    onPress={() => {
      if (item.id === '1') {
        setModalVisible(true);
      } if (item.id === '3') {
        navigation.navigate('QRCODE');
      }  if (item.id === '2') {
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
      <View style={styles.ViewFlatlist}>
        <Text style={styles.txtFlat}>Tính năng nổi bật</Text>
       <View style={styles.WrapFaltlist}>
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
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
          },
          tabBarItemStyle: {
            width: 120,
            borderRadius: 15,
            margin: 4,
            paddingVertical: 8,
            paddingHorizontal: 12,
          },
          tabBarStyle: {
            backgroundColor: '#3498db',
            borderTopWidth: 0.3,
            borderTopColor: '#ecf0f1',
            elevation: 5,
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#bdc3c7',
          tabBarPressColor: 'silver', 
          tabBarPressOpacity: 0.1, 
        }}>
        <Tab.Screen name="Tất cả" component={AllFriend} />
        <Tab.Screen name="Gần đây" component={NearFriend} />
        <Tab.Screen name="Khác" component={OtherFriend} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default PhoneBookScreen;
