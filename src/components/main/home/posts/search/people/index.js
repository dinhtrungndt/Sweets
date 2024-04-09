import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const PeopleSearch = ({listUserSearch}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.T}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {listUserSearch === undefined ? (
        <Text style={stylesIn.textBoldPeople}>Không có người dùng</Text>
      ) : (
        <>
          {/* Mọi người */}
          <Text style={stylesIn.textBoldPeople}>Mọi người</Text>
          {listUserSearch.map((user, index) => (
            <View key={index} style={stylesIn.container_avatar_name}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OtherUserA', {
                    account: user,
                  })
                }>
                <Image source={{uri: user.avatar}} style={stylesIn.avatar} />
              </TouchableOpacity>
              <View style={{width: '80%'}}>
                <View style={stylesIn.avatar_name}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('OtherUserA', {
                          account: user,
                        })
                      }>
                      <Text style={stylesIn.name}>{user.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.container_object}>
                      <Text style={stylesIn.lengthChung}>2 bạn chung</Text>
                    </View>
                  </View>
                </View>
                {/* Nút thêm bạn bè */}
                <TouchableOpacity style={stylesIn.btnAddFriend}>
                  <Image
                    style={stylesIn.imgAddFriend}
                    source={require('../../../../../../assets/icon_add_friends.png')}
                  />
                  <Text style={stylesIn.textIntroduce}>Thêm bạn bè</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default PeopleSearch;

const stylesIn = StyleSheet.create({
  textBoldPeople: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 16,
    marginTop: 10,
  },
  container_avatar_name: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  avatar_name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  lengthChung: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 10,
  },
  btnAddFriend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22b6c0',
    padding: 5,
    paddingLeft: 0,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 5,
    textAlign: 'center',
  },
  imgAddFriend: {
    width: 20,
    height: 20,
  },
  textIntroduce: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    textAlign: 'center',
  },
});
