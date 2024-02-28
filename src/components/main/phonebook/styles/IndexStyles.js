import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.2,
    marginHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3498db',
    backgroundColor: '#ffffff', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#3498db', // Màu chữ button
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonImg: {
    alignSelf: 'center',
    marginVertical: 10,
    width: 50,
    height: 50,
  },
  ViewFlatlist: {
    marginVertical: 20,

    marginHorizontal: 5,
  },
  txtFlat:{
    fontWeight:'bold',
    color:'#3498db',
    fontSize:22,
    marginHorizontal:12,
    marginBottom:5
  }
});

export default styles;
