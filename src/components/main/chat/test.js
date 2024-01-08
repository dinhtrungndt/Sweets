import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

const Test = () => {

  return (
    <View style={styles.body}>
      <View style={styles.top1}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', fontStyle: 'italic' }}>Sweets</Text>
        <Image
          style={{ width: 26, height: 30 }}
          source={require("../chat/imageChat/timkiem.png")}
        />
      </View>

      <View style={{ top: 20 }}>
        <View style={styles.top2}>
          <View>
            <Text style={{ backgroundColor: '#2F80ED', color: 'white', padding: 8, borderRadius: 8 }}>All chats</Text>
          </View>
        
          <Text>Groups</Text>
        </View>
      </View>



      <View style={{ flexDirection: 'row', top: 50, marginBottom: 24 }}>
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

      {/*8888888888888*/}

      <View style={{ flexDirection: 'row', top: 50, marginBottom: 24 }}>
        <Image style={{ height: 55, width: 55 }} source={require("../chat/imageChat/avt1.png")} />
        <View style={styles.dot}></View>
        <View style={{ left: 16, }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Darlene Steward</Text>
          <Text style={{ top: 2 }}>Pls take a look at the images.</Text>
        </View>
        <View style={{ left: 85 }}>
          <Text>17:20</Text>
          <View style={{ backgroundColor: '#2F80ED', height: 25, width: 35, borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: 5 }} >
            <Text style={{ color: 'white', fontSize: 14, }}>1</Text>
          </View>
        </View>
      </View>

      {/*8888888888888*/}
      <View style={{ flexDirection: 'row', top: 50, marginBottom: 24 }}>
        <Image style={{ height: 55, width: 55 }} source={require("../chat/imageChat/avt1.png")} />
        <View style={styles.dot}></View>
        <View style={{ left: 16, }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Darlene Steward</Text>
          <Text style={{ top: 2 }}>Pls take a look at the images.</Text>
        </View>
        <View style={{ left: 85 }}>
          <Text>15:44</Text>

        </View>
      </View>


      {/*8888888888888*/}
      <View style={{ flexDirection: 'row', top: 50, marginBottom: 24 }}>
        <Image style={{ height: 55, width: 55 }} source={require("../chat/imageChat/avt1.png")} />
        <View style={styles.dotOff}></View>
        <View style={{ left: 16, }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>Darlene Steward</Text>
          <Text style={{ top: 2 }}>Pls take a look at the images.</Text>
        </View>
        <View style={{ left: 65 }}>
          <Text>Yesterday</Text>

        </View>
      </View>

    



    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 16,
    width: '100%',
    height: '100%',
    backgroundColor: '#F4F4F4'
  },
  container: {
    padding: 16,
  },
  top1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  top2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chatContainer: {

  },
  dot: {
    backgroundColor: '#4CE417',
    height: 12, width: 12,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    left: 32,
  },
  dotOff: {
    backgroundColor: '#969696',
    height: 12, width: 12,
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
    left: 32,
  }
});

export default Test;
