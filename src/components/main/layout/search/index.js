/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Post from './Src/Post/Post';
import User from './Src/User/User';
import styles from './Styles/Index';

const TabTop = createMaterialTopTabNavigator();
const options = ({ route }) => ({
  tabBarLabel: ({ focused }) => {
    const labelColor = focused ? 'blue' : '#000';
    return (
      <Text style={{ color: labelColor }}>
        {route.name === 'All' ? 'Tất cả' : route.name === 'User' ? 'User' : 'Bài đăng'}
      </Text>
    );
  },
  tabBarIndicatorStyle: {
    backgroundColor: 'blue',
    height: 2,
  },
  tabBarPressAnimation: true,
});
const HomeTabsTop = ({ route }) => {
  route = route;
  return (
    <TabTop.Navigator tabBarOptions={options}  >
      <TabTop.Screen name="User" component={User} initialParams={route} />
      <TabTop.Screen name="Post" component={Post} initialParams={route} />
    </TabTop.Navigator>
  );
};

const SearchScreens = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const handleBackPress = () => {
    navigation.goBack();
  };
  useEffect(() => {
    navigation.setParams({ search });
  }, [search]);
  const handlesearch = () => {
    navigation.setParams({ search });
    navigation.navigate('Post');
    navigation.navigate('User');
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <TextInput value={search} onChangeText={setSearch} placeholder='Tìm kiếm' style={styles.headerinput} onSubmitEditing={handlesearch} />
      </View>
      <HomeTabsTop route={search} />
    </View>
  );
};
export default SearchScreens;

