import React, { useState } from 'react';
export const SendCall = ({navigation,name,idUser,idFriend}) => {
    
    return(
        navigation.navigate('VideoCallPage',{name:name,idUser:idUser,idFriend:idFriend})
    )
}