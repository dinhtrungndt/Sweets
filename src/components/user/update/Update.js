/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
import { request, PERMISSIONS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Style';
const Update = ({ route, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('Ngày sinh');
  const [isMaleChecked, setMaleChecked] = useState(false);
  const [isFemaleChecked, setFemaleChecked] = useState(false);
  const [valuecheck, setValuecheck] = useState('');
  const [imageSource0, setImageSource0] = useState(null);
  const [imageSource1, setImageSource1] = useState(null);
  const [loading, setLoading] = useState(false);
  const { email } = route.params;
  const layanh0 = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      } else {
        setImageSource0(response.assets[0].uri);
      }
    });
  };
  const layanh2 = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      } else {
        setImageSource1(response.assets[0].uri);
      }
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // dịch sang tiếng việt
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    setDate(date.toLocaleDateString('vi-VN', options));

    hideDatePicker();
  };
  const handleMaleCheckboxChange = () => {
    const newMaleChecked = !isMaleChecked;
    setMaleChecked(newMaleChecked);
    setFemaleChecked(false);
    setValuecheck(newMaleChecked ? 'Nam' : '');
  };
  const handlenext = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  }
  const handleUpdateanhbia = async () => {
    const data = new FormData();
    setLoading(true);
    let uploadSuccess = false;
    try {
      if (valuecheck == '' || date == 'Ngày sinh') {
        alert('Vui lòng nhập ngày sinh và giới tính là bắt buộc');
        setLoading(false);
        return;
      } else if (imageSource0 === null && imageSource1 === null) {
        data.append('email', email);
        data.append('date', date);
        data.append('gender', valuecheck);
        const response = await fetch(
          'https://sweets-nodejs.onrender.com/users/update-profile',
          {
            method: 'POST',
            body: data,
          },
        );
        const responseJson = await response.json();
        console.log(responseJson);
        uploadSuccess = true;
      } else if (imageSource0 === null) {
        data.append('avatar', {
          name: 'image.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? imageSource1
              : imageSource1.replace('file://', 'null'),
        });
        data.append('email', email);
        data.append('date', date);
        data.append('gender', valuecheck);
        const response = await fetch(
          'https://sweets-nodejs.onrender.com/users/update-profile',
          {
            method: 'POST',
            body: data,
          },
        );
        const responseJson = await response.json();
        console.log(responseJson);
        console.log(response.status);
        uploadSuccess = true;
      } else if (imageSource1 === null) {
        console.log('imageSource0', imageSource0, email, date, valuecheck);
        data.append('coverImage', {
          name: 'image.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? imageSource0
              : imageSource0.replace('file://', 'null'),
        });
        data.append('email', email);
        data.append('date', date);
        data.append('gender', valuecheck);
        const response = await fetch(
          'https://sweets-nodejs.onrender.com/users/update-profile',
          {
            method: 'POST',
            body: data,
          },
        );
        const responseJson = await response.json();
        console.log(responseJson);
        response.status == 1;
        setLoading(true);
        uploadSuccess = true;
      } else {
        data.append('email', email);
        data.append('date', date);
        data.append('gender', valuecheck);
        data.append('coverImage', {
          name: 'image.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? imageSource0
              : imageSource0.replace('file://', 'null'),
        });
        data.append('avatar', {
          name: 'image.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? imageSource1
              : imageSource1.replace('file://', 'null'),
        });
        const response = await fetch(
          'https://sweets-nodejs.onrender.com/users/update-profile',
          {
            method: 'POST',
            body: data,
          },
        );
        const responseJson = await response.json();
        console.log(responseJson);
        uploadSuccess = true;
      }

      if (uploadSuccess) {
        setLoading(false);
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        // chuyển sang màn hình mới
        navigation.replace('LoginScreen')
      } else {
        setLoading(false);
        alert('Cập nhật thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  const handleFemaleCheckboxChange = () => {
    const newFemaleChecked = !isFemaleChecked;
    setFemaleChecked(newFemaleChecked);
    setMaleChecked(false);
    setValuecheck(newFemaleChecked ? 'Nữ' : '');
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logongang.png')}
        />
      </View>
      <View style={styles.viewlogin}>
        <Text style={styles.txt}>Thông tin cá nhân</Text>
      </View>
      <View style={styles.viewbr}>
        <TouchableOpacity style={styles.br} onPress={layanh0}>
          {imageSource0 === null ? (
            <View style={styles.anhbia}>
              <Image
                style={styles.imgbr}
                source={require('../../../assets/bgrw.png')}
              />
              <Icon
                name="add-circle-outline"
                size={30}
                color="grey"
                style={styles.add}
              />
            </View>
          ) : (
            <View style={styles.anhbia}>
              <Image style={styles.imgbr} source={{ uri: imageSource0 }} />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={layanh2}>
          {imageSource1 === null ? (
            <Icon
              name="camera-outline"
              size={30}
              color="grey"
              style={styles.avt}
            />
          ) : (
            <Image style={styles.avt1} source={{ uri: imageSource1 }} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={showDatePicker} style={styles.datetime}>
        <Text style={styles.txt1}>{date}</Text>
        <Icon name="calendar-outline" size={30} color="white" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <View style={styles.checkbbox}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isMaleChecked}
            onValueChange={handleMaleCheckboxChange}
            style={styles.checkbox}
            tintColors={{ true: 'yellow', false: 'white' }}
          />
          <Text style={styles.cb1}>Nam</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isFemaleChecked}
            onValueChange={handleFemaleCheckboxChange}
            style={styles.checkbox}
            tintColors={{ true: 'white', false: 'white' }}
          />
          <Text style={styles.cb1}>Nữ</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleUpdateanhbia}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.txt3}>Cập nhật</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlenext}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.txt3}>Bỏ qua</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Update;
