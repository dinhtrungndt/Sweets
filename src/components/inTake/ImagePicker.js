/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {uploadImageStatus} from '../home/homeService';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePicker = ({onImageSelected}) => {
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
      onImageSelected(selectedImages);
      const formData = new FormData();

      // Append all selected images to the formData
      selectedImages.forEach((image, index) => {
        formData.append('imageStatus', image);
      });

      const data = await uploadImageStatus(formData);
      // console.log('>>>>>>>>>>>>>>>>>>>> Data 59 data', data);
      setImagePath(data.urls);
      // console.log(">>>>>>>>>>>>>>>>>>>>>>> 62 dataImage", data.urls);
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
      selectionLimit: 0,
      multiple: true,
    };
    await launchImageLibrary(options, takePhoto);
    setModalVisible(false);
  }, []);

  return (
    <View>
      {/* modal  */}

      <Text onPress={openCamera}>Chụp ảnh</Text>
      <Text onPress={openLibrary}>Chọn ảnh</Text>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({});
