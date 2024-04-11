import { StyleSheet, Text, View } from 'react-native'
import React from 'react'





const styles = StyleSheet.create({
    imgSearch:{
        width:20,
        height:20,
       margin:8
        
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 8,
      },
      searchInput: {
      
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingLeft: 10,
        color: '#000000',
        backgroundColor: '#fff',
        width:'90%'
      },
      noFriendsMessage: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
      },
      friendItem: {
        padding: 12,
        marginBottom: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
      },
      friendItemText: {
        fontSize: 16,
        color: '#333',
      },
      txtName:{
        fontWeight:'bold',
        fontSize:17,
        marginHorizontal:10,
        color:'#22b6c0'
      },
      imgOption:{
        borderWidth:0.7,
        width:70,height:35,
        borderRadius:10,
        borderColor:'#22b6c0',
        marginHorizontal:10,
        marginVertical:3
      },
      txtXoas:{
        fontWeight:'bold',
        color:'#22b6c0',
        alignSelf:'center',
       marginVertical:5
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color:'#22b6c0',
        fontWeight:'bold'
      },
})

export default styles