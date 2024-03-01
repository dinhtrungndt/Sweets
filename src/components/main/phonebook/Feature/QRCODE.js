// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Camera, CameraType } from 'react-native-camera-kit';

// const QRCODE = () => {
//   return (
//     <Camera
//     ref={(ref) => (this.camera = ref)}
//     cameraType={CameraType.Back} // front/back(default)
//     flashMode='auto'

//     scanBarcode={true}
//     onReadCode={(event) => Alert.alert('QR code found')} // optional
//     showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner, that stops when a code has been found. Frame always at center of the screen
//     laserColor='red' // (default red) optional, color of laser in scanner frame
//     frameColor='white' // (default white) optional, color of border of scanner frame
//   />
//   )
// }

// export default QRCODE

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const QRCODE = () => {
  return (
    <View>
      <Text>QRCODE</Text>
    </View>
  )
}

export default QRCODE

const styles = StyleSheet.create({})