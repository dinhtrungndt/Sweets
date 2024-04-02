import React, { useState } from 'react';
import { View, Alert, StyleSheet, Button, Text } from 'react-native';
import { Camera } from 'react-native-camera-kit';

const ScanQR = () => {
  const [scanning, setScanning] = useState(true); // Trạng thái của việc quét

  const handleBarcodeScan = (event) => {
    Alert.alert('QR code found', event.nativeEvent.codeStringValue);
    // Lưu thông tin mã QR vào cơ sở dữ liệu hoặc thực hiện các thao tác khác tùy thuộc vào yêu cầu của bạn

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
