/* eslint-disable prettier/prettier */
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

// library
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LabelPickStory = ({cancel}) => {
  return (
    <View style={styles.T}>
      <TouchableOpacity style={styles.modalCloseButton} onPress={cancel}>
        <Ionicons name={'chevron-back'} color={'#fff'} size={30} />
      </TouchableOpacity>
      <View style={styles.content_container}>
        <TextInput
          style={styles.content}
          placeholder="Bạn đang nghĩ gì ?"
          placeholderTextColor={'#fff'}
        />
      </View>
      <View style={styles.seetingInUp}>
        <View style={styles.seetingInUp_two}>
          <TouchableOpacity style={styles.seetingInUpQRT}>
            <MaterialCommunityIcons
              name={'account-cog-outline'}
              color={'#fff'}
              size={25}
            />
            <Text style={styles.seetingtext}>Quyền riêng tư</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seetingSave}>
            <MaterialIcons name={'save-alt'} color={'#6D6C6C'} size={25} />
            <Text style={styles.seetingtext}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnShare}>
          <Text style={styles.btnShareText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LabelPickStory;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  content_container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 14,
    color: '#fff',
    margin: 16,
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: '#22b6c0',
    padding: 100,
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    padding: 16,
    zIndex: 1,
  },
  modalImage: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  seetingInUp: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  seetingInUp_two: {
    flexDirection: 'row',
  },
  seetingInUpQRT: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seetingtext: {
    color: '#fff',
    textAlign: 'center',
  },
  seetingSave: {
    paddingLeft: 20,
  },
  btnShare: {
    width: 75,
    height: 38,
    backgroundColor: '#22b6c0',
    borderRadius: 5,
    padding: 6,
  },
  btnShareText: {
    fontSize: 16,
    color: '#fff',
  },
});
