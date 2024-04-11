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
    width: 55,
    height: 55,
    borderRadius: 27,
    borderWidth: 1.2,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#22b6c0',
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
    color: '#22b6c0', // Màu chữ button
    fontSize: 15,
    fontWeight: 'bold'
    
  },

  buttonImg: {
    alignSelf: 'center',
    marginVertical: 10,
    width: 23,
    height: 23,
  },
  buttonImg2: {
    alignSelf: 'center',
    marginVertical: 10,
    width: 35,
    height: 35,
    marginRight:10
  },
  buttonImg4: {
    alignSelf: 'center',
   
    width: 35,
    height: 35,
   
  },
  
  buttonImg3: {
    alignSelf: 'center',
    marginVertical: 10,
    width: 28,
    height: 28,
    marginRight:10
  },
  ViewFlatlist: {
    marginVertical: 20,

    marginHorizontal: 5,
  },
  txtFlat:{
    fontWeight:'bold',
    color:'#22b6c0',
    fontSize:18,
   
    marginBottom:5,
   
    padding:8
  },
  WrapFaltlist:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd', 
    shadowColor: '#22b6c0', 
    shadowOffset: { width: 0, height: 2 }, // Độ đổ bóng
    shadowOpacity: 0.3, // Độ đậm nhạt của bóng đổ
    shadowRadius: 4, // Độ cong của bóng đổ
    elevation: 5, // Độ cao của thành phần so với bề mặt khác
    backgroundColor: '#fff', // Màu nền
    padding: 5, // Khoảng cách nội dung từ mép
    margin: 10, 
    zIndex:2,
    marginTop:-55
  },
  txtFlatlist:{
    fontSize:14,
    fontWeight:'bold',
    marginHorizontal:7,
    marginVertical:4,
    color:'#22b6c0'
  },
  wrapBackground:{
    width:'100',
    height:70,
    backgroundColor:'#22b6c0',
    zIndex:1,
    flexDirection:'row',
    justifyContent:'space-between'

    
  },
  
  txtFlat2:{
    fontWeight:'bold',
    color:'#ffffff',
    fontSize:24,
    marginVertical:8,
    marginHorizontal:5,
 padding:8
  },
  ToQR:{
    backgroundColor:'#ffffff',
    height:45,
    flexDirection:'row',
    padding:10,
  
  },
  txtToQR:{
    fontSize:17,
    fontWeight:'bold',
    marginHorizontal:20,
    
  color:'#22b6c0'
  }
});

export default styles;
