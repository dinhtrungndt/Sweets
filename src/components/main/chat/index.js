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
import React, {useEffect, useState} from 'react';

// Data
import {listOF} from './data/listOF';

// css
import {styles} from './styles/chat';

// library
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GetListUser} from '../../../services/user/userService';

const ChatScreen = props => {
  const {navigation} = props;
  const [user, setUser] = useState('');

  const getListUser = async () => {
    try {
      const res = await GetListUser();
      setUser(res);
    } catch (error) {
      console.log('Lỗi lasyas danh sách user', error);
    }
  };

  useEffect(() => {
    getListUser();
  }, []);

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
        <Text style={styles.chat}>Đoạn chat</Text>
        <TouchableOpacity>
          <Image
            style={styles.image_menu}
            source={require('../../../assets/add_chat.png')}
          />
        </TouchableOpacity>
      </View>

      {/* sreach */}
      <View style={styles.sreach}>
        <Image
          style={styles.image_search}
          source={require('../../../assets/search_50px.png')}
        />
        <TextInput style={styles.inputSearch} placeholder="Tìm kiếm" />
      </View>

      {/* list online and offline */}
      <View style={styles.listOF}>
        <FlatList
          data={listOF}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Image style={styles.image} source={{uri: item.image}} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.status}>
                  <Ionicons
                    name="ellipse"
                    size={10}
                    color={item.status === 'online' ? '#00FF00' : '#FF0000'}
                  />
                  <Text style={styles.status_text}>{item.status}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* line */}
      <Text style={styles.line} />

      {/* list chat */}
      <FlatList
        data={user}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.container_chat}
            onPress={() =>
              navigation.navigate('ChatScreenIn', {receiver: item})
            }>
            {item.avatar === 'null' ? (
              <Image
                style={styles.image_account_null}
                source={require('../../../assets/account.png')}
              />
            ) : (
              <Image style={styles.image} source={{uri: item.avatar}} />
            )}
            <View style={styles.info}>
              <Text style={styles.nameChat}>{item.name}</Text>
              <Text style={styles.TextlistChat}>{item?.chat}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ChatScreen;
