/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import React, {useState, useContext} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {UserContext} from '../userContext';
import showPassImage from '../../../../media/image/eyaopen.jpg'; // Replace with the actual path
import hidePassImage from '../../../../media/image/eya.png'; // Replace with the actual path
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreens = props => {
  const {navigation} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin} = useContext(UserContext);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  const [isShowPass, setIsShowPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const onLoginPress = async () => {
    setLoading(true);
    const result = await onLogin(email, password);
    if (!result) {
      setLoginError(true);
      setLoginErrorText('Đăng nhập thất bại, Vui lòng kiểm tra lại !');
      Toast.show({
        message: 'Login failed',
        type: 'danger',
        duration: 3000,
        icon: 'auto',
        backgroundColor: 'red',
        color: 'white',
      });
    } else {
      // Đăng nhập thành công, lưu thông tin đăng nhập vào AsyncStorage
      try {
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userPassword', password);
      } catch (error) {
        console.log('Lỗi khi lưu thông tin đăng nhập:', error);
      }
    }
  };

  return (
    <View style={myStyles.body}>
      <Text style={myStyles.again}>Welcome to Sweets</Text>
      <Text style={myStyles.wellcome}>
        Log in and start a chat with someone
      </Text>
      <View style={myStyles.username}>
        <Text style={myStyles.usernameLayble}>Mobile number or email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={myStyles.usernameInput}
        />
      </View>
      <View style={myStyles.pass}>
        <Text style={myStyles.usernameLayble}>Password</Text>
        <View style={myStyles.container}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isShowPass}
            style={myStyles.usernameInput}
          />
          <Text
            onPress={() => setIsShowPass(!isShowPass)}
            style={myStyles.icon}>
            <Image
              source={isShowPass ? hidePassImage : showPassImage}
              style={myStyles.iconImage}
            />
          </Text>
        </View>
        <View style={myStyles.box}>
          <View style={myStyles.remember}>
            <CheckBox />
            <Text>Remeber me</Text>
          </View>
          <View style={myStyles.fogot}>
            <Text style={myStyles.textfogot}>Forgot the password ?</Text>
          </View>
        </View>
      </View>
      <Pressable onPress={onLoginPress} style={myStyles.btnLogin}>
        <Text style={myStyles.textbtn}>{loading ? 'Loading...' : 'Login'}</Text>
      </Pressable>

      <View style={myStyles.dont}>
        <Text>Or</Text>
        <Pressable
          onPress={() => navigation.navigate('SignUpBg')}
          style={myStyles.btnSign}>
          <Text style={myStyles.textbtn}>Create new accout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreens;

const myStyles = StyleSheet.create({
  iconImage: {
    width: 24, // Adjust the width as needed
    height: 24, // Adjust the height as needed
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  container: {
    position: 'relative',
  },
  body: {
    padding: 24,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  hello: {
    fontSize: 48,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: 72,
    letterSpacing: 0.12,
    color: '#050505',
  },
  again: {
    fontSize: 38,
    letterSpacing: 0.12,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: 72,
    flexGrow: 0,
    color: '#1877F2',
  },
  wellcome: {
    width: '90%',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: 0.12,
    color: '#4E4B66',
    marginTop: 4,
  },
  username: {
    marginTop: 12,
    display: 'flex',
    flexdirection: 'column',
    justifycontent: 'flexend',
    alignitems: 'flexstart',
  },
  usernameLayble: {
    width: '100%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#000000',
    marginTop: 16,
  },
  usernameInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#4E4B66',
    borderRadius: 6,
    marginTop: 8,
  },
  CheckBox: {
    width: '50%',
    height: 50,
    // backgroundColor: 'black'
  },
  box: {
    marginTop: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'gray',
    justifyContent: 'space-between',
  },
  fogot: {
    color: 'blue',
    alignItems: 'flex-end',
  },
  textfogot: {
    color: 'blue',
    alignItems: 'flex-end',
  },
  remember: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnLogin: {
    width: '100%',
    height: 50,
    backgroundColor: '#1877F2',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  textbtn: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 24,
  },
  btnSign: {
    width: '100%',
    height: 50,
    backgroundColor: '#2EA931',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  ImgFb: {
    width: 21,
    height: 21,
    marginEnd: 10,
  },
  textor: {
    textAlign: 'center',
    margin: 16,
  },
  dont: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign: {
    color: '#1877F2',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 21,
  },
});
