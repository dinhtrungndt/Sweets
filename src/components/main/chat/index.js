/* eslint-disable prettier/prettier */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';

// Data
import {listOF} from './data/listOF';

// css
import {styles} from './styles/chat';
import io from 'socket.io-client';
// library
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GetListUser} from '../../../services/user/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateStatus} from '../../../services/user/userService';
import { useTranslation } from 'react-i18next';

const ChatScreen = props => {
  const {navigation} = props;
  const [user, setUser] = useState('');
  const [user1, setUser1] = useState('');
  const { t, i18n } = useTranslation();

  const socket = useRef(null);

  useEffect(() => {
    // Khởi tạo socket khi component được mount
    socket.current = io('https://sweets-nodejs.onrender.com/');
    // 11.189.180.53
    getListUser(); // Fetch tin nhắn ban đầu
    // Lắng nghe sự kiện new_message từ socket
    socket.current.on('new_message', newMessage => {
      getListUser();
    });

    // Clear up khi component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const getListUser = async () => {
    try {
      const _id = await AsyncStorage.getItem('userId');

      setUser1(_id);
      const res = await GetListUser(_id);
      setUser(res);
    } catch (error) {
      console.log('Lỗi lấy danh sách user', error);
    }
  };

  // dùng usefocusEffect để load lại dữ liệu khi quay lại màn hình
  useFocusEffect(
    React.useCallback(() => {
      getListUser();
    }, []),
  );

  const renderItem = ({item}) => {
    const updateStatusUser = async () => {
      try {
        const body = {
          _id: item._id,
          status: 'Đã xem',
        };
        if (item.senderv2 != user1) {
          navigation.navigate('ChatScreenIn', {receiver: item});

          return;
        } else {
          await updateStatus(body);

          navigation.navigate('ChatScreenIn', {receiver: item});
        }
      } catch (error) {
        console.log('Lỗi update status', error);
      }
    };
    return (
      <TouchableOpacity
        style={styles.container_chat}
        onPress={updateStatusUser}>
        {item.avatar === 'null' ? (
          <Image
            style={styles.image_account_null}
            source={require('../../../assets/account.png')}
          />
        ) : (
          <View>
            <Image style={styles.image} source={{uri: item.avatar}} />
            {item.senderv2 != user1 ? null : item.status === 'sent' ? (
              <View style={styles.notificaiton}>
                <Text style={styles.txtnotification}>1</Text>
              </View>
            ) : null}
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.nameChat}>{item.name}</Text>
          <Text style={styles.TextlistChat}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            style={styles.image_menu}
            source={require('../../../assets/Menu_50px.png')}
          />
        </TouchableOpacity>
        <Text style={styles.chat}>{t('messages')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreens')}>
          <Image
            style={styles.image_menu}
            source={require('../../../assets/add_chat.png')}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.line} />
      <View style={styles.divider} />
      <FlatList
        data={user}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({item}) => renderItem({item})}
      />
    </View>
  );
};

export default ChatScreen;
