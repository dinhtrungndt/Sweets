/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { register } from '../../../services/user/userService';
import { UserContext } from '../../../contexts/user/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Style';
const SingUpScreen = ({ navigation }) => {
  const { onLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conformpassword, setConformpassword] = useState('');
  const [gender, setGioitinh] = useState('null');
  const [date, setNgaysinh] = useState('null');
  const [token, setToken] = useState('null');
  const [avatar, setAvatar] = useState('https://res.cloudinary.com/dwxly01ng/image/upload/v1709527273/account_vpss3t.png');
  const [coverImage, setAnhbia] = useState('null');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleRegister = async () => {
    setLoading(true);
    try {
      const data = {
        name,
        email,
        token,
        password,
        gender,
        date,
        avatar,
        coverImage,
      };
      if (!name || !email || !password || !conformpassword || name == '' || email == '' || password == '' || conformpassword == '' || !name.trim() || !email.trim() || !password.trim() || !conformpassword.trim()) {
        ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      if (!email.trim() || !emailRegex.test(email.trim())) {
        ToastAndroid.show('Vui lòng nhập một địa chỉ email hợp lệ', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      if (password != conformpassword) {
        ToastAndroid.show('Nhập lại mật khẩu không khớp', ToastAndroid.SHORT);
        setLoading(false);
        return;
      }
      const response = await register(data);
      if (response.status == 1) {
        setLoading(false);
        ToastAndroid.show('Đăng ký thành công', ToastAndroid.SHORT);
        const response1 = await onLogin(email, password);
        if (response1) {
          setLoading(false);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
          ToastAndroid.show('Đăng nhập thành công vui lòng chờ 1 chút để đăng nhập', ToastAndroid.SHORT);
          await AsyncStorage.setItem('userEmail', email);
          await AsyncStorage.setItem('userPassword', password);
          console.log(response.status)
        }
      }
      if (response.status == 0) {
        setLoading(false);
        ToastAndroid.show('Email đã tồn tại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('register: ', error);
      setLoading(false);
      return error;
    }
  };

  const handlelogin = () => {
    navigation.navigate('LoginScreen');
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logongang.png')}
        />
      </View>
      <View>
        <Text style={styles.txt}>Register</Text>
      </View>
      <View style={styles.viewif}>
        <Text style={styles.txt1}> If You Need Any Support </Text>
        <TouchableOpacity>
          <Text style={styles.txt2}>Click Here</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewinput}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="grey"
        />
      </View>
      <View style={styles.viewinput}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="grey"
        />
      </View>
      <View style={styles.viewinput}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={30}
            color="grey"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewinput}>
        <TextInput
          value={conformpassword}
          onChangeText={setConformpassword}
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="grey"
          secureTextEntry={!passwordVisible1}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible1(!passwordVisible1)}>
          <Icon
            name={passwordVisible1 ? 'eye-outline' : 'eye-off-outline'}
            size={30}
            color="grey"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.txt3}>Register</Text>
        )}
      </TouchableOpacity>
      <View style={styles.acc}>
        <Text style={styles.txt1}>have an account? </Text>
        <TouchableOpacity onPress={handlelogin}>
          <Text style={styles.register}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingUpScreen;
