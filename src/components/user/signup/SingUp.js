import { Image, StyleSheet, Text, TextInput, View, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CheckBox from '@react-native-community/checkbox';

import showPassImage from '../../../../media/image/eyaopen.jpg'; // Replace with the actual path
import hidePassImage from '../../../../media/image/eya.png'; // Replace with the actual path

const SignUpScreens = (props) => {
  const { navigation } = props;

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
        <Text style={myStyles.usernameLayble}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={myStyles.usernameInput}>
        </TextInput>
      </View>
      <View style={myStyles.pass}>
        <Text style={myStyles.usernameLayble}>Password</Text>
        <View style={myStyles.container}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isShowPass}
            style={myStyles.usernameInput}>
          </TextInput>

          <Text
            onPress={() => setIsShowPass(!isShowPass)}
            style={myStyles.icon}>
            <Image
              source={isShowPass ? hidePassImage : showPassImage}
              style={myStyles.iconImage}
            />
          </Text>
        </View>

        <Text style={myStyles.usernameLayble}>Confirm Password</Text>
        <View style={[myStyles.container, { marginTop: 0 }]}>
          <TextInput
            value={confirmPasswrod}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isShowPass2}
            style={myStyles.usernameInput}>
          </TextInput>
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
      </View>
    </View>
  );
};

export default SignUpScreens;

const myStyles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 10,
    top: 12
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
    color: '#000000',
    marginTop: 16
  },
  usernameInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: "#4E4B66",
    borderRadius: 6,
    marginTop: 8,
  },
  box: {
    marginTop: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'gray',
  },
  fogot: {
    color: 'blue',
    alignItems: 'flex-end',
    marginLeft: 4.5

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
  iconImage: {
    width: 24, // Adjust the width as needed
    height: 24, // Adjust the height as needed
  },
});
