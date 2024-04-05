// HostPage.js
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, {
  HOST_DEFAULT_CONFIG,
  AUDIENCE_DEFAULT_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import {useContext, useEffect} from 'react';
import {UserContext} from '../../../../contexts/user/userContext';
import {
  addLiveStream,
  deleteLiveStream,
} from '../../../../services/livestream/LiveStreamService';
export default function LiveStreamHost({route, navigation}) {
  const {isStream, liveID} = route.params;
  const {user} = useContext(UserContext);
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<3333333333 user', user);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>''''''", isStream);
  console.log(
    '############################<<<<<>>>>>>>>>>> user',
    user.user.avatar,
  );
  const onAddLiveStream = async () => {
    if(!isStream) return;
    const response = await addLiveStream(
      user.id,
      user.user.name,
      user.user.avatar,
    );
    console.log(
      '############################<<<<<>>>>>>>>>>> addLiveStream',
      response,
    );
  };
  // xoa theo live id cung la xoa theo isuser
  const onDeleteLiveStream = async () => {
    if (isStream) {
      const response = await deleteLiveStream(user.id);
    }
    navigation.navigate('HomeScreen');
    console.log(
      '############################<<<<<>>>>>>>>>>> deleteLiveStream',
      response,
    );
  };
  useEffect(() => {
    onAddLiveStream();
  }, []);
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={1118161000}
        appSign={
          '27731bc32f59a8bc056052a22bcc281a8fee4379f2960c212225af6cde6f0fd9'
        }
        userID={user.id}
        userName={user.user.name}
        liveID={liveID}
        config={{
          ...(isStream ? HOST_DEFAULT_CONFIG : AUDIENCE_DEFAULT_CONFIG),
          onLeaveLiveStreaming: () => {
            onDeleteLiveStream();
          },
        }}
      />
    </View>
  );
}
