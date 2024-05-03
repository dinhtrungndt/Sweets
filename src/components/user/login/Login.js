/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useContext} from 'react';
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
import {login} from '../../../services/user/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Style';
<<<<<<< HEAD
import {UserContext} from '../../../contexts/user/userContext';
import {onUserLogin} from '../../call/HomeTest';
import {getUser} from '../../../services/user/userService';
import {useTranslation} from 'react-i18next';

const LoginScreen = ({navigation}) => {
=======
import { UserContext } from '../../../contexts/user/userContext';

const LoginScreen = ({ navigation }) => {
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogin} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const {user} = useContext(UserContext);
  const {t, i18n} = useTranslation();
=======
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf

  const handleLogin = async () => {
    setLoading(true);
    const response = await onLogin(email, password);
    if (response) {
      setLoading(false);
<<<<<<< HEAD
      console.log('kiểm tra user', user);
=======
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      console.log(response.status);
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
        <Text style={styles.txt}>{t('')}</Text>
      </View>
      <View style={styles.viewif}>
        <Text style={styles.txt1}> {t('ifYouNeedSupport')} </Text>
        <TouchableOpacity>
          <Text style={styles.txt2}>{t('clickHere')}</Text>
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
          placeholder="Mật khẩu"
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
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgetPassword')}
        style={styles.forgot}>
        <Text style={styles.txt1}> {t('forgotPassword')}?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.txt3}>{t('login')}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.acc}>
        <Text style={styles.txt1}> {t('dontHaveAnAccount')} </Text>
        <TouchableOpacity onPress={handleregister}>
          <Text style={styles.register}>{t('register')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
