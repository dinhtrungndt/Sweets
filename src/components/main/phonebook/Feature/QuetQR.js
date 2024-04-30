import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ToastAndroid, Alert, Linking, Modal, Dimensions } from 'react-native';
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
  const [isModalVisible, setIsModalVisible] = useState(false); // State để theo dõi trạng thái của modal
  const viewShotRef = useRef();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

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

  const captureAndSave = async () => {
    try {
        const uri = await viewShotRef.current.capture();
        console.log('URI của ảnh:', uri);

        const savePath = `${RNFS.DocumentDirectoryPath}/qr_code_image.jpg`;

        // Kiểm tra xem file có tồn tại không
        const fileExists = await RNFS.exists(uri);
        if (!fileExists) {
            console.log('File không tồn tại');
            return;
        }

        const permissionStatus = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

        if (permissionStatus === RESULTS.GRANTED) {
            await RNFS.moveFile(uri, savePath);
            ToastAndroid.show('Ảnh đã được lưu thành công', ToastAndroid.SHORT);
            console.log('Ảnh đã được lưu thành công vào:', savePath);
        } else if (permissionStatus === RESULTS.DENIED) {
            Alert.alert(
                "Quyền truy cập bộ nhớ",
                "Ứng dụng cần quyền truy cập vào bộ nhớ để lưu trữ ảnh. Vui lòng cấp quyền truy cập trong cài đặt của ứng dụng.",
                [
                    {
                        text: "Để sau",
                        onPress: () => console.log("Đã chọn Để sau"),
                        style: "cancel"
                    },
                    {
                        text: "Cài đặt",
                        onPress: () => Linking.openSettings()
                    }
                ]
            );
        } else {
            console.log('Quyền truy cập bị từ chối');
        }
    } catch (error) {
        console.error('Lỗi khi chụp ảnh:', error);
    }
};

const toggleModal = () => {
  setIsModalVisible(!isModalVisible);
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
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.qrContainer}>
              <QRCode
                value={JSON.stringify(userData)}
                size={170}
              />
              <Image source={require('../../../../assets/logongang.png')} style={styles.avatar2} /> 
            </View>
          </TouchableOpacity>
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

    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
       
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
          <View style={styles.qrContainerModal}>
            <QRCode
            style={styles.imgQR}
              value={JSON.stringify(userData)}
              size={windowWidth * 1}
               // Sử dụng kích thước lớn hơn cho hình ảnh QR code
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
          <Text style={{fontSize:20,fontWeight:'bold',borderWidth:1,padding:5,textAlign:'center',backgroundColor:'#22b6c0'}}> Đóng mở rộng</Text>
        </TouchableOpacity>
          </View>
        </ViewShot>
      </View>
    </Modal>
  </View>
);
};

export default QuetQR;
