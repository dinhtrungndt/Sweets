<<<<<<< HEAD
import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../../contexts/user/userContext';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';

//styles
import {styles} from './style/accountScreen';

const AccountScreen = props => {
  const {navigation} = props;
  const {t, i18n} = useTranslation();
=======
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity, Modal } from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../contexts/user/userContext';
import BottomSheet from '@gorhom/bottom-sheet';

import { styles } from './style/accountScreen';
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf

const AccountScreen = props => {
  const { navigation } = props;

  const { user } = useContext(UserContext);
  const { onLogout } = useContext(UserContext);
  // console.log(">>>>>>>>> test user", user);

  const [loading, setLoading] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = async () => {
    if (showConfirmLogout) {
      setShowConfirmLogout(false);
      return;
    }
    setShowConfirmLogout(true);
  }

  const confirmLogout = async () => {
    setLoading(true);
    const result = await onLogout();
    if (!result) {
      setLoading(false);
      setShowConfirmLogout(false);
    } else {
      try {
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userPassword');
        navigation.navigate('Login');
      } catch (error) {
        console.log('Lỗi khi đăng xuấtzzzz:', error);
      }
    }
  }

  return (
    <View style={styles.body}>
      <View style={styles.bodyStart}>
        <Text style={styles.textMenu}>Menu</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsAndPrivacy')}
          style={styles.container}>
          <Image style={styles.imgMenu} source={require('../../../assets/icon_settings_50.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.container1}>
        <Image style={styles.imgAvatar} source={user && user.user.avatar ? { uri: user.user.avatar } : require('../../../assets/diana.jpg')} />
        <Text style={styles.textName}>{user ? user.user.name : ''}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Account_Transfer')}
          style={styles.container2}>
<<<<<<< HEAD
          <MaterialIcons
            name="navigate-next"
            size={30}
            color={'#000000'}
            style={styles.userIcon}
          />
=======
          <Image style={styles.userIcon} source={require('../../../assets/icon_back.png')} />
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.bodyBtnIcon}>
        <TouchableOpacity style={styles.btnIcon}>
<<<<<<< HEAD
          <Image
            style={styles.imgIconMmr}
            source={require('../../../assets/icon_memories.png')}
          />
          <Text style={styles.text0}>{t('memories')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnIcon}
          onPress={() => navigation.navigate('SavePostsScreen')}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/ablum_account.png')}
          />
          <Text style={styles.text0}>{t('saved')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/icon_group.jpg')}
          />
          <Text style={styles.text0}>{t('group')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnIcon}
          onPress={() => {
            // console.log('>>>>>>>>> video call');
          }}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/icon_video.png')}
          />
          <Text style={styles.text0}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnIcon}
          onPress={() => {
            navigation.navigate('ScanQRLogin');
          }}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/qr_code_50px.png')}
          />
          <Text style={styles.text0}>{t('ScanQR')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/icon_friend_add.png')}
          />
          <Text style={styles.text0}>{t('friends')}</Text>
=======
          <Image style={styles.imgIconMmr} source={require('../../../assets/icon_memories.png')} />
          <Text style={styles.text0}>Kỷ niệm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon_image.png')} />
          <Text style={styles.text0}>Đã lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon_group.jpg')} />
          <Text style={styles.text0}>Nhóm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon_video.png')} />
          <Text style={styles.text0}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon_heart_48.png')} />
          <Text style={styles.text0}>Hẹn hò</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon_friend_add.png')} />
          <Text style={styles.text0}>Bạn bè</Text>
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
        </TouchableOpacity>
      </View>

      <View style={styles.setting}>
<<<<<<< HEAD
        <TouchableOpacity
          onPress={() => navigation.navigate('HelpAndSupport')}
          style={styles.btnHelp}>
          <Entypo
            name="help-with-circle"
            size={27}
            color="#bcbcbc"
            style={{position: 'absolute', left: '5%'}}
          />
          <Text style={styles.textbtn1}>{t('helpAndSupport')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsAndPrivacy')}
          style={styles.btnPrivacy}>
          <Image
            style={styles.imgSettings}
            source={require('../../../assets/icon_setting.png')}
          />
          <Text style={styles.textbtn1}>{t('settingsAndprivacy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountAndSecurity')}
          style={styles.btnSecurity}>
          <Image
            style={styles.imgSettings}
            source={require('../../../assets/icon_protect_48.png')}
          />
          <Text style={styles.textbtn1}>{t('accountAndSecurity')}</Text>
=======
        <TouchableOpacity onPress={() => navigation.navigate('HelpAndSupport')} style={styles.btnHelp} >
          <Image style={styles.imgSettings} source={require('../../../assets/icon_help.png')} />
          <Text style={styles.textbtn1}>Trợ giúp & hỗ trợ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsAndPrivacy')} style={styles.btnPrivacy}>
          <Image style={styles.imgSettings} source={require('../../../assets/icon_setting.png')} />
          <Text style={styles.textbtn1}>Cài đặt & quyền riêng tư</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AccountAndSecurity')} style={styles.btnSecurity}>
          <Image style={styles.imgSettings} source={require('../../../assets/icon_security.png')} />
          <Text style={styles.textbtn1}>Tài khoản & bảo mật</Text>
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.textLogout}>{t('logout')}</Text>
        </TouchableOpacity>
      </View>
      {/* Hiển thị hộp thoại xác nhận */}
      {showConfirmLogout && (
        <View style={styles.confirmLogoutContainer}>
<<<<<<< HEAD
          <Text style={styles.confirmLogoutText}>
            {t('areYouSureYouWantToLogout')}?
          </Text>
          <View style={styles.confirmLogoutButtons}>
            <TouchableOpacity
              style={styles.confirmLogoutButton}
              onPress={() => setShowConfirmLogout(false)}>
              <Text style={styles.confirmLogoutButtonText1}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmLogoutButton}
              onPress={confirmLogout}>
              <Text style={styles.confirmLogoutButtonText2}>{t('agree')}</Text>
=======
          <Text style={styles.confirmLogoutText}>Đăng xuất khỏi tài khoản của bạn?</Text>
          <View style={styles.confirmLogoutButtons}>
            <TouchableOpacity style={styles.confirmLogoutButton} onPress={() => setShowConfirmLogout(false)}>
              <Text style={styles.confirmLogoutButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmLogoutButton} onPress={confirmLogout}>
              <Text style={styles.confirmLogoutButtonText}>Đồng ý</Text>
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default AccountScreen;

