// HostPage.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, { HOST_DEFAULT_CONFIG,AUDIENCE_DEFAULT_CONFIG } from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn'

export default function LiveStreamHost({route, navigation}) {
    const {isStream,userName,userId} = route.params;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>''''''",isStream+" "+userName);
    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltLiveStreaming
                appID={1118161000}
                appSign={"27731bc32f59a8bc056052a22bcc281a8fee4379f2960c212225af6cde6f0fd9"}
                userID={userId}
                userName={userName}
                liveID={"123456"}

                config={{
                    ...(isStream ? HOST_DEFAULT_CONFIG : AUDIENCE_DEFAULT_CONFIG),
                    onLeaveLiveStreaming: () => { navigation.navigate('HomeScreen') }
                }}
            />
        </View>
    );
}