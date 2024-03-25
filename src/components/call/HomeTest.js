import { StyleSheet, Text, View,Button,TextInput } from 'react-native'
import React,{useContext,useState} from 'react'
import { MyContext } from './UseContextTemp';
import {getFirstInstallTime } from 'react-native-device-info'
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const HomeTest = ({ navigation }) => {
  const [user, setuser] = useState('');
  const {name,setName} = useContext(MyContext);
  const onUserLogin = async (_name) => {
    return ZegoUIKitPrebuiltCallService.init(
      1118161000, 
      "27731bc32f59a8bc056052a22bcc281a8fee4379f2960c212225af6cde6f0fd9", 
      _name,
      _name,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'sweets_coming.mp3',
          outgoingCallFileName: 'sweets_ending.mp3',
        },
        // androidNotificationConfig: {
        //   channelID: "ZegoUIKit",
        //   channelName: "ZegoUIKit",
        // },
      }
      );
  }
  const onUserLogout = async () => {
    return ZegoUIKitPrebuiltCallService.uninit()
  }

  const ConfirmYourName = () => {
    setName(user);
  }

  const LoginTemp = ({navigation}) => {
    onUserLogin(name).then(() => {
      navigation.navigate('CallInvite')
    });
    // navigation.navigate('VideoCallPage');
  }
  
  return (
    <View>

      <Text>HomeTest</Text>
      <TextInput
        placeholder="Enter your name"
        value={user}
        onChangeText={(text) => setuser(text)}
      />
      <Text>userID: {name}</Text>
      <Text>userName: {name}</Text>
      <Button title="Xác nhận tên của bạn" onPress={() => ConfirmYourName()} />
      <Button title="Đăng nhập" onPress={() => LoginTemp({navigation})} />
      <Button title="Đăng xuất" onPress={() => onUserLogout()} />
    </View>
  )
}

export default HomeTest

const styles = StyleSheet.create({})