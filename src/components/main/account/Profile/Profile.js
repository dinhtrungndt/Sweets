import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import React, {useContext, useState, useCallback, useEffect} from 'react';
import {UserContext} from '../../../../contexts/user/userContext';
import AxiosInstance from '../../../../helper/Axiosinstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAvatar, updateCover} from '../../../../services/user/userService';
// style
import {styles} from '../style/profile';
// library
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {uploadImageStatus} from '../../../../services/home/homeService';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostScreen from './TopTab/PostScreen';
import ImgScreen from './TopTab/ImgScreen';
import MyStoryScreen from './TopTab/MyStoryScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

const Tab = createMaterialTopTabNavigator();

const Profile = props => {
  const {navigation} = props;
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [imageAvatar, setImageAvatar] = useState([]);
  const [imageAvatarPath, setImageAvatarPath] = useState(null);
  const [modalVisibleAvatar, setModalVisibleAvatar] = useState(false);
  const [imageCover, setImageCover] = useState([]);
  const [imageCoverPath, setImageCoverPath] = useState(null);
  const [modalVisibleCover, setModalVisibleCover] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);
  const [friendsList, setFriendsList] = useState([]);

  const {user, setUser} = useContext(UserContext);
  // console.log('>>>>>>>>>>>>>> user', user);

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
        formData.append('media', image);
      });

      const data = await uploadImageStatus(formData);
      setImageAvatarPath(data.urls);
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
        formData.append('media', image);
      });

      const data = await uploadImageStatus(formData);
      setImageCoverPath(data.urls);
    }
  }, []);

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
    setModalVisibleCover(false);
  }, []);

  const handleAvatarUpdate = useCallback(async () => {
    try {
      if (imageAvatarPath) {
        setLoading(true);
        const res = await updateAvatar(user.user._id, {
          avatar: JSON.stringify(imageAvatarPath),
        });
        setLoading(false);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Cập nhật ảnh đại diện thành công !',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error updating avatar:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Cập nhật ảnh đại diện thất bại !',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  }, [user.user._id, imageAvatarPath]);

  const handleCoverUpdate = useCallback(async () => {
    try {
      if (imageCoverPath) {
        setLoading(true);
        const res = await updateCover(user.user._id, {
          coverImage: JSON.stringify(imageCoverPath),
        });
        setLoading(false);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Cập nhật ảnh bìa thành công !',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error('Error updating cover:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Cập nhật ảnh bìa thất bại !',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
  }, [user.user._id, imageCoverPath]);

  useEffect(() => {
    handleAvatarUpdate();
  }, [handleAvatarUpdate]);

  useEffect(() => {
    handleCoverUpdate();
  }, [handleCoverUpdate]);

  useEffect(() => {
    const fetchFriendsCount = async () => {
      try {
        const axiosInstance = AxiosInstance();
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await axiosInstance.get(`/friend/friends/${userId}`);
          // console.log('Danh sách bạn bè:', response);
          if (response.friendsList) {
            const {friendsList} = response; // Truy cập trực tiếp vào 'friendsList'
            setFriendsList(friendsList);
            setFriendsCount(friendsList.length);
          } else {
            console.log(
              'Không tìm thấy danh sách bạn bè trong phản hồi từ server',
            );
          }
        } else {
          console.log('Không tìm thấy userId trong AsyncStorage');
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bạn bè:', error);
      }
    };
    fetchFriendsCount();
  }, []);

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
          <View style={styles.boderCamera}>
            <Entypo
              name="camera"
              size={24}
              color={'#000000'}
              style={styles.iconCamera}
            />
          </View>
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
          <View style={styles.boderCameraAvatar}>
            <Entypo
              name="camera"
              size={18}
              color={'#000000'}
              style={styles.iconCamera}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.textName}>{user ? user.user.name : ''}</Text>
        <View style={styles.containerFriends}>
          <Text style={styles.txtFriendsNumber}>{friendsCount}</Text>
          <Text style={styles.txtFriends}>{t('friends')}</Text>
        </View>
        <TouchableOpacity style={styles.btnIntroduce}>
          <Image
            style={styles.imgEdit}
            source={require('../../../../assets/icon_add_32.png')}
          />
          <Text style={styles.textIntroduce}>{t('addToNews')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile', {user: user})}
          style={styles.btnEditProfile}>
          <Image
            style={styles.imgEdit}
            source={require('../../../../assets/icon_edit_24.png')}
          />
          <Text style={styles.txtEdit}>{t('editProfile')}</Text>
        </TouchableOpacity>
        <View style={styles.editFrame}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={30}
              color={'#000000'}
              style={styles.imgBack}
            />
          </TouchableOpacity>
        </View>
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
            <Text style={styles.txtShowImg}>{t('seeCoverPhoto')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCameraCover} style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_camera_comment.png')}
            />
            <Text style={styles.txtShowImg}>{t('takeNewPhoto')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openLibraryCover}
            style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_image.png')}
            />
            <Text style={styles.txtShowImg}>{t('chooseFromYourDevice')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => setModalVisibleCover(false)}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_delete.png')}
            />
            <Text style={styles.txtCancel}>{t('cancel')}</Text>
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
            <Text style={styles.txtShowImg}>{t('seeProfilePicture')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera} style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_camera_comment.png')}
            />
            <Text style={styles.txtShowImg}>{t('takeNewPhoto')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openLibrary} style={styles.btnShowImg}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_image.png')}
            />
            <Text style={styles.txtShowImg}>{t('chooseFromYourDevice')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => setModalVisibleAvatar(false)}>
            <Image
              style={styles.imgAvt}
              source={require('../../../../assets/icon_delete.png')}
            />
            <Text style={styles.txtCancel}>{t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#22b6c0',
          tabBarInactiveTintColor: '#bdc3c7',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
            textTransform: 'none',
          },
          tabBarItemStyle: {
            width: 'auto',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#22b6c0',
          },
          tabBarStyle: {
            backgroundColor: '#FFF',
            elevation: 1,
            marginTop: 6,
          },
        }}>
        <Tab.Screen name="Bài viết" component={PostScreen} />
        <Tab.Screen name="Ảnh" component={ImgScreen} />
        <Tab.Screen name="Story" component={MyStoryScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default Profile;
