/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GetListUserById } from '../../../../services/user/userService';
// screens
import PostOtherScreen from './TopTabOther/PostOtherScreen';
import ImgOtherScreen from './TopTabOther/ImgOtherScreen';
// styles
import { styles } from '../style/otherUserA';
import { UserContext } from '../../../../contexts/user/userContext';

const Tab = createMaterialTopTabNavigator();

const OtherUserA = ({ navigation, route }) => {
  const { account, accountzzz } = route.params;
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // State để lưu thông tin người dùng

  // console.log('>>>>>>>>> accountttt', account);
  // console.log('>>>>>>>>> accountzzz', accountzzz);

  return (
    <>
      {account === undefined ? (
        <View style={styles.body}>
          <View style={styles.profileFrame}>
            {accountzzz?.coverImage === 'null' ||
              accountzzz?.coverImage === 'default' ? (
              <TouchableOpacity>
                <Image
                  style={styles.imgCover}
                  source={require('../../../../assets/account.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Image
                  style={styles.imgCover}
                  source={{ uri: accountzzz?.coverImage }}
                />
              </TouchableOpacity>
            )}
            {accountzzz?.avatar === 'null' ? (
              <TouchableOpacity>
                <Image
                  style={styles.imgAvatar}
                  source={require('../../../../assets/account.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Image
                  style={styles.imgAvatar}
                  source={{ uri: accountzzz?.avatar }}
                />
              </TouchableOpacity>
            )}
            {/* <Text style={styles.textName}>{userData.name}</Text> */}
            <Text style={styles.textName}>{accountzzz?.name}</Text>
            <View style={styles.containerAdd}>
              <TouchableOpacity style={styles.btnAddFriend}>
                <Image
                  style={styles.imgAddFriend}
                  source={require('../../../../assets/icon_add_friends.png')}
                />
                <Text style={styles.textIntroduce}>Thêm bạn bè</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnMess}>
                <Image
                  style={styles.imgEdit}
                  source={require('../../../../assets/icon_chat.png')}
                />
                <Text style={styles.txtEdit}>Nhắn tin</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.editFrame}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.btnBack}>
                <Image
                  style={styles.imgBack}
                  source={require('../../../../assets/back_50px.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnMore}>
                <Image
                  style={styles.imgMore}
                  source={require('../../../../assets/icon_more_story.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
              },
              tabBarStyle: {
                backgroundColor: '#fff',
                borderTopColor: '#ddd',
                marginTop: 6,
              },
              tabBarActiveTintColor: '#22b6c0',
              tabBarInactiveTintColor: '#bdc3c7',
              tabBarIndicatorStyle: {
                backgroundColor: '#22b6c0',
              },
              tabBarPressColor: 'rgba(0,0,0,0.1)',
            }}>
            <Tab.Screen
              name="Bài viết"
              posts={userData}
              component={PostOtherScreen}
            />
            <Tab.Screen name="Ảnh" component={ImgOtherScreen} />
          </Tab.Navigator>
        </View>
      ) : accountzzz === undefined ? (
        <View style={styles.body}>
          <View style={styles.profileFrame}>
            {account.idUsers?.coverImage === 'null' ||
              account.idUsers?.coverImage === 'default' ? (
              <TouchableOpacity>
                <Image
                  style={styles.imgCover}
                  source={require('../../../../assets/account.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Image
                  style={styles.imgCover}
                  source={{ uri: account.idUsers?.coverImage }}
                />
              </TouchableOpacity>
            )}
            {account.idUsers?.avatar === 'null' ? (
              <TouchableOpacity>
                <Image
                  style={styles.imgAvatar}
                  source={require('../../../../assets/account.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Image
                  style={styles.imgAvatar}
                  source={{ uri: account.idUsers?.avatar }}
                />
              </TouchableOpacity>
            )}
            {/* <Text style={styles.textName}>{userData.name}</Text> */}
            <Text style={styles.textName}>{account.idUsers?.name}</Text>
            <View style={styles.containerAdd}>
              <TouchableOpacity style={styles.btnAddFriend}>
                <Image
                  style={styles.imgAddFriend}
                  source={require('../../../../assets/icon_add_friends.png')}
                />
                <Text style={styles.textIntroduce}>Thêm bạn bè</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnMess}>
                <Image
                  style={styles.imgEdit}
                  source={require('../../../../assets/icon_chat.png')}
                />
                <Text style={styles.txtEdit}>Nhắn tin</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.editFrame}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.btnBack}>
                <Image
                  style={styles.imgBack}
                  source={require('../../../../assets/back_50px.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnMore}>
                <Image
                  style={styles.imgMore}
                  source={require('../../../../assets/icon_more_story.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#22b6c0',
              tabBarInactiveTintColor: '#bdc3c7',
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 'bold'
              },
              tabBarItemStyle: {
                width: 'auto'
              },
              tabBarIndicatorStyle: {
                backgroundColor: '#22b6c0'
              },
              tabBarStyle: {
                backgroundColor: '#FFF',
                elevation: 1,
                marginTop: 6
              }
            }}>
            <Tab.Screen
              name="Bài viết"
              initialParams={{ account: account, accountzzz: accountzzz }}
              component={PostOtherScreen}
            />
            <Tab.Screen
              name="Ảnh"
              initialParams={{ account: account }}
              component={ImgOtherScreen} />
          </Tab.Navigator>
        </View>
      ) : null}
    </>
  );
};

export default OtherUserA;
