import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect} from 'react';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {optionsTabsTopNotifi} from '../../../../../navigations/customs/tabNavigator';
import CommentsTabs from './toptab/comments';
import PostsTabs from './toptab/posts';

const NotificationsScreen = props => {
  const {navigation} = props;

  const TabTop = createMaterialTopTabNavigator();

  return (
    <View style={styles.T}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={18} color="black" />
        </TouchableOpacity>
        <Text style={styles.noti_text}>Thông báo</Text>
        <FontAwesome5 name="search" size={20} color="black" />
      </View>
      <TabTop.Navigator
        screenOptions={optionsTabsTopNotifi}
        initialRouteName="PostsTabs">
        <TabTop.Screen name="PostsTabs" component={PostsTabs} />
        <TabTop.Screen name="CommentsTabs" component={CommentsTabs} />
      </TabTop.Navigator>
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  noti_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  noti_new_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    padding: 16,
  },
});
