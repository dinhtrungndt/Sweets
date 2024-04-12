import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const ModelBackground = ({cancel, getSelectColor}) => {
  const backgroundColor = [
    '#f1c40f',
    '#e74c3c',
    '#3498db',
    '#8e44ad',
    '#2ecc71',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#2980b9',
    '#7f8c8d',
    '#1abc9c',
    '#34495e',
    '#9b59b6',
    '#27ae60',
  ];

  const handleColorSelect = color => {
    // console.log('color', color);
    getSelectColor({selectedColor: color});
  };

  return (
    <View style={styles.T}>
      <TouchableOpacity onPress={cancel}>
        <Image
          style={styles.headerIcon}
          source={require('../../../../../../assets/icon_delete.png')}
        />
      </TouchableOpacity>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={backgroundColor}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: item,
              margin: 5,
              borderRadius: 5,
            }}
            onPress={() => handleColorSelect(item)}
          />
        )}
      />
    </View>
  );
};

export default ModelBackground;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '10%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 20,
    padding: 10,
    alignItems: 'center',
  },
  headerIcon: {
    width: 18,
    height: 18,
    borderRadius: 20,
    resizeMode: 'cover',
  },
});
