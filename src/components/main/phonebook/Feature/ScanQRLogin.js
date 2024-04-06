import React, {useContext, useEffect, useState, useRef} from 'react';
import io from 'socket.io-client';
import {View, Alert, StyleSheet, Button, Text} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import {UserContext} from '../../../../contexts/user/userContext';
import {
  CreateDevice,
  UpdateDevice,
} from '../../../../services/QRCode/QRCodeService';
const ScanQRLogin = () => {
  const {user} = useContext(UserContext);
  const [scanning, setScanning] = useState(true); // Trạng thái của việc quét
  const socket = useRef(null);
  const [device, setDevice] = useState('');
  // Them idUser vao bang qr code
  const onUpdateDevice = async () => {
    const response = await UpdateDevice(user.user._id, device);
    console.log('>>>>>>>>>> response: ', response.status);
    socket.current.emit('UpdateDevice', {response: response.status});
  };
  useEffect(() => {
    // baseURL: 'https://sweets-nodejs.onrender.com/',
    socket.current = io('https://sweets-nodejs.onrender.com/');
  }, []);

  const handleBarcodeScan = event => {
    // Alert.alert('QR code found', event.nativeEvent.codeStringValue);
    socket.current.emit('send_device_iduser', {
      deviceid: event.nativeEvent.codeStringValue,
      iduser: user.user._id,
    });
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
