import { Image, StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native'
import React, { useState, useContext } from 'react';
import CheckBox from '@react-native-community/checkbox';

import showPassImage from '../../../../media/image/eyaopen.jpg'; // Replace with the actual path
import hidePassImage from '../../../../media/image/eya.png'; // Replace with the actual path

const LoginScreens = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  return (
    <View style={myStyles.body}>
      <Text style={myStyles.again}>Welcome to Sweets</Text>
      <Text style={myStyles.wellcome}>
        Log in and start a chat with someone
      </Text>
      <View style={myStyles.username}>
        <Text style={myStyles.usernameLayble}>Email or Phone*</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          style={myStyles.usernameInput}
          placeholder='Email hoặc số điện thoại'>
        </TextInput>
      </View>
      <View style={myStyles.pass}>
        <Text style={myStyles.usernameLayble}>Password*</Text>
        <View style={myStyles.container}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={myStyles.usernameInput}
            placeholder='Mật khẩu'>

          </TextInput>
          <Image style={myStyles.icon} source={require('../../../../media/image/eya.png')}></Image>
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
      <Pressable
        style={myStyles.btnLogin} >
        <Text style={myStyles.textbtn}>
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </Pressable>
      <View>
        <Text style={myStyles.textor}>or continue with</Text>
      </View>
      <View style={myStyles.FbandGg}>
        <Pressable style={myStyles.BtnFb}>
          <Image style={myStyles.ImgFb} source={require('../../../../media/image/fb.png')} />
          <Text>Facebook</Text>
        </Pressable>
        <Pressable style={myStyles.BtnFb}>
          <Image style={myStyles.ImgFb} source={require('../../../../media/image/gg.png')} />
          <Text>Google</Text>
        </Pressable>
      </View>
      <View style={myStyles.dont}>
        <Text>don't have an account ?  </Text>
        <Text
          style={myStyles.sign}>Sign Up  </Text>
      </View>
    </View>
  )
};

export default LoginScreens;

const myStyles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 10,
    top: 12

  },
  container: {
    position: "relative"
  },
  body: {
    padding: 24,
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  hello: {
    fontSize: 48,
    fontFamily: "Poppins",
    fontStyle: 'normal',
    lineHeight: 72,
    letterSpacing: 0.12,
    color: '#050505'
  },
  again: {
    fontSize: 38,
    letterSpacing: 0.12,
    fontFamily: "Poppins",
    fontStyle: 'normal',
    lineHeight: 72,
    flexGrow: 0,
    color: '#1877F2'
  },
  wellcome: {
    width: '90%',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: 0.12,
    color: '#4E4B66',
    marginTop: 4
  },
  username: {
    marginTop: 12,
    display: 'flex',
    flexdirection: 'column',
    justifycontent: 'flexend',
    alignitems: 'flexstart',

  },
  usernameLayble: {
    width: "100%",
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#4E4B66',
    marginTop: 16
  },
  usernameInput: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: "#4E4B66",
    borderRadius: 6
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
    justifyContent: 'space-between'
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
  FbandGg: {
    flexDirection: 'row',
    marginTop: 8
  },
  BtnFb: {
    flexDirection: 'row',
    width: 160,
    height: 40,
    backgroundColor: '#EEF1F4',
    margin: 6,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ImgFb: {
    width: 21,
    height: 21,
    marginEnd: 10
  },
  textor: {
    textAlign: 'center',
    margin: 16
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
  }
})
