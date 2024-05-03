/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  ScrollView,
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
  addBackgroundColor,
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
import Geolocation from 'react-native-geolocation-service';
import TabFriendUpLoad from './tags';
import ModelBackground from './background';
import AxiosInstance from '../../../../../helper/AxiosWeather';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useTranslation} from 'react-i18next';
import EmojiPicker from 'react-native-emoji-picker';

export function AddsScreen({route, navigation}) {
  const {user} = useContext(UserContext);
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState([]);
  const numColumns = 4;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleTab, setModalVisibleTab] = useState(false);
  const [modalBackground, setModalBackground] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const [imagePath, setImagePath] = useState(null);
  const [upload, setUpload] = useState(false);
  const [_idPosts, setIdPosts] = useState(null);
  const idPostsUp = _idPosts;
  const [loading, setLoading] = useState(false);
  const selectedId = route.params?.selectedId;
  const idObjectValue =
    selectedId && selectedId._id ? selectedId._id : '65b1fe1be09b1e99f9e8a235';
  const [tagSelectedUser, setTagSelectedUser] = useState(null);
  const [selectColor, setSelectColor] = useState(undefined);
  const [location, setLocation] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const {t} = useTranslation();
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [emojiVisible, setEmojiVisible] = useState(false);

  // console.log('>>>>> idObjectValue: ' + idObjectValue);
  // console.log('>>>>> location: ' + JSON.stringify(location));

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
          // console.log('>>>>>>> response -> handleUploadMedia', response);
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

      // console.log(' tagSelectedUser:', tagSelectedUser?.id);
      if (inputText && imagePath) {
        await Promise.all([
          handleUploadMedia(idPostsUp),
          handleUploadPost(idPostsUp, tagSelectedUser, locationData),
          handleUploadColor(idPostsUp),
        ]);
      } else if (inputText) {
        await handleUploadPost(idPostsUp, tagSelectedUser, locationData);
        await handleUploadColor(idPostsUp);
      } else if (inputText === '') {
        await Promise.all([
          handleUploadMedia(idPostsUp),
          handleUploadPost(idPostsUp, tagSelectedUser, locationData),
        ]);
      } else if (imagePath) {
        await handleUploadMedia(idPostsUp);
      } else {
        return;
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
    async (idPostsUp, tagSelectedUser, locationData) => {
      // if (!user || !inputText) {
      //   return;
      // }

      try {
        // console.log('tagSelectedUser in tagSelectedUser:', tagSelectedUser?.id);
        const tab = tagSelectedUser?.id;
        const postDetails = {
          _id: _idPosts === null ? idPostsUp : _idPosts,
          content: inputText || '',
          createAt: new Date().toISOString(),
          idObject: route.params?.selectedId?._id || idObjectValue,
          idTypePosts: '65b20030261511b0721a9913',
          taggedFriends: tagSelectedUser ? tab : null,
          location: locationData || null,
        };

        // console.log(' >>>>>>>>>>>>>>>> postDetails:', postDetails);

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
    },
    [user, inputText, route.params?.selectedId],
  );

  const handleUploadColor = useCallback(
    async idPostsUp => {
      try {
        // console.log('>>>>>>>selectColor innn handleUploadColor', selectColor);
        const color = selectColor;
        const response = await addBackgroundColor(
          user.user._id,
          _idPosts === null ? idPostsUp : _idPosts,
          color,
        );
        // console.log('>>>>>>>>>>>>>>>>>>>> Data 59 data', response);
      } catch (error) {
        console.error('Lỗi ở handleUploadColor nè', error);
      }
    },
    [selectColor],
  );

  const requestLocationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        // Quyền đã được cấp, lấy vị trí
        getLocation();
      } else {
        // Quyền chưa được cấp, yêu cầu quyền
        const permissionResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (permissionResult === RESULTS.GRANTED) {
          getLocation();
        } else {
          console.warn('Quyền truy cập vị trí bị từ chối.');
          Alert.alert('Lỗi', 'Có lỗi xảy ra khi truy cập định vị của bạn.');
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra quyền truy cập vị trí:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi truy cập định vị của bạn.');
      setLoading(false);
    }
  };

  const getLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
          fetchLocationData(latitude, longitude);
        },
        error => {
          console.error('Lỗi khi lấy vị trí:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (error) {
      console.error('Lỗi khi lấy vị trí:', error);
    }
  };

  const fetchLocationData = async (lat, lon) => {
    try {
      setLoading(true);
      const response = await AxiosInstance().get(
        `weather?lat=${lat}&lon=${lon}&appid=b0e86008293e7c25b2deb2caa5a36b0c`,
      );

      // console.log('Locationnnnn Data:', response.name);
      setLocationData(response.name);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu check in:', error);
      Alert.alert(
        'Lỗi',
        'Có lỗi xảy ra khi lấy dữ liệu checkin. Vui lòng kiểm tra lại định vị của bạn.',
      );
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await requestLocationPermission();
    } catch (error) {
      console.error('Lỗi khi check in:', error);
    }
  };

  const isImage = url => {
    return /\.(jpeg|jpg|png)$/i.test(url);
  };

  const isVideo = url => {
    return /\.(mp4|avi|mov)$/i.test(url);
  };

  const handleLiveStream = (isStream, liveID) => {
    navigation.navigate('LiveStreamHost', {isStream, liveID});
  };

  const handleEmojiSelect = emoji => {
    setSelectedEmoji(emoji);
    setInputText(prevText => prevText + emoji);
  };

  useEffect(() => {
    const dateString = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000000);
    const dateNumber = new Date(dateString);
    const _idPosts = dateNumber.getTime().toString() + randomSuffix.toString();
    setIdPosts(_idPosts);
    // console.log('useEffectuseEffect _idPosts:', _idPosts);
  }, []);
  // console.log('_idPosts ở ngoài:', _idPosts);

  useEffect(() => {
    setTagSelectedUser(tagSelectedUser);
  }, [tagSelectedUser]);

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
        <Text style={styles.textHeader}>{t('createPost')}</Text>
        <TouchableOpacity
          onPress={handlePostUpload}
          style={[
            styles.upHeaderButton,
            {backgroundColor: inputText || imagePath ? '#7ec1a5' : '#CBCBCB'},
          ]}>
          <Text style={styles.textHeaderUp}>{t('post')}</Text>
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
            {tagSelectedUser === null ? (
              <Text style={styles.body_name}>{user.user.name}</Text>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.body_name}>{user.user.name}</Text>
                <Text
                  style={{
                    fontSize: 14,
                  }}>
                  {' '}
                  cùng với
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '30%',
                  }}
                  onPress={() =>
                    navigation.navigate('OtherUserA', {
                      accountzzz: tagSelectedUser,
                    })
                  }>
                  <Text
                    style={[
                      styles.body_name,
                      {color: '#22b6c0', marginLeft: 5},
                    ]}>
                    {tagSelectedUser?.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {locationData === null ? null : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                  }}>
                  {' '}
                  đang ở tại
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.body_name,
                      {color: '#22b6c0', marginLeft: 5},
                    ]}>
                    {locationData}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
                    <Text style={styles.body_chedo_text}> {t('public')} </Text>
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
            style={[
              selectColor
                ? {backgroundColor: selectColor}
                : styles.body_content_input,
            ]}
            placeholder="Bạn đang nghĩ gì?"
            multiline={true}
            onChangeText={handleInputChange}
            value={inputText}
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
              {t('photo')}/video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boder_image}
            onPress={() => setModalVisibleTab(true)}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../assets/user_tag_25px.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Gắn thẻ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boder_image}
            onPress={() => {
              setEmojiVisible(true);
            }}>
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
              onPress={() => {
                openLibrary();
                hideBottomSheet();
              }}
              style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_image.png')}
              />
              <Text style={styles.bottomSheetText}>{t('photo')}/video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={() => {
                setModalVisibleTab(true);
                hideBottomSheet();
              }}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/user_tag_25px.png')}
              />
              <Text style={styles.bottomSheetText}>{t('tagOthers')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={() => {
                setEmojiVisible(true);
                hideBottomSheet();
              }}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_feeling.png')}
              />
              <Text style={styles.bottomSheetText}>
                {t('emotions/activity')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              // onPress={() => {
              //   handleCheckIn();
              //   hideBottomSheet();
              // }}
            >
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_checkin.png')}
              />
              <Text style={styles.bottomSheetText}>Check in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={() => handleLiveStream(true, user.id)}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_live.png')}
              />
              <Text style={styles.bottomSheetText}>{t('liveVideo')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalBackground(true);
                hideBottomSheet();
              }}
              style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../assets/icon_text.png')}
              />
              <Text style={styles.bottomSheetText}>{t('backgroundColor')}</Text>
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
      {emojiVisible && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <EmojiPicker
            onEmojiSelected={emoji => handleEmojiSelect(emoji)}
            showSearchBar={false}
            showSectionTitles={false}
            showTabs={false}
            style={{
              height: 300,
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}
          />
          <TouchableOpacity onPress={() => setEmojiVisible(false)}>
            <Image
              style={styles.headerIcon}
              source={require('../../../../../assets/icon_delete.png')}
            />
          </TouchableOpacity>
        </View>
      )}
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
      {/* modal tab */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleTab}
        onRequestClose={() => {}}>
        <TouchableOpacity
          style={[styles.modalContainer, {padding: 0}]}
          onPressOut={() => setModalVisibleTab(false)}>
          <TabFriendUpLoad
            getSelectTag={selectedUser => {
              setTagSelectedUser(selectedUser.selectedUser);
            }}
            cancel={() => setModalVisibleTab(false)}
            navigation={navigation}
          />
        </TouchableOpacity>
      </Modal>
      {/* modal background */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalBackground}
        onRequestClose={() => {}}>
        <View style={styles.modalContainerColor}>
          <ModelBackground
            getSelectColor={selectedColor => {
              setSelectColor(selectedColor.selectedColor);
            }}
            cancel={() => setModalBackground(false)}
          />
        </View>
      </Modal>
    </View>
  );
}
