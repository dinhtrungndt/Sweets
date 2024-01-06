<<<<<<< HEAD
import { Image, StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
=======
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
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
import CheckBox from '@react-native-community/checkbox';

import showPassImage from '../../../../media/image/eyaopen.jpg'; // Replace with the actual path
import hidePassImage from '../../../../media/image/eya.png'; // Replace with the actual path

<<<<<<< HEAD
const SignUpScreens = (props) => {
  const { navigation } = props;

=======
const SignUpScreens = () => {
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowPass2, setIsShowPass2] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasswrod, setConfirmPassword] = useState('');

  const onSignUp = async () => {
    if (email.trim().length === 0) {
      Alert.alert('Please enter your email');
      return;
    }
    if (password.trim().length === 0) {
      Alert.alert('Please enter your password');
      return;
    }
    if (confirmPasswrod.trim().length === 0) {
      Alert.alert('Please enter your confirm password');
      return;
    }
    if (password !== confirmPasswrod) {
      Alert.alert('Confirm password not match');
      return;
    }

    // gọi api đăng ký
    const result = await register(email, password);
    console.log('aaaaa', result);
    if (result.status === 1) {
      Alert.alert('Register success!');
      navigation.navigate('SignUpBg');
    } else {
      Alert.alert('Register failer!:')
    }



  }


  return (
    <View style={myStyles.body}>
      <Text style={myStyles.hello}>Welcome to Sweets</Text>
      <View style={myStyles.username}>
<<<<<<< HEAD
        <Text style={myStyles.usernameLayble}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={myStyles.usernameInput}>
        </TextInput>
=======
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={myStyles.usernameInput}
          placeholder="Email hoặc số điện thoại"
        />
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
      </View>
      <View style={myStyles.pass}>
        <Text style={myStyles.usernameLayble}>Password</Text>
        <View style={myStyles.container}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isShowPass}
<<<<<<< HEAD
            style={myStyles.usernameInput}>
          </TextInput>
=======
            style={myStyles.usernameInput}
            placeholder="Mật khẩu"
          />
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8

          <Text
            onPress={() => setIsShowPass(!isShowPass)}
            style={myStyles.icon}>
            <Image
              source={isShowPass ? hidePassImage : showPassImage}
              style={myStyles.iconImage}
            />
          </Text>
        </View>

<<<<<<< HEAD
        <Text style={myStyles.usernameLayble}>Confirm Password</Text>
        <View style={[myStyles.container, { marginTop: 0 }]}>
=======
        <Text style={myStyles.usernameLayble}>Confirm Password*</Text>
        <View style={[myStyles.container, {marginTop: 10}]}>
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
          <TextInput
            value={confirmPasswrod}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isShowPass2}
<<<<<<< HEAD
            style={myStyles.usernameInput}>
          </TextInput>
=======
            style={myStyles.usernameInput}
            placeholder="Xác nhận mật khẩu"
          />
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
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
            <Text>I agree to</Text>
          </View>
          <View style={myStyles.fogot}>
            <Text style={myStyles.textfogot}>terms of use Sweets </Text>
          </View>
        </View>
      </View>
<<<<<<< HEAD
      <Pressable
        style={myStyles.btnLogin} 
        onPress={onSignUp}>
        <Text style={myStyles.textbtn}>Sign Up</Text>
      </Pressable>
      <View style={myStyles.dont}>
        <Text>Or </Text>
        <Pressable style={myStyles.btnSign}
          onPress={() => navigation.navigate('LoginScreens')}>
          <Text style={myStyles.textbtn}>Login</Text>
        </Pressable>
=======
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
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
      </View>
    </View>
  );
};

export default SignUpScreens;

const myStyles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 10,
<<<<<<< HEAD
    top: 12
=======
    top: 12,
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
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
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.12,
<<<<<<< HEAD
    color: '#000000',
    marginTop: 16
=======
    color: '#4E4B66',
    marginTop: 16,
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
  },
  usernameInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
<<<<<<< HEAD
    borderColor: "#4E4B66",
    borderRadius: 6,
    marginTop: 8,
=======
    borderColor: '#4E4B66',
    borderRadius: 6,
  },
  CheckBox: {
    width: '50%',
    height: 50,
    // backgroundColor: 'black'
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
  },
  box: {
    marginTop: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'gray',
<<<<<<< HEAD
=======
    justifyContent: 'space-between',
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
  },
  fogot: {
    color: 'blue',
    alignItems: 'flex-end',
<<<<<<< HEAD
    marginLeft: 4.5

=======
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
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
  btnSign: {
    width: '100%',
    height: 50,
    backgroundColor: '#2EA931',
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
<<<<<<< HEAD
=======
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
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
  textor: {
    textAlign: 'center',
    margin: 16,
  },
  dont: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
<<<<<<< HEAD
=======
    flexDirection: 'row',
>>>>>>> edca9b86d1b16d4d7790162530ce6368ff533ff8
  },
  sign: {
    color: '#1877F2',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 21,
  },
  iconImage: {
    width: 24, // Adjust the width as needed
    height: 24, // Adjust the height as needed
  },
});
