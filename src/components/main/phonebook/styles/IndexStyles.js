import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color:'#0969da'
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.2,
    marginHorizontal: 15,
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
    fontWeight: 'bold'
    
  },

  buttonImg: {
    alignSelf: 'center',
    marginVertical: 10,
    width: 30,
    height: 30,
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
  },
  WrapFaltlist:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, // Độ đổ bóng
    shadowOpacity: 0.3, // Độ đậm nhạt của bóng đổ
    shadowRadius: 4, // Độ cong của bóng đổ
    elevation: 5, // Độ cao của thành phần so với bề mặt khác
    backgroundColor: '#fff', // Màu nền
    padding: 5, // Khoảng cách nội dung từ mép
    margin: 10, 
  },
  txtFlatlist:{
    fontSize:15,
    fontWeight:'bold',
    marginHorizontal:10,
    marginVertical:2,
    color:'#0969da'
  }
});

export default styles;
