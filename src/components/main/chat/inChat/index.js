import React, {useEffect, useContext, useState, useRef} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatScreenIn = ({route, navigation}) => {
  const {receiver} = route.params;
  const {user} = useContext(UserContext);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef();
  const socket = useRef(null);

  useEffect(() => {
    // Khởi tạo socket khi component được mount
    socket.current = io('https://sweets-nodejs.onrender.com/');
    // 11.189.180.53

    // Lắng nghe sự kiện new_message từ socket
    socket.current.on('new_message', newMessage => {
      // Kiểm tra xem tin nhắn mới có thuộc về hai người liên quan hay không
      if (
        (newMessage.idSender === user.user._id &&
          newMessage.idReceiver === receiver.receiverv2) ||
        (newMessage.idSender === receiver.receiverv2 &&
          newMessage.idReceiver === user.user._id)
      ) {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    });

    fetchData(); // Fetch tin nhắn ban đầu

    return () => {
      // Clear up khi component unmount
      socket.current.disconnect();
    };
  }, []);

  const fetchData = async () => {
    try {
      const idSender = user.user._id;
      const idReceiver = receiver.receiverv2;
      const response = await GetMessageSR(idSender, idReceiver);
      setMessages(response);
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
      idReceiver: receiver.receiverv2,
      content: messageInput,
      time: new Date().toISOString(),
    };
    socket.current.emit('new_message', newMessage);
    setMessageInput('');
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
      <View style={styles.header}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.back_user}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={26} color={'#000'} />
          </TouchableOpacity>
          {console.log('>>>>>>> kakakaka', receiver.receiverv2)}
          {receiver.receiverv2 === user.user._id ? (
            <TouchableOpacity
              style={styles.account}
              onPress={() => navigation.navigate('Profile')}>
              <Image source={{uri: receiver.avatar}} style={styles.avatar} />
              <Text style={styles.name_user}>{receiver.name}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.account}
              onPress={() =>
                navigation.navigate('OtherUserA', {
                  accountzzz: receiver,
                })
              }>
              <Image source={{uri: receiver.avatar}} style={styles.avatar} />
              <Text style={styles.name_user}>{receiver.name}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.call_video}>
          <ZegoSendCallInvitationButton
            invitees={[{userID: receiver.receiverv2, userName: receiver.name}]}
            isVideoCall={false}
            resourceID={'sweets_call'}
          />
          <ZegoSendCallInvitationButton
            invitees={[{userID: receiver.receiverv2, userName: receiver.name}]}
            isVideoCall={true}
            resourceID={'sweets_call'}
          />
        </View>
      </View>
      <Text style={styles.line} />
      {loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
      <FlatList
        inverted={true}
        data={messages.slice().reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem({item})}
      />
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
