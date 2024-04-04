import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { searchuser } from '../../../../../../services/search/Search';
import styles from '../../Styles/User/User';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const User = ({ navigation }) => {
  const route = useRoute();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState('');
  const searchUser = async () => {
    const userid = await AsyncStorage.getItem('userId');
    if (name === '') {
      return;
    }
    try {
      setLoading(true);
      const response = await searchuser(name);
      if (response && response.users && response.users.length > 0) {
        const modifiedUsers = response.users.map(user => ({
          ...user,
          receiverv2: user._id
        }));
        const modifiedUsers2 = modifiedUsers.filter(user => user._id !== userid);
        setUsers(modifiedUsers2);
        console.log(modifiedUsers2);
      } else {
        // Không có dữ liệu trả về từ API, gán mảng rỗng cho users
        setUsers([]);
        console.log('Không có dữ liệu trả về từ API');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleBackPress = () => {

    navigation.goBack();

  };
  const handleprofile = () => {
    ToastAndroid.show('Chức năng đang phát triển', ToastAndroid.SHORT);
  }


  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemtotal}>
        <View style={styles.fl}>
          <View style={styles.item}>
            <View >
              <Image source={{ uri: item.avatar }} style={styles.itemavata} />
            </View>
            <View style={styles.itemthongtin}>
              <View>
                <Text style={styles.itemname}>{item.name}</Text>
              </View>
              <View>
                <Text style={styles.bird}>{item.date == 'null' ? 'Chưa cập nhật' : item.date}</Text>
              </View>
            </View>
          </View>
          <View style={styles.item2}>
            <Text style={styles.txtprofile} onPress={() =>
              navigation.navigate('ChatScreenIn', { receiver: item })
            }>
              Nhắn tin
            </Text>
            <Text style={styles.txtprofile} onPress={handleprofile}>
              Profile
            </Text>

          </View>

        </View>
        <Text style={styles.txtstatus}>Trạng thái: Đang cập nhật</Text>
        <View>

        </View>
      </View>

    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backview}>
            <Image style={styles.back} source={require('../../../../../../assets/back_50px.png')} />
          </TouchableOpacity>
          <Text style={styles.moinguoi1}>Tìm kiếm</Text>
          <Text></Text>
        </View>

      </View>
      <TextInput value={name} onChangeText={setname} placeholder='Tìm kiếm' style={styles.headerinput} onSubmitEditing={searchUser} />
     <View style={styles.divider}></View>
      <Text style={styles.moinguoi}>Mọi người</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          {users && users.length > 0 ? (
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              style={{ marginTop: '5%', width: '95%', marginLeft: '2.5%' }}
              refreshing={loading}

            />
          ) : (
            <View style={{ marginTop: '5%', marginLeft: '5%' }}>
              <Text>
               Nhập tên người dùng hoặc tìm kiếm lại 
                </Text>
            </View>
          )}
        </>
      )}


    </View>
  );
};

export default User;
