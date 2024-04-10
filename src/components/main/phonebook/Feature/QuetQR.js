import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../../../helper/Axiosinstance';
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import styles from '../styles/MaqrStyles';

const QuetQR = (props) => {
    const { navigation } = props;
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await AxiosInstance().get(`/users/get-user/${userId}`);
        setUserData(response.user);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserData();
  }, []);

  const viewShotRef = useRef();

  const captureAndSave = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const savePath = `${RNFS.DocumentDirectoryPath}/qr_code_image.jpg`;

      const permissionStatus = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      
      if (permissionStatus === RESULTS.GRANTED) {
        await RNFS.moveFile(uri, savePath);
        ToastAndroid.show('Ảnh đã được lưu thành công', ToastAndroid.SHORT);
      } else {
        const permissionRequest = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        
        if (permissionRequest === RESULTS.GRANTED) {
          await RNFS.moveFile(uri, savePath);
          ToastAndroid.show('Ảnh đã được lưu thành công', ToastAndroid.SHORT);
        } else {
          console.log('Quyền truy cập bị từ chối');
        }
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
 <View>
       <View style={styles.wrapContent1}>
        <TouchableOpacity style={styles.friendItem}  onPress={() => navigation.navigate('PhoneBookScreen')}>
          <Image source={require('../../../../assets/icon_back.png')} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.txtContent1}>Thêm bạn</Text>
        
      </View>

    
        
       <View style={styles.wrapQr}>
       <View style={styles.container}>
       <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}> 
          <View style={styles.qrContainer}>
            <QRCode
              value={JSON.stringify(userData)}
              size={170}
            />
            <Image source={require('../../../../assets/logongang.png')} style={styles.avatar2} /> 
          </View>
        </ViewShot>
       </View>
       
      </View>
      <TouchableOpacity style={styles.ToQR} onPress={captureAndSave}>
      <Image source={require('../../../../assets/install.png')}  /> 
          <Text style={styles.txtToQR}>Lưu mã QR của tôi</Text>
        </TouchableOpacity>

    <TouchableOpacity style={styles.ToQR} onPress={() => navigation.navigate('ScanQR')}>
    <Image source={require('../../../../assets/qr-scanb.png')}  /> 
        <Text style={styles.txtToQR}>Quét mã qr</Text>
    </TouchableOpacity>

 </View>
  );
};

export default QuetQR;
