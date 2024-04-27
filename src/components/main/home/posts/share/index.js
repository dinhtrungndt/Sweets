import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserContext} from '../../../../../contexts/user/userContext';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import linking from '../../../../../utils/linking';
import Share from 'react-native-share';
import {sharePost} from '../../../../../services/home/homeService';
import Toast from 'react-native-toast-message';
import {Linking} from 'react-native';

const ModalShare = ({cancel, navigation, itemModalShare, reloadPosts}) => {
  //   console.log('reloadPosts', reloadPosts);
  const {user} = useContext(UserContext);
  const [content, setContent] = useState('');
  const dateString = Date.now();
  const randomSuffix = Math.floor(Math.random() * 10000000);
  const dateNumber = new Date(dateString);
  const _idPosts = dateNumber.getTime().toString() + randomSuffix.toString();

  const onChangeContext = text => {
    setContent(text);
  };

  const handleShareContext = async () => {
    try {
      const detailShare = {
        _id: _idPosts,
        idUsers: user?.user?._id,
        idPosts: itemModalShare._id,
        content: content,
        idObject: '65b1fe6dab07bc8ddd7de469',
        idTypePosts: '65b20030261511b0721a9913',
      };
      const res = await sharePost(detailShare);
      // console.log('handleShareContext', res);
      cancel();
      Toast.show({
        type: 'info',
        position: 'top',
        text1: `Chia sẻ thành công !`,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onPress: () => {
          navigation.navigate('NotificationsScreen');
        },
      });
      reloadPosts();
    } catch (error) {
      console.log('error handleShareContext', error);
    }
  };

  const handleShare = async item => {
    try {
      if (item && item._id) {
        const deepLink = linking.prefixes[0] + '/' + `posts/${item._id}`;
        const shareOptions = {
          title: 'Share',
          message: 'Chia sẻ bài viết này!',
          url: deepLink,
        };
        await Share.open(shareOptions);
      } else {
        console.log('Bài viết không hợp lệ để chia sẻ');
      }
    } catch (error) {
      console.log('Lỗi chia sẻ nè:', error);
    }
  };

  const handleOpenLink = async url => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Vui lòng cài đặt ứng dụng trước khi chia sẻ !`);
      }
    } catch (error) {
      console.log('error handleOpenLink', error);
    }
  };

  return (
    <View style={styles.T}>
      <View style={styles.header}>
        <View style={styles.header_in}>
          <Image source={{uri: user?.user?.avatar}} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user?.user?.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={styles.typePosts_container}>
                <Text style={styles.typePosts}>Bảng tin ▶</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.typePosts_container}>
                <FontAwesome5
                  right={5}
                  name="user-friends"
                  size={10}
                  color="#000"
                />
                <Text style={styles.typePosts}>Bạn bè ▶</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Nhập nội dung share */}
        <TextInput
          style={styles.inputContent}
          multiline
          value={content}
          onChangeText={onChangeContext}
          placeholder="Hãy nói gì đó về bài viết này..."
        />
        <TouchableOpacity
          onPress={handleShareContext}
          style={{
            backgroundColor: '#22b6c0',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{color: '#fff', fontWeight: '500'}}>Chia sẻ ngay</Text>
        </TouchableOpacity>
      </View>
      {/* body */}
      <View style={styles.body}>
        <Text style={styles.text_share}>Chia sẻ lên</Text>
        <ScrollView
          style={{marginTop: 10}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('fb-messenger://share?link=');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <FontAwesome5 name="facebook-messenger" size={20} color="#0088cc" />
            <Text style={{marginLeft: 5, color: '#000'}}>Messenger</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleOpenLink('twitter://share?link=');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <FontAwesome5 name="twitter" size={20} color="#1DA1F2" />
            <Text style={{marginLeft: 5, color: '#000'}}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleOpenLink('instagram://share?link=');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <FontAwesome5 name="instagram" size={20} color="#E1306C" />
            <Text style={{marginLeft: 5, color: '#000'}}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('whatsapp://send?text=');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <FontAwesome5 name="whatsapp" size={20} color="#25D366" />
            <Text style={{marginLeft: 5, color: '#000'}}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleOpenLink('linkedin://share?link=');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <FontAwesome5 name="linkedin" size={20} color="#0A66C2" />
            <Text style={{marginLeft: 5, color: '#000'}}>Linkedin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleShare(itemModalShare)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <FontAwesome5 name="ellipsis-h" size={20} color="#000" />
            <Text style={{marginLeft: 5, color: '#000'}}>Thêm</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ModalShare;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '50%',
    bottom: 0,
    backgroundColor: '#fff',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  header: {
    padding: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 2,
    borderRadius: 10,
  },
  header_in: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  typePosts_container: {
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    padding: 12,
    paddingTop: 2,
    paddingBottom: 2,
    marginLeft: 12,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typePosts: {
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  inputContent: {
    height: 100,
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
    paddingBottom: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#f0f0f0',
  },
  body: {
    marginTop: 20,
  },
  text_share: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
