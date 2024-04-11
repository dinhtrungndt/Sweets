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
        console.log('userDun', modifiedUsers2)

        const modifiedUsers2WithCheckBanBe = modifiedUsers2.map(user => ({
          ...user,
          checkBanBe: false
        }));

        console.log('userDun22', modifiedUsers2WithCheckBanBe)
        const storedData = await AsyncStorage.getItem('friendData');
        console.log('Mảng đã lấy từ AsyncStorageFrinedđ:', storedData);

        modifiedUsers2WithCheckBanBe.forEach(user => {
          if (storedData.includes(user._id)) {
            user.checkBanBe = true;
          }
        });

        console.log('userDun4442', modifiedUsers2WithCheckBanBe);


        setUsers(modifiedUsers2WithCheckBanBe);


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
              <View style={styles.itemthongtin2}>
                <Text style={styles.itemname}>{item.name}</Text>
                <Text style={styles.txtstatus}>
                  {item.checkBanBe ? 'Bạn Bè' : 'Chưa là bạn bè'}
                </Text>
              </View>
            

              <View style={styles.item2}>
                <Text style={styles.txtprofile} onPress={() =>
                  navigation.navigate('ChatScreenIn', { receiver: item })
                }>
                  Nhắn tin
                </Text>
                <Text style={styles.txtprofile2} onPress={handleprofile}>
                  Profile
                </Text>

              </View>
            </View>
          </View>


        </View>



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
