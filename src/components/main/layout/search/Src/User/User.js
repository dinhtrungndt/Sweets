import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { searchuser } from '../../../../../../services/search/Search';
import styles from '../../Styles/User/User';
import Icon from 'react-native-vector-icons/Ionicons';

const User = ({ navigation }) => {
  const route = useRoute();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setname] = useState('');
  const searchUser = async () => {
    try {
      setLoading(true);
      const response = await searchuser(name);
      // Duyệt qua từng phần tử trong mảng và thay đổi tên thuộc tính
      const modifiedUsers = response.users.map(user => ({
        ...user,
          receiverv2: user._id // Đổi tên thuộc tính từ '_id' thành 'receiverv2'
      }
      ));
      const modifiedUsers2 = modifiedUsers.filter(user => user._id !== modifiedUsers[0]._id);
      setUsers(modifiedUsers2);

    
     
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
      <View style={styles.fl}>
        <View style={styles.item}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}>
              <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 50 }} />
            </View>
          </View>
          <View>
            <View>
              <Text>{item.name}</Text>
            </View>
            <View>
              <Text >{item.date == 'null' ? 'Chưa cập nhật' : item.date}</Text>
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
            Xem profile
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image style={styles.back} source={require('../../../../../../assets/back_50px.png')} />
          </TouchableOpacity>
          <TextInput value={name} onChangeText={setname} placeholder='Tìm kiếm' style={styles.headerinput} onSubmitEditing={searchUser} />
        </View>

      </View>

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
              style={{ marginTop: '5%', width: '90%', marginLeft: '5%' }}
              refreshing={loading}
            />
          ) : (
            <View style={{ marginTop: '5%', marginLeft: '5%' }}>
              <Text>{users ? 'Vui lòng tìm kiếm' : 'Không có người dùng.'}</Text>
            </View>
          )}
        </>
      )}


    </View>
  );
};

export default User;
