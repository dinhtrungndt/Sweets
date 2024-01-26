import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text, ActivityIndicator, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { login } from '../../../services/user/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const data = {
      email,
      password,
    };
    const response = await login(data);
    if (response.status == 1) {
      setLoading(false);
      navigation.navigate('Update');
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
      // lưu token và id vào storange
      // Xoá token cũ nếu tồn tại
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('id');

      // Lưu token mới vào AsyncStorage
      await AsyncStorage.setItem('token', response.token);
      await AsyncStorage.setItem('id', response.id);
    } else {
      setLoading(false);
      ToastAndroid.show('Tài khoản hoặc mật khẩu không chính xác', ToastAndroid.SHORT);
    }
  };
  const handleregister = () => {
    navigation.navigate('SingUpScreen');
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <Image style={styles.logo} source={require('../../../assets/logongang.png')} />
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
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="grey" value={email} onChangeText={setEmail} />
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
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
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

const styles = StyleSheet.create({
  viewlogin: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '3%',
  },
  register: {
    color: '#d7bd1e',
    fontSize: 17,
  },
  acc: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt3: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3cc8bf',
    borderRadius: 30,
    top: '2%',
  },
  forgot: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '10%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 70,
    paddingLeft: '5%',
    paddingRight: '5%',
    color: 'grey',
    fontSize: 17,
  },
  viewinput: {
    flexDirection: 'row',
    width: '90%',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5%',
    borderWidth: 1.5,
    borderColor: 'grey',
    borderRadius: 25,
  },
  viewif: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '5%',
  },
  txt1: {
    color: 'white',
    fontSize: 17,
  },
  txt2: {
    color: '#0ad3c7',
    fontSize: 17,
  },
  txt: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  logo: {
    width: '70%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewlogo: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-40%',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default LoginScreen;
