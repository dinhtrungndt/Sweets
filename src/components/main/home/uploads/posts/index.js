/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';

import {styles} from '../styles/posts';
import {UserContext} from '../../../../../contexts/user/userContext';
import {
  uploadImageStatus,
  uploadMedia,
  uploadPost,
} from '../../../../../services/home/homeService';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {CommonActions} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VideoPlayer from 'react-native-video-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';

export function AddsScreen({route, navigation}) {
  const {user} = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState([]);
  const numColumns = 4;
  const [modalVisible, setModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const [imagePath, setImagePath] = useState(null);
  const [upload, setUpload] = useState(false);
  const [_idPosts, setIdPosts] = useState(null);
  const idPostsUp = _idPosts;
  const [loading, setLoading] = useState(false);
  const selectedId = route.params?.selectedId;
  const idObjectValue =
    selectedId && selectedId._id ? selectedId._id : '65b1fe1be09b1e99f9e8a235';

  console.log('>>>>> idObjectValue: ' + idObjectValue);

  const idObject = () => [
    {
      _id: '65b1fe1be09b1e99f9e8a235',
      name: 'Công khai',
      icon: 'https://res.cloudinary.com/dqo8whkdr/image/upload/v1711327221/f4yxj5cnlrnlpginqfpp.png',
    },
    {
      _id: '65b1fe6dab07bc8ddd7de469',
      name: 'Bạn bè',
      icon: 'https://res.cloudinary.com/dqo8whkdr/image/upload/v1711327699/ouv89aqjnoshfp5nncpg.png',
    },
    {
      _id: '65b1fe77ab07bc8ddd7de46c',
      name: 'Chỉ mình tôi',
      icon: 'https://res.cloudinary.com/dqo8whkdr/image/upload/v1711327910/afewyfgqi6g3l6lbpvpm.png',
    },
  ];

  const takePhoto = useCallback(async response => {
    if (response.didCancel || response.errorCode || response.errorMessage) {
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const selectedImages = response.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      }));
      setImage(selectedImages);

      // console.log('>>>>>>>>>>>>>>>>>>>> Data 59 data', selectedImages);
      const formData = new FormData();

      selectedImages.forEach((image, index) => {
        formData.append('media', image);
      });
      setLoading(true);
      const data = await uploadImageStatus(formData);
      // console.log('>>>>>>>>>>>>>>>>>>>> Data 59 data', data);

      const mediaArray = data.urls.map(url => {
        const type =
          url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png')
            ? 'image'
            : url.endsWith('.mp4')
            ? 'video'
            : 'unknown';
        return {url: url, type: type};
      });

      setImagePath(mediaArray.map(item => item.url));
      setLoading(false);
    }
  }, []);

  const openCamera = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchCamera(options, takePhoto);
  }, []);

  const openLibrary = useCallback(async () => {
    const options = {
      mediaType: 'mixed',
      quality: 5,
      saveToPhotos: true,
      selectionLimit: 0,
      multiple: true,
    };
    await launchImageLibrary(options, takePhoto);
    setModalVisible(false);
  }, []);

  const handleInputChange = text => {
    setInputText(text || '');
  };

  const showBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const hideBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const handleUploadMedia = useCallback(async idPostsUp => {
    try {
      const mediaArray = imagePath.map(image => {
        const type =
          image.endsWith('.jpg') ||
          image.endsWith('.jpeg') ||
          image.endsWith('.png')
            ? 'image'
            : image.endsWith('.mp4')
            ? 'video'
            : 'unknown';
        return {url: image, type: type};
      });

      await Promise.all(
        mediaArray.map(async media => {
          const idUp = _idPosts === null ? idPostsUp : _idPosts;
          const response = await uploadMedia(idUp, media);
          console.log('>>>>>>> response -> handleUploadMedia', response);
        }),
      );
    } catch (error) {
      console.log('>>>>>>> Lỗi ở HandleUploadMedia nè', error);
    }
  });
  // console.log('>>>>>>> hình ở imagePath nè', imagePath);

  const handlePostUpload = async () => {
    try {
      if (!inputText && !imagePath) {
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

      if (inputText && imagePath) {
        await Promise.all([
          handleUploadMedia(idPostsUp),
          handleUploadPost(idPostsUp),
        ]);
      } else if (inputText) {
        await handleUploadPost(idPostsUp);
      } else if (inputText === '') {
        await Promise.all([
          handleUploadMedia(idPostsUp),
          handleUploadPost(idPostsUp),
        ]);
      } else if (imagePath) {
        await handleUploadMedia(idPostsUp);
      }

      if (!upload) {
        navigation.navigate('HomeScreen');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Đăng bài viết thành công !',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Đăng bài viết thất bại',
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

  const handleUploadPost = useCallback(
    async idPostsUp => {
      // if (!user || !inputText) {
      //   return;
      // }

      try {
        console.log('_idPosts ID in handleUploadPost:', _idPosts);
        const postDetails = {
          _id: _idPosts === null ? idPostsUp : _idPosts,
          content: inputText || '',
          createAt: new Date().toISOString(),
          idObject: idObjectValue,
          idTypePosts: '65b20030261511b0721a9913',
        };

        console.log(' >>>>>>>>>>>>>>>> postDetails:', postDetails);

        const response = await uploadPost(user.user._id, postDetails);
        setUpload(response);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'HomeStackScreen'}],
          }),
        );
        console.log(' >>>>>>>>>>>>>>>> Đăng thành công:', response);
      } catch (error) {
        console.error('Lỗi catch --->>>>> error :', error);
      }
    },
    [user, inputText],
  );

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve({latitude, longitude});
        },
        error => reject(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    });
  };

  const handleCheckIn = async () => {
    try {
      const location = await getCurrentLocation();
      console.log('Current location:', location);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const isImage = url => {
    return /\.(jpeg|jpg|png)$/i.test(url);
  };

  const isVideo = url => {
    return /\.(mp4|avi|mov)$/i.test(url);
  };

  useEffect(() => {
    const dateString = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000000);
    const dateNumber = new Date(dateString);
    const _idPosts = dateNumber.getTime().toString() + randomSuffix.toString();
    setIdPosts(_idPosts);
    console.log('useEffectuseEffect _idPosts:', _idPosts);
  }, []);
  console.log('_idPosts ở ngoài:', _idPosts);

  // useEffect(() => {
  //   handleUploadPost();
  // }, [user]);

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.headerIcon}
            source={require('../../../../../assets/icon_delete.png')}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Tạo bài viết</Text>
        <TouchableOpacity
          onPress={handlePostUpload}
          style={[
            styles.upHeaderButton,
            {backgroundColor: inputText || imagePath ? '#7ec1a5' : '#CBCBCB'},
          ]}>
          <Text style={styles.textHeaderUp}>Đăng</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.lineHr} />
      {/* body */}
      <View style={styles.body}>
        {/* chedo_congkhai */}
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.body_avatar} source={{uri: user.user.avatar}} />
          <View style={styles.body_content}>
            {/* name */}
            <Text style={styles.body_name}>{user.user.name}</Text>
            {/* {console.log('user post', user.user.name)} */}
            <View style={{flexDirection: 'row'}}>
              {/* congkhai */}
              <TouchableOpacity
                style={styles.body_chedo}
                onPress={() =>
                  navigation.navigate('SelectScreenUp', {idObject: idObject()})
                }>
                {selectedId?.name === undefined ? (
                  <>
                    <Image
                      style={styles.body_chedo_icon}
                      source={require('../../../../../assets/upstory_world_icon.png')}
                    />
                    <Text style={styles.body_chedo_text}> Công khai </Text>
                  </>
                ) : (
                  <>
                    <Image
                      style={styles.body_chedo_icon}
                      source={{uri: selectedId?.icon}}
                    />
                    <Text style={styles.body_chedo_text}>
                      {' '}
                      {selectedId?.name}{' '}
                    </Text>
                  </>
                )}
                <MaterialIcons
                  name={'navigate-next'}
                  size={18}
                  color={'#0062c9'}
                  left={95}
                  position={'absolute'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Content */}
        <View style={{height: 570}}>
          <TextInput
            style={styles.body_content_input}
            placeholder="Bạn đang nghĩ gì?"
            multiline={true}
            onChangeText={handleInputChange}
          />
          {image.length > 0 && (
            <>
              {loading ? (
                <ActivityIndicator size="small" color="#22b6c0" />
              ) : (
                <FlatList
                  style={{marginTop: 10}}
                  data={image}
                  numColumns={numColumns}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity key={index}>
                      {isImage(item.uri) ? (
                        <Image
                          source={{uri: item.uri}}
                          style={{
                            width:
                              Dimensions.get('window').width / numColumns - 10,
                            height:
                              Dimensions.get('window').width / numColumns - 10,
                            margin: 5,
                            borderRadius: 5,
                          }}
                        />
                      ) : isVideo(item.uri) ? (
                        <VideoPlayer
                          key={index}
                          video={{uri: item.uri}}
                          videoWidth={1600}
                          videoHeight={900}
                          thumbnail={require('../../../../../assets/play_96px.png')}
                          style={{
                            width:
                              Dimensions.get('window').width / numColumns - 10,
                            height:
                              Dimensions.get('window').width / numColumns - 10,
                            margin: 5,
                            borderRadius: 5,
                          }}
                        />
                      ) : null}
                    </TouchableOpacity>
                  )}
                />
              )}
            </>
          )}
        </View>
        {/* bottom sheet */}
        <View style={styles.pick_feelings}>
          <TouchableOpacity onPress={openLibrary} style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../assets/icon_image.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10, color: '#000'}}>
              Ảnh/video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../assets/user_tag_25px.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Gắn thẻ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../assets/icon_feeling.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Cảm xúc</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showBottomSheet}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../assets/icon_more.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet */}
        {bottomSheetVisible && (
          <View style={styles.bottomSheet}>
            <TouchableOpacity
              onPress={openLibrary}
              style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_image.png')}
              />
              <Text style={styles.bottomSheetText}>Ảnh/video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/user_tag_25px.png')}
              />
              <Text style={styles.bottomSheetText}>Gắn thẻ người khác</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_feeling.png')}
              />
              <Text style={styles.bottomSheetText}>Cảm xúc/hoạt động</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={handleCheckIn}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_checkin.png')}
              />
              <Text style={styles.bottomSheetText}>Check in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_live.png')}
              />
              <Text style={styles.bottomSheetText}>Video trực tiếp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_text.png')}
              />
              <Text style={styles.bottomSheetText}>Màu nền</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideBottomSheet}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#0962c9',
                  fontFamily: 'Roboto',
                  fontWeight: '700',
                  marginLeft: 5,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* modal  */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text onPress={openCamera}>Chụp ảnh</Text>
            <Text onPress={openLibrary}>Chọn ảnh</Text>
            <Text onPress={() => setModalVisible(false)}>Cancel</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
