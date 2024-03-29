import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



const styles = StyleSheet.create({
    container: {
     
      justifyContent: 'center',
      alignItems: 'center',
      position:'relative'
     
    },
   
    avatar2: {
   
      width: 50,
      height: 50,

      borderRadius: 30,
      borderWidth: 0.5,
      borderColor: '#22b6c0',
      backgroundColor: 'white',
      position:'absolute',
      top:65,
      left:60

    },
    button: {
        width:100,
        height:40,
     
      backgroundColor: '#007AFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 15,
    },
    wrapContent1: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#22b6c0',
       
      },
      friendItem: {
        padding: 10,
      },
      avatar: {
        width: 20,
        height: 20,
      },
      txtContent1: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#000'
      },
      wrapQr:{
        backgroundColor:'#CCE1FF',
       width:'65%',
       height:230,
       marginTop:30,
       borderRadius:20,
       justifyContent:'center',
       alignSelf:'center',
       marginBottom:30
      },
      ToQR:{
        backgroundColor:'white',
        height:50,
        flexDirection:'row',
        padding:10,
        marginTop:10,borderBottomWidth:0.5
      },
      txtToQR:{
        fontSize:19,
        fontWeight:'bold',
        marginHorizontal:20,
        
      color:'#22b6c0'
      }
  });
  
export default styles

