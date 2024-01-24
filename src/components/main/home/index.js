/* eslint-disable prettier/prettier */
import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';

// StyleCss
import styles from './style/home';

// screen
import HeaderScreens from '../layout/header';
import HomeTabsTop from './tabTop';

// Library
import {UserContext} from '../../../contexts/user/userContext';

const HomeScreen = props => {
  const {navigation} = props;
  const {user} = useContext(UserContext);

  return (
    <>
      <View style={styles.T}>
        {/* Header */}
        <HeaderScreens {...props} />
        <Text style={styles.lineHr} />
        {/* Body */}
        <View style={styles.avatar_content_image}>
          <TouchableOpacity>
            <Image
              style={[styles.avatar, {marginLeft: 5}]}
              source={{uri: user.user.avatar}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 290,
              height: 40,
              justifyContent: 'center',
              borderRadius: 50,
            }}
            onPress={() => navigation.navigate('UpStatus', {user})}>
            <Text style={{marginLeft: 10, fontSize: 16}}>
              Bạn đang nghĩ gì?
            </Text>
          </TouchableOpacity>
          <View style={{flex: 1}} />
          <TouchableOpacity>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../assets/icon_image.png')}
            />
          </TouchableOpacity>
        </View>
        {/* anh-video-album-kyniem */}
        <View style={styles.pick_feelings}>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../assets/icon_image_pick.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../assets/icon_video.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../assets/icon_album.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Album</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.lineHr, {marginBottom: 10}]} />
        <HomeTabsTop />
      </View>
    </>
  );
};

export default HomeScreen;
