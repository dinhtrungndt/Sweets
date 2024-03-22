import { Text, View, Image, TouchableOpacity, ActivityIndicator, } from 'react-native'
import React, { useContext, useState, useCallback, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { GetListUser } from '../../../../services/user/userService'
import { GetListUserById } from '../../../../services/user/userService'
// screens
import PostOtherScreen from './TopTabOther/PostOtherScreen'
import ImgOtherScreen from './TopTabOther/ImgOtherScreen'
// styles
import { styles } from '../style/otherUserA'

const Tab = createMaterialTopTabNavigator()

const OtherUserA = (props) => {
    const { navigation, userId } = props;
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null); // State để lưu thông tin người dùng

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const user = await GetListUser(userId); // Gọi GetListUser với userId
                setUserData(user); // Cập nhật thông tin người dùng vào trạng thái của component
                setLoading(false);
            } catch (error) {
                console.log('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]); // Trigger useEffect khi userId thay đổi


    return (
        <View style={styles.body}>
            <View style={styles.profileFrame}>
                <TouchableOpacity >
                    <Image
                        style={styles.imgCover}
                        source={require('../../../../assets/account.png')
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image
                        style={styles.imgAvatar}
                        source={require('../../../../assets/account.png')
                        }
                    />
                </TouchableOpacity>
                {/* <Text style={styles.textName}>{userData.name}</Text> */}
                <Text style={styles.textName}>Tên là</Text>
                <View style={styles.containerAdd}>
                    <TouchableOpacity style={styles.btnAddFriend}>
                        <Image
                            style={styles.imgAddFriend}
                            source={require('../../../../assets/icon_add_friends.png')}
                        />
                        <Text style={styles.textIntroduce}>Thêm bạn bè</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnMess}>
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
                        <Image style={styles.imgBack} source={require('../../../../assets/back_50px.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnMore}>
                        <Image style={styles.imgMore} source={require('../../../../assets/icon_more_story.png')} />
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
                        borderTopWidth: 0,
                        borderTopColor: '#ddd',
                        elevation: 0,
                        marginTop: 12,
                    },
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: '#999',
                    tabBarIndicatorStyle: {
                        backgroundColor: '#000000',
                    },
                    tabBarPressColor: 'rgba(0,0,0,0.1)',
                }}>
                <Tab.Screen name="Bài viết" component={PostOtherScreen} />
                <Tab.Screen name="Ảnh" component={ImgOtherScreen} />
            </Tab.Navigator>
        </View>
    )
}

export default OtherUserA
