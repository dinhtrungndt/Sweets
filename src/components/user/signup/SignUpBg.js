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
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';

import DatePicker from 'react-native-date-picker';

const SignUpBg = props => {
  const { navigation } = props;

  const [name, setName] = useState('');
  const [ngaysinh, setNgaysinh] = useState(new Date());

  const [gioitinh, setGioitinh] = useState('');

  const [open, setOpen] = useState(false);
  const [formattedNgaysinh, setFormattedNgaysinh] = useState('');

  const onConfirmDate = (date) => {
    setOpen(false);

    // Format the date as 'YYYY-MM-DD'
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // Set the formatted date to the state
    setFormattedNgaysinh(formattedDate);
    // Set the raw Date object to the state if needed
    setNgaysinh(date);
  };

  const handleCheckboxChange = gioitinh => {
    setGioitinh(gioitinh);
  };

  const onSignUp = async () => {
    if (name.trim().length === 0) {
      Alert.alert('Please enter your name');
      return;
    }
    if (!ngaysinh) {
      Alert.alert('Please enter your birthday');
      return;
    }
    if (gioitinh.trim().length === 0) {
      Alert.alert('Please choose your gender');
      return;
    }

    // truyền dữ liệu qua màn hình tiếp theo để gọi api đăng ký
    navigation.navigate('SignUpScreens', {
      name: name,
      ngaysinh: ngaysinh,
      gioitinh: gioitinh,
    });
    console.log(name, ngaysinh, gioitinh, 'okkkkkkkkk')
  };

  return (
    <View style={myStyles.body}>
      <Text style={myStyles.hello}>Welcome to Sweets</Text>
      <View style={myStyles.username}>
        <Text style={myStyles.usernameLayble}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={myStyles.usernameInput}
        />
      </View>
      <View style={myStyles.pass}>
        <Text style={myStyles.usernameLayble}>Birthday</Text>
        <View style={myStyles.container}>
          <Pressable
            style={myStyles.btnDate}
            onPress={() => setOpen(true)}>
            <Image style={myStyles.imgDate} source={require('../../../assets/Date.png')} />
            <TextInput
              value={formattedNgaysinh}
              editable={false}
              placeholder="YYYY-MM-DD"
              style={myStyles.dateInput}
            />
          </Pressable>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={ngaysinh}
            onConfirm={onConfirmDate}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={myStyles.box}>
          <Text style={myStyles.usernameLayble}>Gender</Text>
          <View style={myStyles.remember}>
            <CheckBox
              style={myStyles.CheckBox}
              value={gioitinh === 'female'}
              onValueChange={() => handleCheckboxChange('female')}
            />
            <Text style={myStyles.textCheckbox}>Female</Text>
            <CheckBox
              style={myStyles.CheckBox}
              value={gioitinh === 'male'}
              onValueChange={() => handleCheckboxChange('male')}
            />
            <Text style={myStyles.textCheckbox}>Male</Text>
            <CheckBox
              style={myStyles.CheckBox}
              value={gioitinh === 'other'}
              onValueChange={() => handleCheckboxChange('other')}
            />
            <Text style={myStyles.textCheckbox}>Other</Text>
          </View>
        </View>
      </View>
      <Pressable
        style={myStyles.btnLogin}
        onPress={onSignUp}>
        <Text style={myStyles.textbtn}>Next</Text>
      </Pressable>
    </View>
  );
};

export default SignUpBg;

const myStyles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 10,
    top: 12,
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
    marginTop: 16,
  },
  usernameInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#4E4B66',
    borderRadius: 6,
    marginTop: 8,
  },
  btnDate: {
    width: '100%',
    height: 60,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgDate: {
    width: 42,
    height: 42,
    position: 'absolute',
    left: 3,
    alignItems: 'center',
    top: 8,
  },
  dateInput: {
    width: 285,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#4E4B66",
    borderRadius: 6,
    marginLeft: 60,
    color: '#000000',
    fontSize: 16,
  },
  CheckBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  box: {
    marginTop: 8,
  },
  remember: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  textCheckbox: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
    marginLeft: -45,
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
    fontSize: 16,
    lineHeight: 24,
  },
});
