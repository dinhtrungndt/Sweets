/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

// library
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MusicScreen = ({cancel}) => {
  return (
    <View style={styles.T}>
      <View style={styles.header}>
        <TouchableOpacity onPress={cancel}>
          <Ionicons name={'chevron-back'} color={'#000'} size={30} />
        </TouchableOpacity>
        <View style={styles.VinputSearch}>
          <Ionicons name={'search'} color={'#000'} size={16} paddingLeft={10} />
          <TextInput
            placeholder="Tìm bản nhạc/nghệ sĩ"
            style={styles.inputSearch}
          />
        </View>
        <TouchableOpacity style={styles.sto_} onPress={cancel}>
          <MaterialIcons name={'amp-stories'} color={'#000'} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <View style={styles.textForSeen}>
          <Text style={styles.forYou}>Dành cho bạn</Text>
          <TouchableOpacity>
            <Text style={styles.seenAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.seeting}>Tính năng đang phát triển...</Text>
      </View>
    </View>
  );
};

export default MusicScreen;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  VinputSearch: {
    width: '70%',
    height: 33,
    backgroundColor: '#ededed',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  inputSearch: {
    paddingLeft: 5,
    paddingBottom: 7,
    alignItems: 'center',
  },
  sto_: {
    backgroundColor: '#ededed',
    borderRadius: 10,
    padding: 5,
  },
  body: {
    padding: 15,
    paddingTop: 0,
  },
  textForSeen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forYou: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  seenAll: {
    fontSize: 14,
    color: '#384fff',
  },
  seeting: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 100,
  },
});
