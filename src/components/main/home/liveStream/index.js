import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {getAllLiveStream} from '../../../../services/livestream/LiveStreamService';
import {UserContext} from '../../../../contexts/user/userContext';

const LiveStreamScreen = ({navigation, route}) => {
  const {user} = useContext(UserContext);
  const handleLiveStream = (isStream, liveID) => {
    navigation.navigate('LiveStreamHost', {isStream, liveID});
  };

  const [listlive, setListlive] = useState('');
  const onGetAllLiveStream = async () => {
    const response = await getAllLiveStream();
    setListlive(response.data);
    console.log('listlive', response.data);
  };
  useEffect(() => {
    onGetAllLiveStream();
  }, []);

  const renderitem = ({item}) => {
    return (
      <View style={styles.viewitem}>
        <View style={styles.item}>
          <View style={styles.viewavt}>
            <Image style={styles.avatar} source={{uri: item.avatar}} />
          </View>
          <View style={styles.username}>
            <Text style={styles.txtname}>{item.username}</Text>
            <Text style={styles.txtid}>ID: {item._id}</Text>
          </View>

          <View style={styles.viewbutton}>
            <TouchableOpacity
              style={styles.bgbutton}
              onPress={() => handleLiveStream(false, item.liveid)}>
              <Text style={styles.txtitembuttom}>Xem Live</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bgbutton}>
              <Text style={styles.txtitembuttom}> Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const handleback = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.viewheader}>
        <TouchableOpacity style={styles.viewlive} onPress={handleback}>
          <Image
            style={styles.back}
            source={require('../../../../assets/back_50px.png')}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.txtlive}>Live Stream</Text>
        </View>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'flex-end'}}
          onPress={() => handleLiveStream(true, user.id)}>
          <Image
            style={{marginRight: 20}}
            source={require('../../../../assets/icon_live.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider}></View>
      <FlatList
        style={styles.viewflatlist}
        data={listlive}
        renderItem={renderitem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default LiveStreamScreen;
const styles = StyleSheet.create({
  bgbutton: {
    width: '90%',
    height: 30,
    backgroundColor: '#22B6C0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
  },
  txtitembuttom: {
    color: 'white',
    fontSize: 12,

    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtid: {
    fontSize: 17,
    color: 'grey',
    fontWeight: 'bold',
  },
  viewavt: {
    width: '20%',
    marginLeft: 20,
  },
  txtname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  username: {
    width: '50%',
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
  },
  viewbutton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '20%',
    marginRight: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 20,
    borderColor: 'red',
    borderWidth: 1,
  },
  viewitem: {
    height: 'auto',
    width: '90%',
    borderRadius: 10,
    borderColor: '#22B6C0',
    borderWidth: 1,
    marginTop: 10,
    marginLeft: '5%',
  },
  viewflatlist: {
    height: '90%',
    width: '100%',
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.7,
    width: '90%',
    marginTop: 10,

    marginLeft: '5%',
  },
  viewlive: {
    flex: 1, alignItems: 'flex-start'
  },
  viewheader: {
    flexDirection: 'row',
    justifyContent: 'Space-between',
    alignItems: 'center',
    height: '10%',
  },
  back: {
    width: 28,
    height: 28,
    // marginTop: 20,
    marginLeft: 19,
  },
  txtlive: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
    flex: 2, alignItems: 'center'
  },
});
