/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useContext, useCallback} from 'react';
import {styles} from '../style/upStatusCss';

// Library
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CommonActions} from '@react-navigation/native';

// Data
import {
  uploadImageStatus,
  uploadPost,
} from '../../../../../services/home/homeService';
import {UserContext} from '../../../../../ctest.pngontexts/user/userContext';
import Toast from 'react-native-toast-message';

const UpStatus = ({navigation, route}) => {
  const {user} = route.params;

  const [upload, setUpload] = useState(false);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

      // Append all selected images to the formData
      selectedImages.forEach((image, index) => {
        formData.append('imageStatus', image);
      });

      const data = await uploadImageStatus(formData);
      // console.log('>>>>>>>>>>>>>>>>>>>> Data 59 data', data);
      setImagePath(data.urls);
      console.log('>>>>>>>>>>>>>>>>>>>>>>> 62 dataImage', data.urls);
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

  const showBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const hideBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const handleInputChange = text => {
    setInputText(text);
  };

  const handlePostUpload = () => {
    handleUploadPost();
    // Kiểm tra có xem inputText có rỗng hay không
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
  };

  const handleUploadPost = useCallback(async () => {
    if (!user || !inputText) {
      return;
    }

    try {
      const postDetails = {
        avatar: user.user.avatar,
        name: user.user.name,
        time: new Date().toISOString(),
        content: inputText,
        image: imagePath,
      };

      const response = await uploadPost(user.id, postDetails);

      if (response.status === 1) {
        // console.log(' >>>>>>>>>>>>>>>> Đăng thành công:', response);
        setUpload(response);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'HomeStackScreen'}],
          }),
        );
      } else {
        console.error('Lỗi 134 ->>>>>> status 1:', response.message);
      }
    } catch (error) {
      console.error('Lỗi catch --->>>>> error :', error);
    }
  }, [user, inputText]);

  // console.log(' >>>>>>>>>>>>>>> 14111111 ', user.user.avatar);

  useEffect(() => {
    handleUploadPost();
  }, [user]);

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
            {backgroundColor: inputText ? '#7ec1a5' : '#CBCBCB'},
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
                onPress={() => navigation.navigate('SelectScreenUp')}>
                <Image
                  style={styles.body_chedo_icon}
                  source={require('../../../../../assets/icon_all_friend.png')}
                />
                <Text style={styles.body_chedo_text}>Tất cả bạn bè</Text>
                <Image
                  style={styles.body_chedo_icon_down}
                  source={require('../../../../../assets/upstory_down_icon.png')}
                />
              </TouchableOpacity>
              {/* album */}
              <TouchableOpacity
                style={[styles.body_chedo, {marginLeft: 15, width: 95}]}>
                <Text style={[styles.body_chedo_text, {paddingLeft: 5}]}>
                  +
                </Text>
                <Text style={[styles.body_chedo_text, {paddingLeft: 3}]}>
                  Album
                </Text>
                <Image
                  style={styles.body_chedo_icon_down}
                  source={require('../../../../../assets/upstory_down_icon.png')}
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
            <FlatList
              data={image}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity key={index}>
                  <Image
                    source={{uri: item.uri}}
                    style={{
                      width: 100,
                      height: 200,
                      resizeMode: 'cover',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        {/* bottom sheet */}
        <View style={styles.pick_feelings}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../assets/icon_image.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Ảnh/video</Text>
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
              onPress={() => setModalVisible(true)}
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
            <TouchableOpacity style={styles.bottomSheetItem}>
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
};

export default UpStatus;