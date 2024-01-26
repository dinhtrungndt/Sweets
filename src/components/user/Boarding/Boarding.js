import { Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BoardingScreens = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const checkToken = async () => {

    try {
      setLoading(true);
      // Lấy giá trị token từ AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');
      if (token == null) {
        setLoading(false);
      } else {
        navigation.replace('Update');
        return;
      }
    } catch (error) {
      setLoading(false);
      console.error('Lỗi khi kiểm tra token:', error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  const handlelogin = () => {
    navigation.navigate('LoginScreen');
  }
  const handleSignup = () => {
    navigation.navigate('SingUpScreen');
  }

  return (
    <View style={styles.container}>
      {loading ? <View>
        <ActivityIndicator size="large" color="blue" />
      </View> :
        <View style={styles.load}>
          <View style={styles.viewlogo}>
            <Image style={styles.logo} source={require('../../../assets/logongang.png')} />
          </View>
          <View style={styles.viewpeple}>
            <Image style={styles.imgpeople} source={require('../../../assets/peoples.png')} />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.txt}> Sign Up Free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewlogin} onPress={handlelogin}>
            <Text style={styles.login}> Login</Text>
          </TouchableOpacity>
        </View>}
    </View>
  );
};
export default BoardingScreens;
const styles = StyleSheet.create({
  load: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgpeople: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewlogin: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '5%',
  },
  login: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'

  },
  txt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3cc8bf',
    borderRadius: 30,
    top: '5%',
  },
  logo: {
    width: '70%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewlogo: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-10%',
  },
  viewpeple: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  }
});
