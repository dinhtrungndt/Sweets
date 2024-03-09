/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {getComments} from '../../../services/home/homeService';

const BottomSheetFit = ({comment}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [filterOption, setFilterOption] = useState('option1');
  const [comments, setComments] = useState([comment]);

  // console.log('>>>>>>>>>> commentcomment' + comment.map(item => item._id));
  // console.log('>>>>>>>>>> comments' + comments);
  const handleOptionSelect = option => {
    setSelectedOption(option);
    setFilterOption(option);
    // reloadComments();
  };

  const reloadComments = async () => {
    try {
      const response = await getComments(comment.map(item => item._id));
      const data = await response;
      // console.log('>>>>>>>>>> data' + data);
      let filteredComments = [];
      switch (filterOption) {
        case 'option1':
          filteredComments = data.filter(
            comment => comment.isFriend || comment.isPopular,
          );
          break;
        case 'option2':
          filteredComments = data.slice().reverse();
          console.log('>>>>>>>>>>>> option2' + filteredComments);
          break;
        case 'option3':
          filteredComments = data;
          break;
        default:
          filteredComments = data;
          break;
      }
      setComments(filteredComments);
    } catch (error) {
      console.error('Lỗi khi tải danh sách bình luận:', error);
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
          <Text style={styles.body_content_text}>Phù hợp nhất</Text>
          <Text style={styles.body_content_text2}>
            Hiển thị bình luận của bạn bè và những bình luận có nhiều lượt tương
            tác nhất trước tiên.
          </Text>
        </View>
      </TouchableOpacity>
      {/* Mới nhất */}
      <TouchableOpacity
        style={styles.body_content}
        onPress={() => handleOptionSelect('option2')}>
        <View style={styles.radioContainer}>
          {selectedOption === 'option2' && (
            <View style={styles.radioSelected} />
          )}
        </View>
        <View>
          <Text style={styles.body_content_text}>Mới nhất</Text>
          <Text style={styles.body_content_text2}>
            Hiển thị tất cả bình luận, theo thứ tự từ mới nhất đến cũ nhất.
          </Text>
        </View>
      </TouchableOpacity>
      {/* Tất cả bình luận */}
      <TouchableOpacity
        style={styles.body_content}
        onPress={() => handleOptionSelect('option3')}>
        <View style={styles.radioContainer}>
          {selectedOption === 'option3' && (
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
