// App.js
import React, { useEffect, useState, useContext } from 'react';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG, } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import { View, StyleSheet} from 'react-native';
import { MyContext } from './UseContextTemp';
export default function VideoCallPage({navigation,route}) {
    // const name = route.params.name;
    // const idUser = route.params.idUser;
    // const idFriend = route.params.idFriend;
    const {name} = useContext(MyContext);
    console.log('name:', name);
    return (
        <View style={styles.container}>
            <ZegoUIKitPrebuiltCall
                appID={1118161000}
                appSign={"27731bc32f59a8bc056052a22bcc281a8fee4379f2960c212225af6cde6f0fd9"}
                userID={name} // userID can be something like a phone number or the user id on your own user system. 
                userName={name} // userName can be the user's nickname.
                callID={"123"} // callID can be any unique string. 

                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { navigation.navigate('HomeTest') },
                    onHangUp: () => { navigation.navigate('HomeTest') },
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
