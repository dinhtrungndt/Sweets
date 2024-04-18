import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    wrapInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#22b6c0',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
      },
    txtname:{
        color:'white',
        fontSize:17,
        fontWeight:'bold',
       marginVertical:10,
        marginHorizontal:6
    },
    iconBack:{
        padding: 3,
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 13,
   
    marginHorizontal:10

    },
    avatar:{
        width:20,
        height:20
    },
    wrapInfo2:{
        backgroundColor:'white',
        height:'40%',
        margin:15,
        borderRadius:15,
        elevation:10,
        padding:10
    },
    input: {
        borderWidth: 0.5,
        borderColor: 'lightgray',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        color: '#333',
        minHeight: 50,
        width:'70%',
        marginHorizontal:5
      },
      defaultWishesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
      },
      defaultWishButton: {
        backgroundColor: '#DCF9F9',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal:10,
        borderRadius: 10,
      },
      defaultWishText: {
        color: 'black',
        fontWeight: 'bold',
      },
      btnThiep:{
        height:'100%',
     
       alignItems:'center',
     paddingTop:10,
     borderWidth: 0.5,
        borderColor: 'lightgray',
        borderRadius: 5,
      width:'16%'
      },
      txtChonThiep:{
        color: '#22b6c0',
        fontSize:8,
        fontWeight:'bold'
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
      
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width:'100%'
       
       
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'center',
    },
    closeButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 5,
    },
    scrollViewContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection:'row'
    },
    imageContainer: {
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
    },
    selectedItem: {
        borderWidth: 2,
        borderColor: 'red',
    },
    btnSee:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'lightgray',
        width:'45%',
        height:40,
        alignItems:'center',
        justifyContent:'center'
    },
    btnSee2:{
        backgroundColor:'#22b6c0',
        borderWidth:1,
        borderColor:'lightgray',
        width:'45%',
        height:40,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default styles