/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from 'react';
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
import { login } from '../../../services/user/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Style';
import { UserContext } from '../../../contexts/user/userContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const response = await onLogin(email, password);
    if (response) {
      setLoading(false);
      navigation.navigate('Home');
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      console.log(response.status)
    } else {
      setLoading(false);
      ToastAndroid.show(
        'Tài khoản hoặc mật khẩu không chính xác',
        ToastAndroid.SHORT,
      );
    }
  };
  const handleregister = () => {
    navigation.navigate('SingUpScreen');
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logongang.png')}
        />
      </View>
      <View style={styles.viewlogin}>
        <Text style={styles.txt}> Log In</Text>
      </View>
      <View style={styles.viewif}>
        <Text style={styles.txt1}> If You Need Any Support </Text>
        <TouchableOpacity>
          <Text style={styles.txt2}>Click Here</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewinput}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          value={email}
          onChangeText={setEmail}
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
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={30}
            color="grey"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.txt1}> Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.txt3}>Log In</Text>
        )}
      </TouchableOpacity>
      <View style={styles.acc}>
        <Text style={styles.txt1}> Don't have an account? </Text>
        <TouchableOpacity onPress={handleregister}>
          <Text style={styles.register}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
