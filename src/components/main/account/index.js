/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../../contexts/user/userContext';
import BottomSheet from '@gorhom/bottom-sheet';

import {styles} from './style/accountScreen';
const AccountScreen = props => {
  const {navigation} = props;

  const {user} = useContext(UserContext);
  const {onLogout} = useContext(UserContext);
  // console.log(">>>>>>>>> test user", user);

  const [loading, setLoading] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const bottomSheetRef = useRef(null);

  const handleLogout = async () => {
    // Nếu đang hiển thị hộp thoại xác nhận, không thực hiện đăng xuất
    if (showConfirmLogout) {
      setShowConfirmLogout(false);
      return;
    }
    // Hiển thị hộp thoại xác nhận
    setShowConfirmLogout(true);
  };

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
  };

  return (
    <View style={styles.body}>
      <View style={styles.bodyStart}>
        <Text style={styles.textMenu}>Menu</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsAndPrivacy')}
          style={styles.container}>
          <Image
            style={styles.imgMenu}
            source={require('../../../assets/icon_settings_50.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.container1}>
        <Image
          style={styles.imgAvatar}
          source={
            user && user.user.avatar
              ? {uri: user.user.avatar}
              : require('../../../assets/diana.jpg')
          }
        />
        <Text style={styles.textName}>{user ? user.user.name : ''}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Account_Transfer')}
          style={styles.container2}>
          <Image
            style={styles.userIcon}
            source={require('../../../assets/icon_back.png')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.bodyBtnIcon}>
        <TouchableOpacity style={styles.btnIcon}>
          <Image
            style={styles.imgIconMmr}
            source={require('../../../assets/icon_memories.png')}
          />
          <Text style={styles.text0}>Kỷ niệm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/icon_image.png')}
          />
          <Text style={styles.text0}>Đã lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/icon_group.jpg')}
          />
          <Text style={styles.text0}>Nhóm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/icon_video.png')}
          />
          <Text style={styles.text0}>Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/icon_heart_48.png')}
          />
          <Text style={styles.text0}>Hẹn hò</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image
            style={styles.imgIcon}
            source={require('../../../assets/icon_friend_add.png')}
          />
          <Text style={styles.text0}>Bạn bè</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.setting}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HelpAndSupport')}
          style={styles.btnHelp}>
          <Image
            style={styles.imgSettings}
            source={require('../../../assets/icon_help.png')}
          />
          <Text style={styles.textbtn1}>Trợ giúp & hỗ trợ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsAndPrivacy')}
          style={styles.btnPrivacy}>
          <Image
            style={styles.imgSettings}
            source={require('../../../assets/icon_setting.png')}
          />
          <Text style={styles.textbtn1}>Cài đặt & quyền riêng tư</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AccountAndSecurity')}
          style={styles.btnSecurity}>
          <Image
            style={styles.imgSettings}
            source={require('../../../assets/icon_security.png')}
          />
          <Text style={styles.textbtn1}>Tài khoản & bảo mật</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.textLogout}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      {/* Hiển thị hộp thoại xác nhận */}
      {showConfirmLogout && (
        <View style={styles.confirmLogoutContainer}>
          <Text style={styles.confirmLogoutText}>
            Đăng xuất khỏi tài khoản của bạn?
          </Text>
          <View style={styles.confirmLogoutButtons}>
            <TouchableOpacity
              style={styles.confirmLogoutButton}
              onPress={() => setShowConfirmLogout(false)}>
              <Text style={styles.confirmLogoutButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmLogoutButton}
              onPress={confirmLogout}>
              <Text style={styles.confirmLogoutButtonText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default AccountScreen;
