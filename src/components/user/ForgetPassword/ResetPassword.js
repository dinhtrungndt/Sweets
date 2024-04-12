import { View, Text, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { resetPassword } from '../../../services/user/userService'
// styles
import { styles } from './StyleRsPass'
import { useTranslation } from 'react-i18next';

const ResetPassword = ({ navigation, route }) => {
  const { email, otp } = route.params;
  console.log('ResetPassword email:', email);
  console.log('ResetPassword otp:', otp);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t, i18n } = useTranslation();

  const handleResetPassword = async () => {
    if (password === '') {
        Alert.alert('Password is required');
        return;
    }
    if (confirmPassword === '') {
        Alert.alert('Confirm Password is required');
        return;
    }
    if (password !== confirmPassword) {
        Alert.alert('Password and Confirm Password do not match');
        return;
    }
    setLoading(true);
    try {
        const res = await resetPassword(email, otp, password);
        if (res.status === 1) {
            Alert.alert('Error');
        } else {
            Alert.alert('Success', res.message);
            setPassword('');
            setConfirmPassword('');
            navigation.navigate('LoginScreen');
        }
    } catch (error) {
        console.log('ResetPassword error: ', error);
        Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
        setLoading(false);
    }
};

  return (
    <View>
      <TouchableOpacity>
        <MaterialIcons
          style={styles.imgBack}
          name='arrow-back'
          color={'#000000'}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <View style={styles.viewlogo}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logongang.png')}
        />
      </View>
      <View style={styles.viewif}>
        <Text style={styles.txt1}>{t('createANewPassword')}</Text>
      </View>
      <View style={styles.viewinput}>
        <TextInput style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
          value={password}
          onChangeText={(text) => setPassword(text)}
        >
        </TextInput>
      </View>
      <View style={styles.viewinput2}>
        <TextInput style={styles.input2}
          placeholder="Confirm Password"
          placeholderTextColor="grey"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        >
        </TextInput>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.txt3}>{t('verify')}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default ResetPassword