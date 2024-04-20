import React, { useState,useContext } from 'react';
import { View, Alert, StyleSheet, Button, Text } from 'react-native';
import { Camera } from 'react-native-camera-kit';
import { UserContext } from '../../../../contexts/user/userContext';
const ScanQR = (props) => {
  const { navigation } = props;
  const [scanning, setScanning] = useState(true); // Trạng thái của việc quét
  const { updateUserInfo,user } = useContext(UserContext);
console.log('user',user)

  const handleBarcodeScan = (event) => {
    const scannedData = event.nativeEvent.codeStringValue; // Dữ liệu đã quét được
    const scannedDataObject = JSON.parse(scannedData);
    console.log('scannedData', scannedDataObject.name);
   
    // Kiểm tra nếu ID quét trùng với ID đăng nhập
    if (scannedDataObject._id === user.id) {
      Alert.alert('Không thể quét mã QR của chính bạn');
      return; // Dừng xử lý tiếp theo
    }
  
    // Nếu không trùng, chuyển sang màn hình OtherUserA và truyền dữ liệu đã quét được
    navigation.navigate('OtherUserA2', { accountzzz: scannedDataObject });
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
          laserColor='red'
          frameColor='white'
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

export default ScanQR;

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
