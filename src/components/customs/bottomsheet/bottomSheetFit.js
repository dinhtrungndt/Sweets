/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const BottomSheetFit = ({handleArrange, reloadComments}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = async option => {
    setSelectedOption(option);
    switch (option) {
      case 'option1':
        await handleArrange();
        break;
      case 'option2':
        await reloadComments();
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container_modalFit}>
      <Text style={styles.lbl}>Lọc bình luận</Text>
      {/* Phù hợp nhất */}
      <TouchableOpacity
        style={styles.body_content}
        onPress={() => handleOptionSelect('option1')}>
        <View style={styles.radioContainer}>
          {selectedOption === 'option1' && (
            <View style={styles.radioSelected} />
          )}
        </View>
        <View>
          <Text style={styles.body_content_text}>Lọc theo bạn bè</Text>
          <Text style={styles.body_content_text2}>
            Hiển thị bình luận của bạn bè và những bạn bè có trong danh sách.
          </Text>
        </View>
      </TouchableOpacity>
      {/* Tất cả bình luận */}
      <TouchableOpacity
        style={styles.body_content}
        onPress={() => handleOptionSelect('option2')}>
        <View style={styles.radioContainer}>
          {selectedOption === 'option2' && (
            <View style={styles.radioSelected} />
          )}
        </View>
        <View>
          <Text style={styles.body_content_text}>Tất cả bình luận</Text>
          <Text style={styles.body_content_text2}>
            Hiển thị tất cả bình luận, bao gồm cả nội dung có thể là spam. Những
            bình luận phù hợp nhất sẽ hiển thị đầu tiên.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSheetFit;

const styles = StyleSheet.create({
  container_modalFit: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lbl: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  body_content: {
    width: '92%',
    flexDirection: 'row',
    padding: 13,
    alignItems: 'center',
    marginTop: 5,
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
    fontWeight: '600',
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
    marginRight: 15,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22b6c0',
  },
});
