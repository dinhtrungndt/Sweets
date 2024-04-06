/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {styles} from '../../styles/select';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SelectScreenUp = ({navigation, route}) => {
  const idObject = route.params?.idObject;

  // console.log('>>>>>>>>>>.SelectScreenUp ---- idObject', idObject);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = option => {
    setSelectedOption(option);
    const selectedId = idObject.find(item => item.name === option);
    navigation.navigate('AddsScreenStack', {selectedId: selectedId});
  };

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../../../../assets/icon_delete_white.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Quyền xem</Text>
      </View>
      {/* body */}
      <View style={styles.body}>
        {/* Công khai */}
        <TouchableOpacity
          style={styles.body_content}
          onPress={() => handleOptionSelect('Công khai')}>
          <View style={styles.radioContainer}>
            {selectedOption === 'Công khai' && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Image
            style={styles.body_content_icon}
            source={require('../../../../../../assets/world_all_select.png')}
          />
          <View>
            <Text style={styles.body_content_text}>Công khai</Text>
            <Text style={styles.body_content_text2}>
              Tất cả người dùng đều thấy, trừ danh sách chặn
            </Text>
          </View>
        </TouchableOpacity>
        {/* tất cả bạn bè */}
        <TouchableOpacity
          style={styles.body_content}
          onPress={() => handleOptionSelect('Bạn bè')}>
          <View style={styles.radioContainer}>
            {selectedOption === 'Bạn bè' && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <FontAwesome5 name={'user-friends'} size={20} color={'#9b9b9b'} />
          <View>
            <Text style={styles.body_content_text}>Bạn bè</Text>
            <Text style={styles.body_content_text2}>
              Bạn bè trên Sweets, trừ danh sách bị chặn
            </Text>
          </View>
        </TouchableOpacity>
        {/* Chỉ mình tôi */}
        <TouchableOpacity
          style={styles.body_content}
          onPress={() => handleOptionSelect('Chỉ mình tôi')}>
          <View style={styles.radioContainer}>
            {selectedOption === 'Chỉ mình tôi' && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <FontAwesome5 name={'lock'} size={20} color={'#9b9b9b'} />
          <View style={{paddingLeft: 8}}>
            <Text style={styles.body_content_text}>Chỉ mình tôi</Text>
            <Text style={styles.body_content_text2}>
              Chỉ mình bạn có thể xem
            </Text>
          </View>
        </TouchableOpacity>
        {/* Chọn bạn bè cụ thể */}
        <TouchableOpacity
          onPress={() => [
            navigation.navigate('SelectBB'),
            handleOptionSelect('option3'),
          ]}
          style={styles.body_content}>
          <View style={styles.radioContainer}>
            {selectedOption === 'option3' && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Image
            style={styles.body_content_icon}
            source={require('../../../../../../assets/icon_account_tich.png')}
          />
          <View>
            <Text style={styles.body_content_text}>Chọn bạn bè cụ thể</Text>
            <Text style={styles.body_content_text2}>
              Chỉ những người bạn chọn mới có thể xem
            </Text>
          </View>
          <Image
            style={styles.body_content_icon2}
            source={require('../../../../../../assets/icon_next.png')}
          />
        </TouchableOpacity>
        {/* Bạn bè ngoại trừ */}
        <TouchableOpacity
          style={styles.body_content}
          onPress={() => handleOptionSelect('option4')}>
          <View style={styles.radioContainer}>
            {selectedOption === 'option4' && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Image
            style={styles.body_content_icon}
            source={require('../../../../../../assets/icon_account_tru.png')}
          />
          <View>
            <Text style={styles.body_content_text}>Bạn bè ngoại trừ</Text>
            <Text style={styles.body_content_text2}>
              Tất cả bạn bè trừ những người bạn chọn
            </Text>
          </View>
          <Image
            style={[styles.body_content_icon2, {left: 18}]}
            source={require('../../../../../../assets/icon_next.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectScreenUp;
