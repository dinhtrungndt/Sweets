/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Button,
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
import {styles} from '../../styles/selectFeeingStory';

// library
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import LabelPickStory from './label';
import {
  uploadImageStatus,
  uploadMedia,
  uploadPost,
} from '../../../../../../services/home/homeService';
import MusicScreen from './music';
import {Overlay} from 'react-native-elements';
import SettingStoryObjects from '../../../../../../utils/settingStoryObjects';
import UpImageStory from './upImage';
import Toast from 'react-native-toast-message';
import {UserContext} from '../../../../../../contexts/user/userContext';
import {CommonActions} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-player';
import {LoadingScreen} from '../../../../../../utils/loading';
import ImagePicker from 'react-native-image-crop-picker';

const SelectFeeingStory = ({cancel, navigation}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openModelSettingObjects, setOpenModelSettingObjects] = useState(false);
  const [openModelLabel, setOpenModelLabel] = useState(false);
  const [openModelMusic, setOpenModelMusic] = useState(false);
  const [openModelBoom, setOpenModelBoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImageURI, setSelectedImageURI] = useState(null);
  const [_idPosts, setIdPosts] = useState(null);
  const [upload, setUpload] = useState(false);
  const {user} = useContext(UserContext);
  const [imagePath, setImagePath] = useState(null);
  const [imageCloud, setImageCloud] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingPickImage, setLoadingPickImage] = useState(false);

  const handleCloseBoom = () => {
    setOpenModelBoom(false);
  };

  const listImage = async () => {
    try {
      setLoading(true);
      const directoryPath = RNFS.PicturesDirectoryPath;
      const files = await RNFS.readDir(directoryPath);
      const imageFiles = files.filter(
        file =>
          file.isFile() &&
          (file.name.endsWith('.jpg') || file.name.endsWith('.mp4')),
      );

      const imageURIs = await Promise.all(
        imageFiles.map(async file => {
          const destPath = RNFS.CachesDirectoryPath + '/' + file.name;
          await RNFS.copyFile(file.path, destPath);
          return {
            name: file.name,
            type: file.name.endsWith('.jpg') ? 'image/jpeg' : 'video/mp4',
            uri: 'file://' + destPath,
          };
        }),
      );

      setSelectedImages(imageURIs);
      // console.log('>>>>>>>>>>>>>>>>>>>> uuuuuuuuuuuuuu', imageURIs);

      setLoading(false);
    } catch (error) {
      console.log('Lỗi tải ảnh:', error);
    }
  };

  const handleOpenPickLibrary = async () => {
    try {
      const options = {
        mediaType: 'mixed',
        quality: 1,
        includeBase64: false,
        selectionLimit: 10,
      };

      launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('Người dùng đã hủy chọn thêm ảnh');
        } else if (response.errorCode) {
          console.log('Lỗi chọn ảnh: ', response.errorCode);
        } else {
          for (const asset of response.assets) {
            const destPath = `${RNFS.PicturesDirectoryPath}/${asset.fileName}`;
            const pathExists = selectedImages.some(
              image => image.uri === `file://${destPath}`,
            );
            if (!pathExists) {
              setLoadingPickImage(true);
              await RNFS.copyFile(asset.uri, destPath);
              setSelectedImages(prevImages => [
                ...prevImages,
                {
                  name: asset.fileName,
                  type: asset.type,
                  uri: `file://${destPath}`,
                },
              ]);
              setLoadingPickImage(false);
            } else {
              console.log('Đường dẫn đã tồn tại trong mảng selectedImages');
            }
          }
        }
      });
    } catch (error) {
      console.log('Lỗi mở thư viện chọn ảnh: ', error);
    }
  };

  // console.log('>>>>>>>> imagePath', imagePath);

  const handleImagePress = async index => {
    setLoadingImage(true);
    setSelectedImageIndex(index);
    setSelectedImageURI(selectedImages[index].uri);

    const formData = new FormData();
    formData.append('media', selectedImages[index]);
    const data = await uploadImageStatus(formData);
    // console.log('>>>>>>>>>>>>>>>>>>>> Data 56669 data', data);
    setImageCloud(data.urls.join());
    setModalVisible(true);
    setLoadingImage(false);
  };

  const takePhoto = useCallback(async response => {
    if (response.didCancel || response.errorCode || response.errorMessage) {
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const selectedImage = response.assets[0];
      const formData = new FormData();
      formData.append('media', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName,
      });
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
      handleUploadMedia(imageCloud);
    }
  }, []);

  const openCamera = useCallback(async () => {
    const options = {
      mediaType: 'mixed',
      quality: 1,
      saveToPhotos: true,
    };
    await launchCamera(options, takePhoto);
  }, []);

  console.log(' -----------------> imageCloud', imageCloud);

  const handleUploadMedia = useCallback(async imageCloud => {
    try {
      if (!_idPosts || !imageCloud) {
        return;
      }
      const media = {
        url: imageCloud,
        type:
          imageCloud.endsWith('.jpg') ||
          imageCloud.endsWith('.jpeg') ||
          imageCloud.endsWith('.png')
            ? 'image'
            : imageCloud.endsWith('.mp4')
            ? 'video'
            : 'unknown',
      };

      // console.log(' -----------------> mediamediamedia', media);
      const response = await uploadMedia(_idPosts, media);
      // console.log('>>>>>>> response -> handleUploadMedia', response);
    } catch (error) {
      console.log('>>>>>>> Lỗi ở HandleUploadMedia nè', error);
    }
  });

  const handlePostUpload = async imageCloud => {
    try {
      if (!imageCloud) {
        return Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Bạn chưa chọn ảnh',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }
      console.log('_idPosts  handlePostUpload _idPosts:', _idPosts);

      await Promise.all([
        handleUploadPost(_idPosts),
        handleUploadMedia(imageCloud),
      ]);

      if (!upload) {
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
  // console.log('_idPosts  out _idPosts:', _idPosts);

  const handleUploadPost = useCallback(
    async _idPosts => {
      if (!user) {
        return;
      }

      try {
        const postDetails = {
          _id: _idPosts,
          content: 'upload',
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
        console.error('Lỗi catch --->>>>> error storry :', error);
      }
    },
    [user],
  );

  useEffect(() => {
    const dateString = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000000);
    const dateNumber = new Date(dateString);
    const _idPosts = dateNumber.getTime().toString() + randomSuffix.toString();
    setIdPosts(_idPosts);
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Quyền truy cập đã được cấp.');
      } else {
        console.log('Quyền truy cập bị từ chối.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const isImage = url => {
    return /\.(jpeg|jpg|png)$/i.test(url);
  };

  const isVideo = url => {
    return /\.(mp4|avi|mov)$/i.test(url);
  };

  // console.log('>>>>>selectedImageURI', selectedImageURI);
  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    listImage();
  }, []);

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancel} onPress={cancel}>
          <AntDesign name={'close'} color={'#000'} size={23} />
        </TouchableOpacity>
        <Text style={styles.text_taotin}>Tạo tin</Text>
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => setOpenModelSettingObjects(true)}>
          <MaterialCommunityIcons
            name={'account-cog-outline'}
            color={'#000'}
            size={25}
          />
        </TouchableOpacity>
      </View>
      {loadingImage ? (
        <ActivityIndicator size="small" color="#22b6c0" />
      ) : (
        <>
          {/* body */}
          <ScrollView style={{marginBottom: 10}}>
            <View style={styles.body}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {/* văn bản */}
                <TouchableOpacity
                  style={styles.typingFeeting}
                  onPress={() => setOpenModelLabel(true)}>
                  <View style={styles.typingFeeting_in_VItext}>
                    <Ionicons name={'text-outline'} color={'#000'} size={25} />
                  </View>
                  <Text style={styles.typingFeeting_in_text}>Văn bản</Text>
                </TouchableOpacity>

                {/* Music */}
                <TouchableOpacity
                  onPress={() => setOpenModelMusic(true)}
                  style={[
                    styles.typingFeeting,
                    {marginLeft: 0, marginRight: 7, backgroundColor: '#29CBB8'},
                  ]}>
                  <View style={styles.typingFeeting_in_VItext}>
                    <FontAwesome name={'music'} color={'#000'} size={25} />
                  </View>
                  <Text style={styles.typingFeeting_in_text}>Nhạc</Text>
                </TouchableOpacity>

                {/* Boomerang */}
                <TouchableOpacity
                  onPress={() => setOpenModelBoom(true)}
                  style={[
                    styles.typingFeeting,
                    {marginLeft: 0, backgroundColor: '#E7A966'},
                  ]}>
                  <View style={styles.typingFeeting_in_VItext}>
                    <Ionicons name={'text-outline'} color={'#000'} size={25} />
                  </View>
                  <Text style={styles.typingFeeting_in_text}>Boomerang</Text>
                </TouchableOpacity>
              </ScrollView>
              {openModelBoom && (
                <Overlay>
                  <View style={{padding: 15}}>
                    <Text h4 style={{paddingBottom: 15}}>
                      Tính năng này đang được phát triển...
                    </Text>
                    <Button
                      title="Đóng"
                      onPress={handleCloseBoom}
                      color={'#22b6c0'}
                    />
                  </View>
                </Overlay>
              )}
            </View>
            {/* footer */}
            <View style={styles.footer}>
              {/* Library */}
              <View style={styles.rowPickImage}>
                <TouchableOpacity style={styles.library_container}>
                  <Text style={styles.library_text}>Cuộn camera</Text>
                  <Entypo
                    name={'chevron-small-down'}
                    color={'#000'}
                    size={22}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.pickImage_container}
                  onPress={handleOpenPickLibrary}>
                  <Entypo name={'folder-images'} color={'#000'} size={18} />
                  <Text style={[styles.library_text, {paddingLeft: 7}]}>
                    Chọn nhiều file
                  </Text>
                </TouchableOpacity>
              </View>
              {/* List of selected images and video */}
              {loading ? (
                <ActivityIndicator size="small" color="#22b6c0" />
              ) : (
                <>
                  {loadingPickImage ? (
                    <ActivityIndicator size="small" color="#22b6c0" />
                  ) : (
                    <View style={styles.imageList}>
                      {selectedImages.map((image, index) => (
                        <View key={index}>
                          {/* <TouchableOpacity onPress={() => handleImagePress(index)}>
                        <Image
                          source={{uri: image?.uri}}
                          style={styles.imageItem}
                        />
                      </TouchableOpacity> */}
                          {isImage(image.uri) ? (
                            <TouchableOpacity
                              onPress={() => handleImagePress(index)}>
                              <Image
                                source={{uri: image.uri}}
                                style={styles.imageItem}
                              />
                            </TouchableOpacity>
                          ) : isVideo(image.uri) ? (
                            <TouchableOpacity
                              onPress={() => handleImagePress(index)}>
                              <VideoPlayer
                                style={styles.videoItem}
                                video={{uri: image.uri}}
                                videoWidth={1600}
                                videoHeight={900}
                                thumbnail={{uri: image.uri}}
                              />
                            </TouchableOpacity>
                          ) : (
                            <Text>Null</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  )}
                </>
              )}
            </View>
          </ScrollView>
          {/* camera */}
          <View style={styles.openCamera_container}>
            <TouchableOpacity style={styles.openCamera} onPress={openCamera}>
              <Entypo name={'camera'} color={'#22b6c0'} size={26} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* Setting Objects */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModelSettingObjects}
        onRequestClose={() => {
          setOpenModelSettingObjects(false);
        }}>
        <SettingStoryObjects cancel={() => setOpenModelSettingObjects(false)} />
      </Modal>
      {/* up story */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        {/* <UpImageStory
          cancel={() => setModalVisible(false)}
          getImage={getImage}
          openModelSettingObjects={() => setOpenModelSettingObjects(true)}
          selectedImageURI={selectedImageURI}
          navigation={navigation}
          selectedImages={selectedImages}
        /> */}
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}>
            <Ionicons name={'chevron-back'} color={'#fff'} size={30} />
          </TouchableOpacity>
          {/* {console.log('selectedImageURIselectedImageURI', selectedImageURI)} */}

          {isImage(selectedImageURI) ? (
            <Image source={{uri: selectedImageURI}} style={styles.modalImage} />
          ) : isVideo(selectedImageURI) ? (
            <VideoPlayer
              style={styles.modalImageVideo}
              video={{uri: selectedImageURI}}
              videoWidth={1600}
              videoHeight={900}
              thumbnail={{uri: selectedImageURI}}
            />
          ) : (
            <Text>Null</Text>
          )}
          <View style={styles.seetingInUp}>
            <View style={styles.seetingInUp_two}>
              <TouchableOpacity
                style={styles.seetingInUpQRT}
                onPress={() => setOpenModelSettingObjects(true)}>
                <MaterialCommunityIcons
                  name={'account-cog-outline'}
                  color={'#fff'}
                  size={25}
                />
                <Text style={styles.seetingtext}>Quyền riêng tư</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.seetingSave}>
                <MaterialIcons name={'save-alt'} color={'#6D6C6C'} size={25} />
                <Text style={[styles.seetingtext, {color: '#6D6C6C'}]}>
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnShare}
              onPress={() => handlePostUpload(imageCloud)}>
              <Text style={styles.btnShareText}>Chia sẻ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* label */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={openModelLabel}
        onRequestClose={() => {
          setOpenModelLabel(false);
        }}>
        <LabelPickStory
          cancel={() => setOpenModelLabel(false)}
          openModelSettingObjects={() => setOpenModelSettingObjects(true)}
          navigation={navigation}
        />
      </Modal>
      {/* Music */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={openModelMusic}
        onRequestClose={() => {
          setOpenModelMusic(false);
        }}>
        <MusicScreen cancel={() => setOpenModelMusic(false)} />
      </Modal>
    </View>
  );
};

export default SelectFeeingStory;
