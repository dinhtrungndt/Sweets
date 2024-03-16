/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../contexts/user/userContext';

const AccountScreen = props => {
  const { navigation } = props;

  const { user } = useContext(UserContext);
  const { onLogout } = useContext(UserContext);
  console.log(">>>>>>>>> test user", user);

  const [loading, setLoading] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = async () => {
    // Nếu đang hiển thị hộp thoại xác nhận, không thực hiện đăng xuất
    if (showConfirmLogout) {
      setShowConfirmLogout(false);
      return;
    }
    // Hiển thị hộp thoại xác nhận
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
        console.log('Lỗi khi đăng xuất:', error);
      }
    }
  }

  return (
    <View style={styles.body}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.container}>
        <Image style={styles.imgAvatar} source={user && user.user.avatar ? { uri: user.user.avatar } : require('../../../assets/diana.jpg')} />
        <Text style={styles.textName}>{user ? user.user.name : ''}</Text>
        <Text style={styles.textU}>Xem trang cá nhân</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Account_Transfer')}
          style={{ alignSelf: 'center' }}>
          <Image style={styles.userIcon} source={require('../../../assets/icon_user.png')} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.bodyBtnIcon}>
        <TouchableOpacity style={styles.btnIcon}>
          <Image style={styles.imgIconMmr} source={require('../../../assets/icon_memories.png')} />
          <Text style={styles.text0}>Kỷ niệm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon_image2.png')} />
          <Text style={styles.text0}>Đã lưu</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.setting}>
      
      <TouchableOpacity onPress={() => navigation.navigate('SettingsAndPrivacy')} style={styles.btnPrivacy}>
        <Text style={styles.textbtn1}>Cài đặt & quyền riêng tư</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('AccountAndSecurity')} style={styles.btnSecurity}>
        <Text style={styles.textbtn1}>Tài khoản & bảo mật</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('HelpAndSupport')} style={styles.btnHelp} >
        <Text style={styles.textbtn1}>Trợ giúp & hỗ trợ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
        <Text style={styles.textbtn}>Đăng xuất</Text>
      </TouchableOpacity>
      </View>
      {/* Hiển thị hộp thoại xác nhận */}
      {showConfirmLogout && (
        <View style={styles.confirmLogoutContainer}>
          <Text style={styles.confirmLogoutText}>Đăng xuất khỏi tài khoản của bạn?</Text>
          <View style={styles.confirmLogoutButtons}>
            <TouchableOpacity style={styles.confirmLogoutButton} onPress={() => setShowConfirmLogout(false)}>
              <Text style={styles.confirmLogoutButtonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmLogoutButton} onPress={confirmLogout}>
              <Text style={styles.confirmLogoutButtonText}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  container: {
    marginTop: 20,
    width: '100%',
    height: 90,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 10,
  },
  imgAvatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignSelf: 'center',
  },
  textName: {
    width: 142,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
    marginTop: 12,
    marginLeft: 16,
    justifyContent: 'center',
  },
  textU: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 14,
    color: '#1877F2',
    marginTop: 33,
    marginLeft: -141,
  },
  userIcon: {
    width: 30,
    height: 30,
    marginLeft: 126,
  },
  bodyBtnIcon: {
    width: '100%',
    height: 60,
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  btnIcon: {
    width: 150,
    height: 60,
    backgroundColor: '#f3f6f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  text0: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
  },
  imgIcon: {
    width: 24,
    height: 24,
  },
  imgIconMmr: {
    width: 24,
    height: 24,
    // quay cả hình sang trái
    transform: [{ rotate: '180deg' }],
  },
  btnHelp: {
    width: '100%',
    height: 60,
    backgroundColor: '#f3f6f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  btnPrivacy: {
    width: '100%',
    height: 60,
    backgroundColor: '#f3f6f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  btnSecurity: {
    width: '100%',
    height: 60,
    backgroundColor: '#f3f6f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  btnLogout: {
    width: '100%',
    height: 60,
    backgroundColor: '#f3f6f4',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  textbtn1: {
    color: '#000000',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 24,
  },
  textbtn: {
    color: '#ff0000',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 24,
  },
  confirmLogoutContainer: {
    position: 'absolute',
    bottom: 240,
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignSelf: 'center',
    borderRadius: 10,
  },
  confirmLogoutText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#000000',
  },
  confirmLogoutButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmLogoutButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
  },
  confirmLogoutButtonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#000000',
  },
  setting:{
    width: '100%',
    position: 'absolute',
    bottom: 0,
  }
});
