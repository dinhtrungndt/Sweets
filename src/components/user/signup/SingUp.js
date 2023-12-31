/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';

import showPassImage from '../../../../media/image/eyaopen.jpg'; // Replace with the actual path
import hidePassImage from '../../../../media/image/eya.png'; // Replace with the actual path

const SignUpScreens = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowPass2, setIsShowPass2] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasswrod, setConfirmPassword] = useState('');

  return (
    <View style={myStyles.body}>
      <Text style={myStyles.hello}>Welcome to Sweets</Text>
      {/* <Text style={myStyles.wellcome}>
        Signup to get Started
      </Text> */}
      <View style={myStyles.username}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={myStyles.usernameInput}
          placeholder="Email hoặc số điện thoại"
        />
      </View>
      <View style={myStyles.pass}>
        <Text style={myStyles.usernameLayble}>Password*</Text>
        <View style={myStyles.container}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isShowPass}
            style={myStyles.usernameInput}
            placeholder="Mật khẩu"
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

        <Text style={myStyles.usernameLayble}>Confirm Password*</Text>
        <View style={[myStyles.container, {marginTop: 10}]}>
          <TextInput
            value={confirmPasswrod}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isShowPass2}
            style={myStyles.usernameInput}
            placeholder="Xác nhận mật khẩu"
          />
          <Text
            onPress={() => setIsShowPass2(!isShowPass2)}
            style={myStyles.icon}>
            <Image
              source={isShowPass2 ? hidePassImage : showPassImage}
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
      <Pressable style={myStyles.btnLogin}>
        <Text style={myStyles.textbtn}>Sign Up</Text>
      </Pressable>
      <View>
        <Text style={myStyles.textor}>or continue with</Text>
      </View>
      <View style={myStyles.FbandGg}>
        <Pressable style={myStyles.BtnFb}>
          <Image
            style={myStyles.ImgFb}
            source={require('../../../../media/image/fb.png')}
          />
          <Text>Facebook</Text>
        </Pressable>
        <Pressable style={myStyles.BtnFb}>
          <Image
            style={myStyles.ImgFb}
            source={require('../../../../media/image/gg.png')}
          />
          <Text>Google</Text>
        </Pressable>
      </View>
      <View style={myStyles.dont}>
        <Text>don't have an account ? </Text>
        <Text style={myStyles.sign}>Login </Text>
      </View>
    </View>
  );
};

export default SignUpScreens;

const myStyles = StyleSheet.create({
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
    fontSize: 38,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: 72,
    letterSpacing: 0.12,
    color: '#1877F2',
  },
  again: {
    fontSize: 48,
    letterSpacing: 0.12,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: 72,
    flexGrow: 0,
    color: '#1877F2',
  },
  wellcome: {
    width: '80%',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0.12,
    color: '#4E4B66',
    marginTop: 4,
  },
  username: {
    marginTop: 24,
    display: 'flex',
    flexdirection: 'column',
    justifycontent: 'flexend',
    alignitems: 'flexstart',
  },
  usernameLayble: {
    width: '100%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#4E4B66',
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
    fontSize: 16,
    lineHeight: 24,
  },
  FbandGg: {
    flexDirection: 'row',
    marginTop: 8,
  },
  BtnFb: {
    flexDirection: 'row',
    width: 160,
    height: 40,
    backgroundColor: '#EEF1F4',
    margin: 6,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgFb: {
    width: 21,
    height: 21,
    marginEnd: 10,
  },
  img: {
    // position:'absolute',
    // left:10,
    // top: 10
    margin: 10,
  },
  textor: {
    textAlign: 'center',
    margin: 16,
  },
  dont: {
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sign: {
    color: '#1877F2',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 21,
  },
  iconImage: {
    width: 20, // Adjust the width as needed
    height: 20, // Adjust the height as needed
  },
});
