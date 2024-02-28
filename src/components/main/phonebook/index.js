import React, { useState ,useCallback} from 'react';
import { FlatList, TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './styles/IndexStyles';
import AllFriend from './TopTab/AllFriend';
import NearFriend from './TopTab/NearFriend';
import MyModal from './modal/MDBirthday'; // Import Modal component
import OtherFriend from './TopTab/OtherFriend';

const Tab = createMaterialTopTabNavigator();

const data = [
  { id: '1', title: require('../../../assets/hppn.png') },
  { id: '2', title: require('../../../assets/friends.png') },
  { id: '3', title: require('../../../assets/qr-scan.png') },
  { id: '4', title: require('../../../assets/cluold.png') },
];
const PhoneBookScreen = () => {
const renderItem = useCallback(({ item }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => {
      if (item.id === '1') {
        setModalVisible(true);
      } else {
        // Xử lý logic cho các button khác nếu cần
      }
    }}>
    <Image source={item.title} style={styles.buttonImg} />
  </TouchableOpacity>
), [setModalVisible]);


  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <NavigationContainer independent={true}>
      <View style={styles.ViewFlatlist}>
        <Text style={styles.txtFlat}>Tính năng nổi bật</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      <MyModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
          tabBarItemStyle: { width: 120, borderRadius: 15, margin: 4 },
          tabBarStyle: { backgroundColor: '#3498db', borderTopWidth: 0.3, borderTopColor: '#ecf0f1' },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#bdc3c7',
        }}>
        <Tab.Screen name="Tất cả" component={AllFriend} />
        <Tab.Screen name="Gần đây" component={NearFriend} />
        <Tab.Screen name="Khác" component={OtherFriend} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default PhoneBookScreen;
