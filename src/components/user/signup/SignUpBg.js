/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';

// import DateTimePicker from '@react-native-community/datetimepicker';
// import DatePicker from 'react-native-datepicker'
import DatePicker from 'react-native-date-picker';
import {register} from '../../../services/user/userService';

const SignUpBg = props => {
  const {navigation} = props;

  const [name, setName] = useState('');
  const [ngaysinh, setNgaysinh] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [gioitinh, setGioitinh] = useState('');

  const handleDateChange = (event, date) => {
    if (date) {
      // Parse the date string
      const parsedDate = new Date(date);

      // Extract the day
      const day = parsedDate.getDate();

      // Update the state with the day
      setNgaysinh(day.toString());
    }
  };

  const handleCheckboxChange = gioitinh => {
    setGioitinh(gioitinh);
  };

  const onSignUp = async () => {
    if (name.trim().length === 0) {
      Alert.alert('Please enter your name');
      return;
    }
    if (ngaysinh.trim().length === 0) {
      Alert.alert('Please enter your birthday');
      return;
    }
    if (gioitinh.trim().length === 0) {
      Alert.alert('Please choose your gender');
      return;
    }

    // gọi api đăng ký
    const result = await register(name, ngaysinh, gioitinh, email, password);
    console.log('register result: ', result);
    if (result.status === 1) {
      navigation.navigate('LoginScreens');
    } else {
      Alert.alert('Register failer!:');
    }
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
          {/* <TextInput
            value={ngaysinh}
            onChangeText={setNgaysinh}
            onValueChange={handleDateChange}
            placeholder="YYYY-MM-DD"
            style={myStyles.usernameInput}>
          </TextInput> */}
          {/* <DatePicker
            style={myStyles.datePicker}
            value={ngaysinh}
            mode="date"
            placeholder=""
            format="YYYY-MM-DD"
            minDate="1945-01-01"
            maxDate="2024-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderWidth: 0,
                marginLeft: 36,
              },
            }}
            onChange={handleDateChange}
          /> */}
          <Button title="Open" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            mode="date"
            open={open}
            date={ngaysinh}
            onConfirm={date => {
              setOpen(false);
              setNgaysinh(date);
            }}
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
        onPress={() => navigation.navigate('SignUpScreens')}>
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
  datePicker: {
    width: '100%',
    marginTop: 8,
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
