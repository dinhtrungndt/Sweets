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
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from '../../styles/selectFeeingStory';

// library
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker, {launchCamera} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import LabelPickStory from './label';
import {uploadImageStatus} from '../../../../../../services/home/homeService';
import MusicScreen from './music';
import {Overlay} from 'react-native-elements';

const SelectFeeingStory = ({cancel, navigation}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openModelLabel, setOpenModelLabel] = useState(false);
  const [openModelMusic, setOpenModelMusic] = useState(false);
  const [openModelBoom, setOpenModelBoom] = useState(false);
  const [openCameraP, setOpenCameraP] = useState([]);
  const [cameraImage, setCameraImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCloseBoom = () => {
    setOpenModelBoom(false);
  };

  const listImage = async () => {
    try {
      setLoading(true);
      const directoryPath = RNFS.PicturesDirectoryPath;
      const files = await RNFS.readDir(directoryPath);
      const imageFiles = files.filter(
        file => file.isFile() && file.name.endsWith('.jpg'),
      );
      const imageURIs = imageFiles.map(file => ({uri: 'file://' + file.path}));
      setSelectedImages(imageURIs);
      setLoading(false);
    } catch (error) {
      console.log('Error loading images:', error);
    }
  };
  console.log('>>>>>>>> selectedImages', selectedImages);

  const handleImagePress = index => {
    setSelectedImageIndex(index);
    setModalVisible(true);
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
      setOpenCameraP(selectedImages);
      const formData = new FormData();

      selectedImages.forEach((image, index) => {
        formData.append('imageStatus', image);
      });

      const data = await uploadImageStatus(formData);
      // console.log('>>>>>>>>>>>>>>>>>>>> Data 59 data', data);
      setCameraImage(data.urls);
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
        <TouchableOpacity style={styles.cancel}>
          <MaterialCommunityIcons
            name={'account-cog-outline'}
            color={'#000'}
            size={25}
          />
        </TouchableOpacity>
      </View>
      {/* body */}
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
        <TouchableOpacity style={styles.library_container}>
          <Text style={styles.library_text}>Cuộn camera</Text>
          <Entypo name={'chevron-small-down'} color={'#000'} size={22} />
        </TouchableOpacity>
        {/* List of selected images */}
        {loading ? (
          <ActivityIndicator size="small" color="#22b6c0" />
        ) : (
          <View style={styles.imageList}>
            {selectedImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index)}>
                <Image source={image} style={styles.imageItem} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      {/* camera */}
      <View style={styles.openCamera_container}>
        <TouchableOpacity style={styles.openCamera} onPress={openCamera}>
          <Entypo name={'camera'} color={'#22b6c0'} size={26} />
        </TouchableOpacity>
      </View>

      {/* up story */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}>
            <Ionicons name={'chevron-back'} color={'#fff'} size={30} />
          </TouchableOpacity>
          <Image
            source={selectedImages[selectedImageIndex]}
            style={styles.modalImage}
          />

          <View style={styles.seetingInUp}>
            <View style={styles.seetingInUp_two}>
              <TouchableOpacity style={styles.seetingInUpQRT}>
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
            <TouchableOpacity style={styles.btnShare}>
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
        <LabelPickStory cancel={cancel} />
      </Modal>

      {/* Music */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={openModelMusic}
        onRequestClose={() => {
          setOpenModelMusic(false);
        }}>
        <MusicScreen cancel={cancel} />
      </Modal>
    </View>
  );
};

export default SelectFeeingStory;
