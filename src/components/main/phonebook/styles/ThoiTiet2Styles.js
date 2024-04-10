import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position:'relative',
      
    
    },
    
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    input: {
      height: 40,
      width: 270,
      backgroundColor: '#375353',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 5,
      paddingHorizontal: 15,
      color: 'black',
      marginTop:'4%',
      marginLeft:'10%'
    },
    item: {
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      width: '100%',
      backgroundColor:'#c9cfd4',
      padding:5,
      
    },
    cityName: {
      fontSize: 16,
      color: '#000',
      fontWeight:'600'
    },
    weatherInfo: {
     
      alignItems: 'center',
      width:'90%'
    
     
    
    },
    locationText: {
      fontSize: 28,
      color: '#fff',
      fontWeight:'normal',
     
    },
    conditionText: {
      fontSize: 16,
      color: '#fff',
      fontSize:20,
      margin:5
   
    },
    temperatureText: {
      fontSize: 90,
      color: '#fff',
     
    },
    weatherIcon: {
      width: 280,
      height: 280,
      margin:5
    
    },
    toggleButton:{
    alignSelf:'flex-start',
    zIndex:10,
   position:'absolute',
   top:15,
   left:15,
   width:40,
   height:40,
   borderRadius:20,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:'lightgray'
    },
    txtInfo:{
        color:'white'
    }
  });

  export default styles