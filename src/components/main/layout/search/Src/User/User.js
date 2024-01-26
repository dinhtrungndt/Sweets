import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { searchuser } from '../../../../../../services/search/Search';
import styles from '../../Styles/User/User';

const User = () => {
  const route = useRoute();
  const parentRouteList = Object.values(route.params || {});
  const name = parentRouteList.join('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUser = async () => {
    try {
      setLoading(true);
      const response = await searchuser(name);
      setUsers(response.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchUser();
  }, [name]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.fl}>
        <View style={styles.item}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}>
              <Image source={{ uri: item.avatar }} style={{ width: 50, height: 50, borderRadius: 50 }} />
            </View>
          </View>
          <View>
            <View>
              <Text>{item.name}</Text>
            </View>
            <View>
              <Text>{item.ngaysinh}</Text>
            </View>
          </View>
        </View>
        <View style={styles.item2}>
          <Text style={styles.txtprofile}>
            Xem Profile
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.moinguoi}>Mọi người</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          {users && users.length > 0 ? (
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              style={{ marginTop: '5%' }}
              refreshing={loading}
            />
          ) : (
            <View style={{ marginTop: '5%' }}>
              <Text>{users ? 'Không có người dùng.' : 'Không có người dùng.'}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default User;
