import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const ScreenChatAll = () => {
  return (
    <View style={styles.body}>
            <View style={{ flexDirection: 'row', top:10, marginBottom:24, }}>
        <Image style={{ height: 55, width: 55 }} source={require("../chat/imageChat/avt1.png")} />
        <View style={styles.dot}></View>
        <View style={{ left: 16, }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Darlene Steward</Text>
          <Text style={{ top: 2 }}>Pls take a look at the images.</Text>
        </View>
        <View style={{ left: 85 }}>
          <Text>18:30</Text>
          <View style={{ backgroundColor: '#2F80ED', height: 25, width: 35, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5 }} >
            <Text style={{ color: 'white', fontSize: 14, }}>+5</Text>
          </View>
        </View>
      </View>


      <View style={{ flexDirection: 'row', top:10, marginBottom: 24, }}>
        <Image style={{ height: 55, width: 55 }} source={require("../chat/imageChat/avt2.png")} />
        <View style={styles.dot}></View>
        <View style={{ left: 16, }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Darlene Steward</Text>
          <Text style={{ top: 2 }}>Pls take a look at the images.</Text>
        </View>
        <View style={{ left: 85 }}>
          <Text>18:30</Text>
          <View style={{ backgroundColor: '#2F80ED', height: 25, width: 35, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5 }} >
            <Text style={{ color: 'white', fontSize: 14, }}>+5</Text>
          </View>
        </View>
      </View>


      <View style={{ flexDirection: 'row', top:10, marginBottom: 24, }}>
        <Image style={{ height: 55, width: 55 }} source={require("../chat/imageChat/avt3.png")} />
        <View style={styles.dot}></View>
        <View style={{ left: 16, }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Darlene Steward</Text>
          <Text style={{ top: 2 }}>Pls take a look at the images.</Text>
        </View>
        <View style={{ left: 85 }}>
          <Text>18:30</Text>
          <View style={{ backgroundColor: '#2F80ED', height: 25, width: 35, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5 }} >
            <Text style={{ color: 'white', fontSize: 14, }}>+5</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ScreenChatAll

const styles = StyleSheet.create({

  body: {
    padding:16,
    width: '100%',
    height: '100%',
    backgroundColor: '#F4F4F4',
    
     
  },
  container: {
 
  },
  top2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  dot: {
    backgroundColor: '#4CE417',
    height: 12, width: 12,
    borderRadius: 50,
    position: 'absolute',
    left: 32,
  },
  dotOff: {
    backgroundColor: '#969696',
    height: 12, width: 12,
    borderRadius: 50,
    position: 'absolute',
    left: 32,
  }

})