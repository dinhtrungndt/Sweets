/* eslint-disable prettier/prettier */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Entypo from 'react-native-vector-icons/Entypo';

const BottomSheetEditPosts = ({openCamera}) => {
  return (
    <View style={styles.T}>
      {/* 10% */}
      <View style={styles.size10Container}>
        <TouchableOpacity onPress={openCamera}>
          <Image
            style={styles.imageSize10}
            source={require('../../../../../../assets/icon_image.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.imageSize10}
            source={require('../../../../../../assets/user_tag_25px.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.imageSize10}
            source={require('../../../../../../assets/icon_feeling.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.imageSize10}
            source={require('../../../../../../assets/icon_checkin.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Entypo name={'camera'} size={24} marginRight={8} color={'#4799f8'} />
        </TouchableOpacity>
      </View>
      {/* line */}
      <Text style={styles.line} />
      {/* 45% */}
      <View style={styles.size45Container}>
        <View style={styles.bottomSheet}>
          <TouchableOpacity style={styles.bottomSheetItem} onPress={openCamera}>
            <Image
              style={styles.bottomSheetIcon}
              source={require('../../../../../../assets/icon_image.png')}
            />
            <Text style={styles.bottomSheetText}>Ảnh/video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomSheetItem}>
            <Image
              style={styles.bottomSheetIcon}
              source={require('../../../../../../assets/user_tag_25px.png')}
            />
            <Text style={styles.bottomSheetText}>Gắn thẻ người khác</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomSheetItem}>
            <Image
              style={styles.bottomSheetIcon}
              source={require('../../../../../../assets/icon_feeling.png')}
            />
            <Text style={styles.bottomSheetText}>Cảm xúc/hoạt động</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomSheetItem}>
            <Image
              style={styles.bottomSheetIcon}
              source={require('../../../../../../assets/icon_checkin.png')}
            />
            <Text style={styles.bottomSheetText}>Check in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomSheetItem}>
            <Entypo
              name={'camera'}
              size={24}
              marginRight={8}
              color={'#4799f8'}
            />
            <Text style={styles.bottomSheetText}>Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomSheetEditPosts;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    padding: 16,
  },
  size10Container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 8,
  },
  imageSize10: {
    width: 25,
    height: 25,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#dedede',
  },
  bottomSheet: {
    width: '100%',
    padding: 16,
    paddingTop: 25,
  },
  bottomSheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginLeft: 5,
    paddingBottom: 10,
  },
  bottomSheetIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  bottomSheetText: {
    fontSize: 16,
    color: '#000',
  },
});
