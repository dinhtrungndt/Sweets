import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



const styles = StyleSheet.create({
    wrapContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eaeaea',
        marginHorizontal:5
      },
      friendItem: {
        padding: 10,
      },
      avatar: {
        width: 24,
        height: 24,
      },
      txtContent1: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      txtContent2: {
        fontSize: 14,
        color: '#888',
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
})
export default styles