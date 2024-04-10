import { StyleSheet, Text, View } from 'react-native'
import React from 'react'






const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'black'
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27,
    marginRight: 16,
    marginVertical:3,
    borderWidth:0.5,
    borderColor:'blue'
  },
  friendItemText: {
    fontSize: 17,
    fontWeight:'bold',
    color:'#22b6c0'
  },
  friendItemText3: {
    fontSize: 14,
   
    color:'#22b6c0'
  },
  friendItemText2: {
    fontSize: 15,
    fontWeight:'bold',
    color:'#ffffff',
    alignSelf:'center',
    marginTop:3
  },
  noFriendsMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
  imgOption:{
    width:85,
    height:30,
    marginTop:10,
    backgroundColor:'#22b6c0',
    borderRadius:5
  },
  touchableDisabled: {
    backgroundColor: 'lightgray', // Màu nền khi vô hiệu hóa
  },
  
  textDisabled: {
    color: 'gray', // Màu chữ khi vô hiệu hóa
  },
})

export default styles