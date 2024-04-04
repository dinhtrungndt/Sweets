/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {updateEditPostsObjects} from '../../../../../../services/home/homeService';

const ChangeObjectsEditPosts = ({cancel, navigation, onSelectObject}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [objectsID, setObjectsID] = useState('');
  // console.log('>>>>>>... itemPostsitemPosts', itemPosts);

  const idObject = () => [
    {
      _id: '65b1fe1be09b1e99f9e8a235',
      name: 'Công khai',
      icon: 'https://res.cloudinary.com/dqo8whkdr/image/upload/v1711327221/f4yxj5cnlrnlpginqfpp.png',
    },
    {
      _id: '65b1fe6dab07bc8ddd7de469',
      name: 'Bạn bè',
      icon: 'https://res.cloudinary.com/dqo8whkdr/image/upload/v1711327699/ouv89aqjnoshfp5nncpg.png',
    },
    {
      _id: '65b1fe77ab07bc8ddd7de46c',
      name: 'Chỉ mình tôi',
      icon: 'https://res.cloudinary.com/dqo8whkdr/image/upload/v1711327910/afewyfgqi6g3l6lbpvpm.png',
    },
  ];

  const handleOptionSelect = option => {
    setSelectedOption(option);
    const selectedObject = idObject().find(item => item.name === option);
    if (selectedObject) {
      const selectedId = selectedObject;
      setObjectsID(selectedId);
      onSelectObject(selectedId);
      setTimeout(() => {
        cancel();
      }, 1000);
      // console.log('>>>.. Selected Id:', selectedId);
    } else {
      console.log('Không tìm thấy đối tượng tương ứng với tùy chọn được chọn');
    }
  };

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancel} onPress={cancel}>
          <AntDesign name={'close'} color={'#000'} size={20} />
        </TouchableOpacity>
        <Text style={styles.text_editPosts}>Chỉnh sửa đối tượng</Text>
        <Text />
      </View>
      {/* line */}
      <Text style={styles.line} />
      {/* body */}
      <View style={styles.body}>
        <View style={{padding: 16}}>
          <Text style={styles.text_editPosts}>
            Ai có thể xem bài viết của bạn?
          </Text>
          <Text>
            Bài viết của bạn có thể hiển thị trên trang cá nhân và trong kết quả
            tìm kiếm.
          </Text>
        </View>
        <Text style={styles.line} />
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
          onPress={() => [handleOptionSelect('option3')]}
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

export default ChangeObjectsEditPosts;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#f1f1f1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  text_editPosts: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  text_save: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22b6c0',
  },
  body_content: {
    flexDirection: 'row',
    padding: 13,
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
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
    marginRight: 15,
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
    marginTop: 3,
    left: 5,
    resizeMode: 'cover',
  },
});
