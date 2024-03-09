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
    color:'#0969da'
  },
  noFriendsMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
  imgOption:{
    width:20,
    height:20,
    marginTop:5
  },
})

export default styles