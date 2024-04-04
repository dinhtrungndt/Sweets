/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';

// library
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../../../../../../../contexts/user/userContext';
import Toast from 'react-native-toast-message';
import {CommonActions} from '@react-navigation/native';
import {uploadPost} from '../../../../../../../services/home/homeService';

const LabelPickStory = ({cancel, openModelSettingObjects, navigation}) => {
  const {user} = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const [upload, setUpload] = useState(false);
  const [_idPosts, setIdPosts] = useState(null);

  const handleInputChange = text => {
    setInputText(text);
  };

  const handlePostUpload = () => {
    handleUploadPost();
    if (!inputText) {
      return Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Bạn chưa nhập nội dung',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else if (!upload) {
      navigation.navigate('HomeScreen');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Đăng story thành công !',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Đăng story thất bại !',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  const handleUploadPost = useCallback(async () => {
    if (!user || !inputText) {
      return;
    }

    try {
      const postDetails = {
        _id: _idPosts,
        content: inputText,
        createAt: new Date().toISOString(),
        idObject: '65b1fe6dab07bc8ddd7de469',
        idTypePosts: '65b20035261511b0721a9916',
      };

      const response = await uploadPost(user.user._id, postDetails);
      setUpload(response);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'HomeStackScreen'}],
        }),
      );
      // console.log(' >>>>>>>>>>>>>>>> Đăng thành công:', response);
    } catch (error) {
      console.error('Lỗi catch --->>>>> error :', error);
    }
  }, [user, inputText]);

  useEffect(() => {
    const dateString = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000000);
    const dateNumber = new Date(dateString);
    const _idPosts = dateNumber.getTime().toString() + randomSuffix.toString();
    setIdPosts(_idPosts);
  }, []);

  useEffect(() => {
    handleUploadPost();
  }, [user]);

  return (
    <View style={styles.T}>
      <TouchableOpacity style={styles.modalCloseButton} onPress={cancel}>
        <Ionicons name={'chevron-back'} color={'#fff'} size={30} />
      </TouchableOpacity>
      <View style={styles.content_container}>
        <TextInput
          style={styles.content}
          placeholder="Bạn đang nghĩ gì ?"
          placeholderTextColor={'#fff'}
          onChangeText={handleInputChange}
          multiline={true}
        />
      </View>
      <View style={styles.seetingInUp}>
        <View style={styles.seetingInUp_two}>
          <TouchableOpacity
            style={styles.seetingInUpQRT}
            onPress={openModelSettingObjects}>
            <MaterialCommunityIcons
              name={'account-cog-outline'}
              color={'#fff'}
              size={25}
            />
            <Text style={styles.seetingtext}>Quyền riêng tư</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seetingSave}>
            <MaterialIcons name={'save-alt'} color={'#6D6C6C'} size={25} />
            <Text style={styles.seetingtext}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handlePostUpload}
          style={[
            styles.btnShare,
            {backgroundColor: inputText ? '#7ec1a5' : '#CBCBCB'},
          ]}>
          <Text style={styles.btnShareText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LabelPickStory;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  content_container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 14,
    color: '#fff',
    margin: 16,
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: '#22b6c0',
    padding: 100,
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    padding: 16,
    zIndex: 1,
  },
  modalImage: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  seetingInUp: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  seetingInUp_two: {
    flexDirection: 'row',
  },
  seetingInUpQRT: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seetingtext: {
    color: '#fff',
    textAlign: 'center',
  },
  seetingSave: {
    paddingLeft: 20,
  },
  btnShare: {
    width: 75,
    height: 38,
    backgroundColor: '#22b6c0',
    borderRadius: 5,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnShareText: {
    fontSize: 16,
    color: '#fff',
  },
});
