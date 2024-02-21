/* eslint-disable prettier/prettier */
import {Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './style/index';

const AddModal = () => {
  // clone modal
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpLoad = () => {
    console.log('UpLoad');
    setModalVisible(!modalVisible);
  };
  return (
    <>
      <View style={styles.modalContainer}>
        {/* Gồm: Đăng, Tin, Thước Phim, Phát trực tiếp */}
        <View style={styles.modalContent} onPress={() => setModalVisible(true)}>
          <TouchableOpacity style={styles.modalItem} onPress={handleUpLoad}>
            <Image
              style={[styles.modalIcon, {width: 20, height: 20}]}
              source={require('../../../../../assets/upload_icon_modal.png')}
            />
            <Text style={styles.modalText}>Đăng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem}>
            <Image
              style={[styles.modalIcon, {width: 20, height: 20}]}
              source={require('../../../../../assets/story_icon_modal.png')}
            />
            <Text style={styles.modalText}>Tin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem}>
            <Image
              style={[styles.modalIcon, {width: 20, height: 20}]}
              source={require('../../../../../assets/video_icon_modal.png')}
            />
            <Text style={styles.modalText}>Thước phim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalItem}>
            <Image
              style={[styles.modalIcon, {width: 22, height: 22}]}
              source={require('../../../../../assets/live_icon.modal.png')}
            />
            <Text style={styles.modalText}>Phát trực tiếp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AddModal;
