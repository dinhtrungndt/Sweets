/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

// library
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SettingStoryObjects = ({cancel, navigation, idObject}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    const selectedId = idObject.find(item => item.name === option);
    // setTimeout(() => {
    //   navigation.navigate('SelectFeeingStory', {selectedId: selectedId});
    // }, 1000);
  };
  return (
    <View style={styles.T}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancel} onPress={cancel}>
          <Ionicons name={'chevron-back'} color={'#000'} size={23} />
        </TouchableOpacity>
        <Text style={styles.text_taotin}>Quyền riêng tư của tin</Text>
        <TouchableOpacity />
      </View>
      {/* gạch ngang */}
      <Text style={styles.lineH} />
      <View style={styles.body}>
        <Text style={[styles.text_taotin, {fontSize: 14}]}>
          Ai có thể xem tin của bạn ?
        </Text>
        <Text
          style={[
            styles.text_taotin,
            {fontSize: 14, fontWeight: '400', color: '#545454'},
          ]}>
          Tin của bạn sẽ hiển thị trên Sweets trong 24 giờ.
        </Text>
        {/* select Object */}
        <View style={styles.selectObjectContainer}>
          {/* Công khai */}
          <TouchableOpacity
            style={styles.body_content}
            onPress={() => handleOptionSelect('Công khai')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.body_content_icon}
                source={require('../../assets/world_all_select.png')}
              />
              <View>
                <Text style={styles.body_content_text}>Công khai</Text>
                <Text style={styles.body_content_text2}>
                  Tất cả người dùng đều thấy, trừ danh sách chặn
                </Text>
              </View>
            </View>
            <View style={styles.radioContainer}>
              {selectedOption === 'Công khai' && (
                <View style={styles.radioSelected} />
              )}
            </View>
          </TouchableOpacity>
          {/* tất cả bạn bè */}
          <TouchableOpacity
            style={styles.body_content}
            onPress={() => handleOptionSelect('Bạn bè')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name={'user-friends'} size={20} color={'#9b9b9b'} />
              <View>
                <Text style={styles.body_content_text}>Bạn bè</Text>
                <Text style={styles.body_content_text2}>
                  Bạn bè trên Sweets, trừ danh sách bị chặn
                </Text>
              </View>
            </View>
            <View style={styles.radioContainer}>
              {selectedOption === 'Bạn bè' && (
                <View style={styles.radioSelected} />
              )}
            </View>
          </TouchableOpacity>
          {/* Chỉ mình tôi */}
          <TouchableOpacity
            style={styles.body_content}
            onPress={() => handleOptionSelect('Chỉ mình tôi')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome5 name={'lock'} size={20} color={'#9b9b9b'} />
              <View style={{paddingLeft: 8}}>
                <Text style={styles.body_content_text}>Chỉ mình tôi</Text>
                <Text style={styles.body_content_text2}>
                  Chỉ mình bạn có thể xem
                </Text>
              </View>
            </View>
            <View style={styles.radioContainer}>
              {selectedOption === 'Chỉ mình tôi' && (
                <View style={styles.radioSelected} />
              )}
            </View>
          </TouchableOpacity>
          {/* Chọn bạn bè cụ thể */}
          <TouchableOpacity
            onPress={() => [
              // navigation.navigate('SelectBB'),
              handleOptionSelect('option3'),
            ]}
            style={styles.body_content}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.body_content_icon}
                source={require('../../assets/icon_account_tich.png')}
              />
              <View>
                <Text style={styles.body_content_text}>Chọn bạn bè cụ thể</Text>
                <Text style={styles.body_content_text2}>
                  Chỉ những người bạn chọn mới có thể xem
                </Text>
              </View>
            </View>
            <Image
              style={styles.body_content_icon2}
              source={require('../../assets/icon_next.png')}
            />
          </TouchableOpacity>
          {/* Bạn bè ngoại trừ */}
          <TouchableOpacity
            style={styles.body_content}
            onPress={() => handleOptionSelect('option4')}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.body_content_icon}
                source={require('../../assets/icon_account_tru.png')}
              />
              <View>
                <Text style={styles.body_content_text}>Bạn bè ngoại trừ</Text>
                <Text style={styles.body_content_text2}>
                  Tất cả bạn bè trừ những người bạn chọn
                </Text>
              </View>
            </View>
            <Image
              style={[styles.body_content_icon2]}
              source={require('../../assets/icon_next.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingStoryObjects;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  text_taotin: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  lineH: {
    width: '100%',
    height: 1,
    backgroundColor: '#e6e6e6',
  },
  body: {
    padding: 16,
  },
  body_content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 13,
    alignItems: 'center',
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  body_content_icon: {
    width: 25,
    height: 25,
    marginTop: 3,
    resizeMode: 'cover',
  },
  body_content_text: {
    fontSize: 16,
    marginLeft: 10,
    color: '#131313',
  },
  body_content_text2: {
    fontSize: 14,
    marginLeft: 10,
    color: '#676767',
  },
  radioContainer: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22b6c0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22b6c0',
  },
  body_content_icon2: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
  },
});
