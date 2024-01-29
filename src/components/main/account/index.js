/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Pressable, Image, Button} from 'react-native';
import React, { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../contexts/user/userContext';

const AccountScreen = (props) => {
  const { navigation } = props;

  const { onLogout } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleLogout = async () => {
    setLoading(true);
    const result = await onLogout();
    if (!result) {
      setError(true);
      setErrorText('Đăng xuất thất bại, Vui lòng kiểm tra lại !');
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
      <View style={styles.container}>
        <Image style={styles.imgAvatar} source={require('../../../assets/dog.jpg')}/>
        <Text style={styles.textName}>Nguyễn Phúc Chinh</Text>
        <Text style={styles.textU}>Xem trang cá nhân</Text>
      </View>
      <View style={styles.bodyBtnIcon}>
        <Pressable style={styles.btnIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon_image2.png')}/>
          <Text style={styles.text0}>Ảnh</Text>
        </Pressable>
        <Pressable style={styles.btnIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon_video.png')}/>
          <Text style={styles.text0}>Video</Text>
        </Pressable>
        <Pressable style={styles.btnIcon}>
          <Image style={styles.imgIconMmr} source={require('../../../assets/icon_memories.png')}/>
          <Text style={styles.text0}>Kỷ niệm</Text>
        </Pressable>
        <Pressable style={styles.btnIcon}>
          <Image style={styles.imgIcon} source={require('../../../assets/icon_image2.png')}/>
          <Text style={styles.text0}>Đã lưu</Text>
        </Pressable>
      </View>
      <Pressable style={styles.btnHelp} onPress={handleLogout}>
        <Text style={styles.textbtn1}>Trợ giúp và hỗ trợ</Text>
      </Pressable>
      <Pressable style={styles.btnPrivacy} onPress={handleLogout}>
        <Text style={styles.textbtn1}>Cài đặt và quyền riêng tư</Text>
      </Pressable>
      <Pressable style={styles.btnSecurity} onPress={handleLogout}>
        <Text style={styles.textbtn1}>Tài khoản và bảo mật</Text>
      </Pressable>
      <Pressable style={styles.btnLogout} onPress={handleLogout}>
        <Text style={styles.textbtn}>Đăng xuất</Text>
      </Pressable>
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
    width: '100%',
    height: 270,
    position: 'asolute',
  },
  imgAvatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 60,
    alignSelf: 'center',
  },
  textName: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    marginTop: 12,
    color: '#000000',
  },
  textU: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: '#1877F2',
  },
  bodyBtnIcon: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnIcon: {
    width: 120,
    height: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 16,
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 180,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  btnPrivacy: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  btnSecurity: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  btnLogout: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
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
});
