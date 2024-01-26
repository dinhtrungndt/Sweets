import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CheckBox from '@react-native-community/checkbox';
import { request, PERMISSIONS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { update } from '../../../services/user/userService';

const Update = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('Ngày sinh');
  const [isMaleChecked, setMaleChecked] = useState(false);
  const [isFemaleChecked, setFemaleChecked] = useState(false);
  const [valuecheck, setValuecheck] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [imageSource1, setImageSource1] = useState(null);

 const handleUpdate = async () => { 
    const data = {
      date,
      valuecheck,
      imageSource,
      imageSource1,
    };
    const response = await update(data);
    if (response.status == 1) {
      navigation.navigate('Update');
      ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Cập nhật thất bại', ToastAndroid.SHORT);
    }
  };



  const layanh = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      } else {
        setImageSource(response.assets[0].uri);
      }
    });
  }
  const layanh2 = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        return;
      } else {
        setImageSource1(response.assets[0].uri);
      }
    });
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
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
    console.log(newMaleChecked ? 'Nam' : '');
  };
  const handleFemaleCheckboxChange = () => {
    const newFemaleChecked = !isFemaleChecked;
    setFemaleChecked(newFemaleChecked);
    setMaleChecked(false);
    setValuecheck(newFemaleChecked ? 'Nữ' : '');
    console.log(newFemaleChecked ? 'Nữ' : '');
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewlogo}>
        <Image style={styles.logo} source={require('../../../assets/logongang.png')} />
      </View>
      <View style={styles.viewlogin}>
        <Text style={styles.txt}>Thông tin cá nhân</Text>
      </View>
      <View style={styles.viewbr}>
        <TouchableOpacity style={styles.br} onPress={layanh}>
          {imageSource === null ? <View style={styles.anhbia}>
            <Image style={styles.imgbr} source={require('../../../assets/bgrw.png')} />
            <Icon name="add-circle-outline" size={30} color="grey" style={styles.add} />
          </View> :
            <View style={styles.anhbia}>
              <Image style={styles.imgbr} source={{ uri: imageSource }} />
            </View>

          }

        </TouchableOpacity>
        <TouchableOpacity onPress={layanh2}>
          {imageSource1 === null ?
            <Icon name="camera-outline" size={30} color="grey" style={styles.avt} /> :
            <Image style={styles.avt1} source={{ uri: imageSource1 }} />
          }
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
      <TouchableOpacity style={styles.button} >
        <Text style={styles.txt3}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  anhbia: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3cc8bf',
    borderRadius: 30,
    marginTop: '3%',
  },
  txt3: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkbbox: {
    width: '90%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',


  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    alignSelf: 'center',

  },
  cb1: {
    color: 'white',
  },
  txt1: {
    color: 'grey',
    fontSize: 17,
  },
  datetime: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    height: 70,
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'grey',
  },
  avt: {
    top: '-70%',
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#d9d9d9',
  },
  avt1: {
    top: '-70%',
    borderRadius: 50,
    width: 70,
    height: 70,

  },
  br: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  imgbr: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewbr: {
    width: '90%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '1%',
  },
  txt: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  viewlogin: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color: 'white',
    fontSize: 20,
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

export default Update;
