/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../../../../../../../contexts/user/userContext';
import {
  uploadImageStatus,
  uploadMedia,
  uploadPost,
} from '../../../../../../../services/home/homeService';
import Toast from 'react-native-toast-message';
import {CommonActions} from '@react-navigation/native';

const UpImageStory = ({
  openModelSettingObjects,
  cancel,
  selectedImageURI,
  navigation,
  selectedImages,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [uploadPickImage, setUploadPickImage] = useState(null);
  const [_idPosts, setIdPosts] = useState(null);
  const [upload, setUpload] = useState(false);
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const inputText = 'Sweets';

  const uploadImageToCloudinary = useCallback(async response => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('imageStatus', {
        uri: selectedImageURI,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      const data = await uploadImageStatus(formData);
      console.log('>>>>>>> Data:', data.urls);
      setUploadPickImage(data.urls);
      setLoading(false);
    } catch (error) {
      console.log('Lỗi uploading image:', error);
      setLoading(false);
    }
  });

  const handleUploadMedia = useCallback(async () => {
    try {
      if (!_idPosts) {
        return;
      }
      const media = uploadPickImage.join();
      const cbMediaType = {
        url: uploadPickImage?.length > 1 ? uploadPickImage : media,
        type: 'image',
      };

      const response = await uploadMedia(_idPosts, cbMediaType);
      // console.log('>>>>>>> response -> handleUploadMedia', response);
    } catch (error) {
      console.log('>>>>>>> Lỗi ở HandleUploadMedia nè', error);
    }
  });

  const handlePostUpload = async () => {
    try {
      if (!inputText && !uploadPickImage) {
        return Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Bạn chưa nhập nội dung hoặc chọn ảnh',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }

      if (inputText && uploadPickImage) {
        await Promise.all([handleUploadMedia(), handleUploadPost()]);
      } else if (inputText) {
        await handleUploadPost();
      } else if (uploadPickImage) {
        await handleUploadMedia();
      }

      if (!upload) {
        navigation.navigate('HomeScreen');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Up tin thành công',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Up tin thất bại',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      console.error('Lỗi khi đăng bài:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Có lỗi xảy ra khi đăng bài',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  };

  const handleUploadPost = useCallback(async () => {
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
      console.error(
        'Lỗi catch --->>>>> error 25111 selects feeling story :',
        error,
      );
    }
  }, [user]);

  const handleShareButtonPress = async () => {
    try {
      await uploadImageToCloudinary();
      await handlePostUpload();
    } catch (error) {
      console.error('Lỗi khi chia sẻ:', error);
    }
  };

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
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.modalCloseButton} onPress={cancel}>
        <Ionicons name={'chevron-back'} color={'#fff'} size={30} />
      </TouchableOpacity>
      {selectedImages === 'null' && (
        <Image
          source={selectedImages[selectedImageIndex]}
          style={styles.modalImage}
        />
      )}

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
            <Text style={[styles.seetingtext, {color: '#6D6C6C'}]}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnShare}
          onPress={handleShareButtonPress}>
          <Text style={styles.btnShareText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpImageStory;

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000',
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
