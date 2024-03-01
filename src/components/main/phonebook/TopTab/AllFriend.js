import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../../../contexts/user/userContext';
import styles from '../styles/AllFriendStyles'; // Đảm bảo import styles từ file của bạn

const AllFriend = () => {
  const {user} = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [noFriendsMessage, setNoFriendsMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      // Lấy danh sách bạn bè từ AsyncStorage
      const friendsFromStorage = await AsyncStorage.getItem('friends');
      if (friendsFromStorage) {
        const parsedFriends = JSON.parse(friendsFromStorage);

        if (parsedFriends.length > 0) {
          // Nếu có bạn bè, setFriends và thực hiện các xử lý khác
          setFriends(parsedFriends);
          setFilteredFriends(parsedFriends);
        } else {
          // Nếu không có bạn bè, hiển thị thông báo
          setNoFriendsMessage('Bạn chưa có người bạn nào.');
        }
      } else {
        // Nếu không có bạn bè, hiển thị thông báo
        setNoFriendsMessage('Bạn chưa có người bạn nào.');
      }
    };

    fetchFriends();
  }, []);

  const handleSearch = text => {
    setSearchTerm(text);
    const filtered = friends.filter(friend =>
      friend.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredFriends(filtered);
  };

  const renderFriendItem = ({item}) => (
    <TouchableOpacity style={styles.friendItem}>
      <Text style={styles.friendItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    

      {/* Thanh tìm kiếm */}
      <View style={{flexDirection: 'row', width: '100%', position: 'relative'}}>
        <Image
          source={require('../../../../assets/searchh.png')}
          style={styles.imgSearch}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm bạn bè"
          placeholderTextColor="#666"
          onChangeText={text => handleSearch(text)}
          value={searchTerm}></TextInput>

      </View>

     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
     <Text style={styles.title}>N người bạn</Text>
     <Text style={styles.title}>Quản lí</Text>
     </View>
      {noFriendsMessage ? (
        <Text style={styles.noFriendsMessage}>{noFriendsMessage}</Text>
      ) : (
        // Hiển thị danh sách bạn bè từ filteredFriends
        <FlatList
          data={filteredFriends}
          keyExtractor={item => item}
          renderItem={renderFriendItem}
        />
      )}
    </View>
  );
};

export default AllFriend;
