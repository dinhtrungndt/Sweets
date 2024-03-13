/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState, useCallback, useEffect} from 'react';
import {UserContext} from '../../../../contexts/user/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAvatar, updateCover} from '../../../../services/user/userService';
import {updateCoverImage} from '../../../../services/user/userService';

// style
import {styles} from '../style/profile';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

// library
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {set} from 'date-fns';
import {uploadImageStatus} from '../../../../services/home/homeService';
import {CommonActions} from '@react-navigation/native';

const Profile = props => {
  const {navigation} = props;

  const [loading, setLoading] = useState(false);

  const [imageAvatar, setImageAvatar] = useState([]);
  const [imageAvatarPath, setImageAvatarPath] = useState(null);
  const [modalVisibleAvatar, setModalVisibleAvatar] = useState(false);
  const [imageCover, setImageCover] = useState([]);
  const [imageCoverPath, setImageCoverPath] = useState(null);
  const [modalVisibleCover, setModalVisibleCover] = useState(false);
  //   const [modalVisible, setModalVisible] = useState(false);

  const {user} = useContext(UserContext);

  const takePhotoAvatar = useCallback(async response => {
    if (response.didCancel || response.errorCode || response.errorMessage) {
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const selectedImages = response.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      }));
      setImageAvatar(selectedImages);
      const formData = new FormData();

      selectedImages.forEach((image, index) => {
        formData.append('imageStatus', image);
      });

      const data = await uploadImageStatus(formData);
      // console.log('5955 995959 >>>>>>>>>> Data 59 data', data);
      setImageAvatarPath(data.urls);
      // console.log('6226262626 >>>>>>>>>>>>>> 62 dataImage', data.urls);
    }
  }, []);

  const takePhotoCover = useCallback(async response => {
    if (response.didCancel || response.errorCode || response.errorMessage) {
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const selectedImages = response.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      }));
      setImageCover(selectedImages);
      const formData = new FormData();

      selectedImages.forEach((image, index) => {
        formData.append('imageStatus', image);
      });

      const data = await uploadImageStatus(formData);
      // console.log('5955 995959 >>>>>>>>>> Data 59 data', data);
      setImageCoverPath(data.urls);
      // console.log('6226262626 >>>>>>>>>>>>>> 62 dataImage', data.urls);
    }
  }, []);

  // console.log('>>>>>> imageAvatarPath ', imageCoverPath);
  // console.log('>>>>>> imageAvatar ', imageCover);

  const openCamera = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchCamera(options, takePhotoAvatar);
  }, []);

  const openLibrary = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 5,
      saveToPhotos: true,
      selectionLimit: 5,
      multiple: true,
    };
    await launchImageLibrary(options, takePhotoAvatar);
    setModalVisibleAvatar(false);
  }, []);

  const openCameraCover = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchCamera(options, takePhotoCover);
  }, []);

  const openLibraryCover = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 5,
      saveToPhotos: true,
      selectionLimit: 5,
      multiple: true,
    };
    await launchImageLibrary(options, takePhotoCover);
    setModalVisibleAvatar(false);
  }, []);

  const handleAvatarUpdate = useCallback(async () => {
    const data = {
      avatar: JSON.stringify(imageAvatarPath),
    };
    try {
      if (imageAvatarPath) {
        setLoading(true);
        const res = await updateAvatar(user.user._id, data);
        // console.log('>>>> upload avatar thành công !', res);
        navigation.navigate('HomeStackScreen');
      } else {
        setLoading(false);
        // console.log('Không có hình ảnh để cập nhật');
      }
    } catch (error) {
      setLoading(false);
      // console.error('Lỗi catch --->>>>> error :', error);
    }
  }, [user.user._id, imageAvatarPath]);

  const handleCoverUpdate = useCallback(async () => {
    const data = {
      coverImage: JSON.stringify(imageCoverPath),
    };
    try {
      if (imageCoverPath) {
        setLoading(true);
        const res = await updateCover(user.user._id, data);
        // console.log('>>>> upload avatar thành công !', res);
        navigation.navigate('HomeStackScreen');
      } else {
        setLoading(false);
        // console.log('Không có hình ảnh để cập nhật');
      }
    } catch (error) {
      setLoading(false);
      // console.error('Lỗi catch --->>>>> error :', error);
    }
  }, [user.user._id, imageCoverPath]);

  useEffect(() => {
    handleAvatarUpdate();
  }, [user.user._id, imageAvatarPath]);

  useEffect(() => {
    handleCoverUpdate();
  }, [user.user._id, imageCoverPath]);

  return (
    <View style={styles.body}>
      <View style={styles.profileFrame}>
        <TouchableOpacity onPress={() => setModalVisibleCover(true)}>
          <Image
            style={styles.imgCover}
            source={
              user && user.user.coverImage
                ? {uri: user.user.coverImage}
                : require('../../../../assets/account.png')
            }
          />
          {imageCover.map((coverImage, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCoverUpdate(coverImage)}>
              <Image style={styles.imgCover} source={{uri: coverImage.uri}} />
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisibleAvatar(true)}>
          <Image
            style={styles.imgAvatar}
            source={
              user && user.user.avatar
                ? {uri: user.user.avatar}
                : require('../../../../assets/account.png')
            }
          />
          {imageAvatar.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAvatarUpdate(avatar)}>
              <Image style={styles.imgAvatar} source={{uri: avatar.uri}} />
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
        <Text style={styles.textName}>{user ? user.user.name : ''}</Text>
        {/* <TouchableOpacity onPress={handleModelOpen} style={styles.btnIntroduce}>
          <Text style={styles.textIntroduce}>Cập nhật giới thiệu bản thân</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.btnEditProfile}>
          <Image
            style={styles.imgEdit}
            source={require('../../../../assets/icon_edit.png')}
          />
          <Text style={styles.txtEdit}>Chỉnh sửa trang cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.editFrame}>
          <Image source={require('../../../../assets/icon_back.png')} />
          <TouchableOpacity style={styles.btnMore}>
            <Image source={require('../../../../assets/icon_more.png')} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCover}
        onRequestClose={() => {}}>
        <View style={styles.modalContainerCoverImg}>
          <TouchableOpacity style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/account.png')}
            />
            <Text style={styles.txtShowImg}>Xem ảnh bìa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCameraCover} style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_camera_comment.png')}
            />
            <Text style={styles.txtShowImg}>Chụp ảnh mới</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openLibraryCover}
            style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_image.png')}
            />
            <Text style={styles.txtShowImg}>Chọn ảnh trên máy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => setModalVisibleCover(false)}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_delete.png')}
            />
            <Text style={styles.txtCancel}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleAvatar}
        onRequestClose={() => {}}>
        <View style={styles.modalContainerAvatar}>
          <TouchableOpacity style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/account.png')}
            />
            <Text style={styles.txtShowImg}>Xem ảnh đại diện</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera} style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_camera_comment.png')}
            />
            <Text style={styles.txtShowImg}>Chụp ảnh mới</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openLibrary} style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_image.png')}
            />
            <Text style={styles.txtShowImg}>Chọn ảnh trên máy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => setModalVisibleAvatar(false)}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_delete.png')}
            />
            <Text style={styles.txtCancel}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainerYourself}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.btnBackyourself}
              onPress={() => setModalVisible(!modalVisible)}>
              <Image
                style={styles.imgAvt}
                source={require('../../../../assets/icon_back.png')}
              />
              <Text style={styles.textStyle}>Chỉnh sửa lời giới thiệu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default Profile;
