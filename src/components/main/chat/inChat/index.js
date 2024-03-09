import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import io from 'socket.io-client';
import {GetMessageSR} from '../../../../services/home/chatService';
import {UserContext} from '../../../../contexts/user/userContext';
import {styles} from '../styles/chat_in';
const socket = io('https://sweets-nodejs.onrender.com/');

const ChatScreenIn = ({route, navigation}) => {
  const {receiver} = route.params;
  const {user} = useContext(UserContext);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State mới để xác định trạng thái làm mới
  const scrollViewRef = useRef();

  useEffect(() => {
    const handleNewMessage = data => {
      setMessages(prevMessages => [...prevMessages, data]);
      console.log('check data message:', data);
    };
    fetchData();
    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, [messages]);
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        console.log('unfocus hidden');
      };
    }, []),
  );

  const fetchData = async () => {
    try {
      const response = await GetMessageSR(user.user._id, receiver._id);
      setMessages(response.slice(-100));
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const sendMessage = () => {
    if (messageInput === '' || !messageInput.trim()) {
      return;
    }
    const newMessage = {
      idSender: user.user._id,
      idReceiver: receiver._id,
      content: messageInput,
      time: new Date().toISOString(),
    };
    socket.emit('new_message', newMessage);
    setMessageInput('');
  };

  const loadMoreMessages = async () => {
    if (loadingMore) {
      return;
    } // Đừng cho phép người dùng nhấn nút nhiều lần

    setLoadingMore(true);
    try {
      const response = await GetMessageSR(
        user.user._id,
        receiver._id,
        messages.length,
      );
      setMessages(prevMessages => [...prevMessages, ...response]);
      console.log('check response:', response);
    } catch (error) {
      console.error('Lỗi khi tải thêm tin nhắn:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const refreshMessages = async () => {
    try {
      setRefreshing(true); // Đặt refreshing thành true trước khi làm mới
      const response = await GetMessageSR(user.user._id, receiver._id);
      console.log('check response:', response);
      setMessages(response.slice(-20));
    } catch (error) {
      console.error('Lỗi khi làm mới tin nhắn:', error);
    } finally {
      setRefreshing(false); // Đặt refreshing thành false sau khi làm mới
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.chat}>
        {item.idSender === user.user._id ? (
          <View style={styles.sentMessage}>
            <Text style={styles.sentContent}>{item.content}</Text>
          </View>
        ) : (
          <View style={styles.receivedMessage}>
            <View style={styles.contentreceiver}>
              <Text style={styles.receivedText}>{item.content}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back_user}
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.back}
            source={require('../../../../assets/back_50px.png')}
          />
          <TouchableOpacity style={styles.account}>
            <Image source={{uri: receiver.avatar}} style={styles.avatar} />
            <Text style={styles.name_user}>{receiver.name}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.call_video}>
          <TouchableOpacity>
            <Image
              style={styles.back}
              source={require('../../../../assets/call_50px.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15}}>
            <Image
              style={styles.back}
              source={require('../../../../assets/call_video.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* line */}
      <Text style={styles.line} />
      {/* chat */}
      <FlatList
        // ref={scrollViewRef}
        data={messages.slice().reverse()}
        keyExtractor={item => item._id}
        // onEndReached={loadMoreMessages}
        // onEndReachedThreshold={0.1}
        // onRefresh={refreshMessages}
        // refreshing={refreshing}
        renderItem={({item}) => renderItem({item})}
      />
      {loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
      {/* Input */}
      <View style={styles.input}>
        <TextInput
          style={styles.input_text}
          placeholder="Bạn muốn nói gì?"
          placeholderTextColor="#000"
          value={messageInput}
          onChangeText={text => setMessageInput(text)}
        />
        <TouchableOpacity style={styles.send} onPress={sendMessage}>
          <Image
            style={styles.back}
            source={require('../../../../assets/email_send_50px.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreenIn;
