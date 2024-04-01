import React, {useContext, useEffect, useState, useRef} from 'react';
import io from 'socket.io-client';
import {View, Alert, StyleSheet, Button, Text} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import {UserContext} from '../../../../contexts/user/userContext';
import {CreateDevice} from '../../../../services/QRCode/QRCodeService';
const ScanQRLogin = () => {
  const {user} = useContext(UserContext);
  const [scanning, setScanning] = useState(true); // Trạng thái của việc quét
  const socket = useRef(null);
  const [device, setDevice] = useState('');
  // dùng để thêm dữ liệu vào bảng qr code khi load lại trang
  const onAddDevice = async () => {
    const response = await CreateDevice(device);
    console.log('>>>>>>>>>> response: ', response);
  };
  useEffect(() => {
    socket.current = io('http://192.168.1.73:3001/');
    socket.current.on('AddDevice2', data => {
      console.log('>>>>>>>>>> nhan device id ' + data.device);
      setDevice(data.device);
    });
  }, []);

  useEffect(() => {
    if (device !== '') {
      onAddDevice();
    }
  }, [device]);

  const handleBarcodeScan = event => {
    Alert.alert('QR code found', event.nativeEvent.codeStringValue);
    // Lưu thông tin mã QR vào cơ sở dữ liệu hoặc thực hiện các thao tác khác tùy thuộc vào yêu cầu của bạn

    socket.current.emit('LoginByQRCode', {userId: user.user._id});

    // Dừng quét
    setScanning(false);
  };

  const handleReturnToScan = () => {
    // Quay lại quét khi người dùng bấm nút quét lại
    setScanning(true);
  };

  return (
    <View style={styles.container}>
      {scanning ? (
        <Camera
          style={styles.camera}
          scanBarcode={true}
          onReadCode={handleBarcodeScan}
          showFrame={true}
          laserColor="red"
          frameColor="white"
        />
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.successText}>Quét thành công!</Text>
          <Text style={styles.infoText}>Nhấn nút dưới để quét lại</Text>
          <Button title="Quét lại" onPress={handleReturnToScan} />
        </View>
      )}
    </View>
  );
};

export default ScanQRLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
  },
});
