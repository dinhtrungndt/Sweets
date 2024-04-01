/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
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
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheetEditPosts from './bottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  updateEditPosts,
  uploadImageStatus,
  uploadMedia,
} from '../../../../../../services/home/homeService';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CommonActions} from '@react-navigation/native';
import ChangeObjectsEditPosts from './objects';
import {UserContext} from '../../../../../../contexts/user/userContext';

const EditPostsIn = ({cancel, editPostsItemAccount, route, navigation}) => {
  // console.log('>???>>>>>>>>> item EditPosstsIn', editPostsItemAccount);

  const numColumns = 4;
  const bottomSheetRef = useRef(null);
  const initialSnapIndex = 0;
  const [_idPosts, setIdPosts] = useState(null);
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalObjects, setModalObjects] = useState(false);
  const [upload, setUpload] = useState(false);
  const {user} = useContext(UserContext);
  const [selectedId, setSelectedId] = useState(null);

  const handleInputChange = text => {
    setInputText(text);
  };

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
      const formData = new FormData();

      selectedImages.forEach((image, index) => {
        formData.append('imageStatus', image);
      });

      const data = await uploadImageStatus(formData);
      // console.log('>>>>>>>>>>>>>>>>>>>> Data 59 data', data);
      setImagePath(data.urls);
      // console.log('>>>>>>>>>>>>>>>>>>>>>>> 62 dataImage', data.urls);
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
      mediaType: 'photo',
      quality: 5,
      saveToPhotos: true,
      selectionLimit: 5,
      multiple: true,
    };
    await launchImageLibrary(options, takePhoto);
    setModalVisible(false);
  }, []);

  const handleUploadMedia = useCallback(async () => {
    try {
      const idPosts = editPostsItemAccount._id;
      if (!idPosts) {
        return;
      }
      const media = imagePath.join();
      const cbMediaType = {
        url: imagePath?.length > 1 ? imagePath : media,
        type: 'image',
      };

      const response = await uploadMedia(idPosts, cbMediaType);
      // console.log('>>>>>>> response -> handleUploadMedia', response);
    } catch (error) {
      console.log('>>>>>>> Lỗi ở HandleUploadMedia nè', error);
    }
  });

  const handleEditPostsUpload = async () => {
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
        await Promise.all([handleUploadMedia(), handleUpdatePosts()]);
      } else if (inputText) {
        await handleUpdatePosts();
      } else if (imagePath) {
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

  const handleUpdatePosts = useCallback(async () => {
    if (!inputText) {
      return;
    }

    try {
      let idObjectValue = '65b1fe1be09b1e99f9e8a235';
      if (selectedId && selectedId._id) {
        idObjectValue = selectedId._id;
      }

      const idPosts = editPostsItemAccount._id;
      const detailPosts = {
        content: inputText,
        idObject: idObjectValue,
      };
      const idUsers = user.user._id;
      const response = await updateEditPosts(idPosts, idUsers, detailPosts);
      setUpload(response);
      navigation.replace('HomeScreen'),
        console.log(' >>>>>>>>>>>>>>>> Đăng thành công:', response);
    } catch (error) {
      console.log('>>>>> lỗi upload postsss', error);
    }
  }, [inputText, user]);

  useEffect(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.T}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.cancel} onPress={cancel}>
            <AntDesign name={'close'} color={'#000'} size={23} />
          </TouchableOpacity>
          <Text style={styles.text_editPosts}>Chỉnh sửa bài viết</Text>
          <TouchableOpacity
            onPress={handleEditPostsUpload}
            style={[
              styles.save,
              {
                backgroundColor: inputText ? '#7ec1a5' : '#ebebeb',
              },
            ]}>
            <Text style={styles.text_save}>Lưu</Text>
          </TouchableOpacity>
        </View>
        {/* line */}
        <Text style={styles.line} />
        {/* body */}
        <View style={styles.body}>
          {/* chedo_congkhai */}
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.body_avatar}
              source={{uri: editPostsItemAccount.idUsers.avatar}}
            />
            <View style={styles.body_content}>
              {/* name */}
              <Text style={styles.body_name}>
                {editPostsItemAccount.idUsers.name}
              </Text>
              {/* {console.log('user post', user.user.name)} */}
              <View style={{flexDirection: 'row'}}>
                {/* congkhai */}
                <TouchableOpacity
                  style={styles.body_chedo}
                  onPress={() => setModalObjects(true)}>
                  {selectedId?.name === undefined ? (
                    <>
                      <Image
                        style={styles.body_chedo_icon}
                        source={require('../../../../../../assets/upstory_world_icon.png')}
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
                        {selectedId?.name}
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
              onChangeText={handleInputChange}>
              <Text>{editPostsItemAccount.content}</Text>
            </TextInput>
            {editPostsItemAccount.media &&
              editPostsItemAccount.media.length > 0 && (
                <FlatList
                  style={{marginTop: 10}}
                  data={editPostsItemAccount.media}
                  numColumns={numColumns}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity key={index}>
                      <Image
                        source={{uri: item.url.join()}}
                        style={{
                          width:
                            Dimensions.get('window').width / numColumns - 0,
                          height:
                            Dimensions.get('window').width / numColumns - 0,
                          margin: 5,
                          borderRadius: 5,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
            {image.length > 0 && (
              <FlatList
                style={{marginTop: 10}}
                data={image}
                numColumns={numColumns}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity key={index}>
                    <Image
                      source={{uri: item.uri}}
                      style={{
                        width: Dimensions.get('window').width / numColumns - 10,
                        height:
                          Dimensions.get('window').width / numColumns - 10,
                        margin: 5,
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
        {/* bottomSheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={initialSnapIndex}
          snapPoints={['10%', '45%', '90%']}>
          <BottomSheetEditPosts openCamera={() => setModalVisible(true)} />
        </BottomSheet>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalObjects}
          onRequestClose={() => {}}>
          <ChangeObjectsEditPosts
            cancel={() => setModalObjects(false)}
            navigation={navigation}
            onSelectObject={selectedId => {
              setSelectedId(selectedId);
            }}
          />
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

export default EditPostsIn;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#dedede',
  },
  header: {
    padding: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text_editPosts: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  save: {
    width: 65,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_save: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // body
  body: {
    paddingTop: 10,
  },
  body_avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    margin: 3,
    marginLeft: 15,
  },
  body_content: {
    marginLeft: 10,
  },
  body_name: {
    fontSize: 16,
    color: '#131313',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  body_chedo: {
    width: 120,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#E5F3FF',
    borderRadius: 5,
  },
  body_content_icon: {
    width: 13,
    height: 13,
    marginLeft: 7,
  },
  body_chedo_icon: {
    width: 16,
    height: 16,
    resizeMode: 'cover',
    marginTop: 2,
    marginLeft: 5,
  },
  body_chedo_text: {
    fontSize: 14,
    color: '#0962c9',
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginLeft: 2,
  },
  body_chedo_icon_down: {
    width: 10,
    height: 10,
    resizeMode: 'cover',
    marginTop: 2,
    marginLeft: 7,
  },
  body_content_input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 16,
    marginTop: 10,
    color: '#131313',
    fontFamily: 'Roboto',
  },
  modalView: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
