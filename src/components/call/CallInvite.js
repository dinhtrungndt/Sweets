import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useContext, useState} from 'react';
import {MyContext} from './UseContextTemp';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const CallInvite = ({navigation}) => {
  const [friendId, setFriendId] = useState('');
  const {name} = useContext(MyContext);
  return (
    <View style={styles.container}>
      <Text>CallInvite</Text>
      <Text>Your user id: {name}</Text>
      <Text>Friend's user id: {friendId}</Text>
      <TextInput
        value={friendId}
        style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="Enter your friend's user id"
        onChangeText={text => setFriendId(text)}
      />
      <ZegoSendCallInvitationButton
        invitees={[{userID: friendId, userName: friendId}]}
        isVideoCall={true}
        resourceID={"sweets_call"}
      />
    </View>
  );
};

export default CallInvite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
