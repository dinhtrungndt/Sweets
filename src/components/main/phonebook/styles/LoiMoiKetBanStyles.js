import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



const styles = StyleSheet.create({
    wrapContent1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#22b6c0',
       
      },
      wrapContent2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginHorizontal:5
       
       
      },
      friendItem: {
        padding: 10,
      },
      avatar: {
        width: 24,
        height: 24,
      },
      txtContent11: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#22b6c0'
      },
      
      txtContent2: {
        fontSize: 14,
        color: '#888',
      },
      txtContent1: {
        fontSize: 19,
        fontWeight: 'bold',
       
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Hiển thị modal ở phía dưới
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Độ mờ của nền modal
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0, // Để đặt ở góc dưới
        borderBottomRightRadius: 0, // Để đặt ở góc dưới
       
    },
      modalText: {
        fontSize: 18,
        fontWeight: 'bold',
       
      },

      imgOption:{
        borderWidth:0.7,
        width:120,height:33,
        borderRadius:10,
        borderColor:'#22b6c0',
      },
      txtXoas:{
        fontWeight:'bold',
        color:'#22b6c0',
        alignSelf:'center',
       marginVertical:5
      },
      txtXoas2:{
        fontWeight:'bold',
        color:'white',
        alignSelf:'center',
       marginVertical:5,
      
      },
      imgOption2:{
        borderWidth:0.7,
        width:120,height:33,
        borderRadius:10,
        backgroundColor:'#22b6c0',
        marginHorizontal:15,
        borderColor:'#22b6c0'
        
      },
})
export default styles