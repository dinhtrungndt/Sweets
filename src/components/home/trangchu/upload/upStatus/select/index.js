import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {styles} from '../style/select';

const SelectScreenUp = props => {
  const {navigation} = props;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('./../../../../../../../media/image/icon_delete_white.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Quyền xem</Text>
      </View>
      {/* body */}
      <View style={styles.body}>
        {/* tất cả bạn bè */}
        <TouchableOpacity
          style={styles.body_content}
          onPress={() => handleOptionSelect('option1')}>
          <View style={styles.radioContainer}>
            {selectedOption === 'option1' && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Image
            style={styles.body_content_icon}
            source={require('./../../../../../../../media/image/icon_friend_add.png')}
          />
          <View>
            <Text style={styles.body_content_text}>Tất cả bạn bè</Text>
            <Text style={styles.body_content_text2}>
              Bạn bè trên Sweets, trừ danh sách bị chặn
            </Text>
          </View>
        </TouchableOpacity>
        {/* Chỉ mình tôi */}
        <TouchableOpacity
          style={styles.body_content}
          onPress={() => handleOptionSelect('option2')}>
          <View style={styles.radioContainer}>
            {selectedOption === 'option2' && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Image
            style={styles.body_content_icon}
            source={require('./../../../../../../../media/image/icon_lock.png')}
          />
          <View>
            <Text style={styles.body_content_text}>Chỉ mình tôi</Text>
            <Text style={styles.body_content_text2}>
              Chỉ mình tôi có thể xem
            </Text>
          </View>
        </TouchableOpacity>
        {/* Chọn bạn bè cụ thể */}
        <TouchableOpacity
          style={styles.body_content}
          onPress={() => handleOptionSelect('option3')}>
          <View style={styles.radioContainer}>
            {selectedOption === 'option3' && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Image
            style={styles.body_content_icon}
            source={require('./../../../../../../../media/image/icon_account_tich.png')}
          />
          <View>
            <Text style={styles.body_content_text}>Chọn bạn bè cụ thể</Text>
            <Text style={styles.body_content_text2}>
              Chỉ những người bạn chọn mới có thể xem
            </Text>
          </View>
          <Image
            style={styles.body_content_icon2}
            source={require('./../../../../../../../media/image/icon_next.png')}
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
            source={require('./../../../../../../../media/image/icon_account_tru.png')}
          />
          <View>
            <Text style={styles.body_content_text}>Bạn bè ngoại trừ</Text>
            <Text style={styles.body_content_text2}>
              Tất cả bạn bè trừ những người bạn chọn
            </Text>
          </View>
          <Image
            style={[styles.body_content_icon2, {left: 18}]}
            source={require('./../../../../../../../media/image/icon_next.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectScreenUp;
