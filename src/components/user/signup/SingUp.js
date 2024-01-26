/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SingUpScreen = ({ navigation }) => {
  const handlelogin = () => {
    navigation.navigate('LoginScreen');
  };


  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <Image style={styles.logo} source={require('../../../assets/logongang.png')} />
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
        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="grey" />
      </View>
      <View style={styles.viewinput}>
        <TextInput style={styles.input} placeholder="Enter Email" placeholderTextColor="grey" />
      </View>
      <View style={styles.viewinput}>
        <TextInput
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
      <View style={styles.viewinput}>
        <TextInput
          style={styles.input}
          placeholder="Repeat Password"
          placeholderTextColor="grey"
          secureTextEntry={!passwordVisible1}
        />
        <TouchableOpacity onPress={() => setPasswordVisible1(!passwordVisible1)}>
          <Icon
            name={passwordVisible1 ? "eye-off-outline" : "eye-outline"}
            size={30}
            color="grey"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.txt3}>Register</Text>
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

const styles = StyleSheet.create({
  register: {
    color: '#d7bd1e',
    fontSize: 17,
  },
  acc: {
   
    top: '5%',
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
    width: '80%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3cc8bf',
    borderRadius: 30,
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
    marginTop: '-10%',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default SingUpScreen;


