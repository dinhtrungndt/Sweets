import { Text, View, Image, TouchableOpacity, } from 'react-native'
import React, { useContext, useState, useCallback, useEffect } from 'react'
import { UserContext } from '../../../../contexts/user/userContext'

// styles
import { styles } from '../style/otherUserA'

const OtherUserA = (props) => {
    const { navigation } = props;
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);

    return (
        <View style={styles.body}>
            <View style={styles.profileFrame}>
                <TouchableOpacity >
                    <Image
                        style={styles.imgCover}
                        source={
                            user && user.user.coverImage
                                ? { uri: user.user.coverImage }
                                : require('../../../../assets/account.png')
                        }
                    />
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image
                        style={styles.imgAvatar}
                        source={
                            user && user.user.avatar
                                ? { uri: user.user.avatar }
                                : require('../../../../assets/account.png')
                        }
                    />
                </TouchableOpacity>
                <Text style={styles.textName}>{user ? user.user.name : ''}</Text>
                <TouchableOpacity style={styles.btnIntroduce}>
                    <Text style={styles.textIntroduce}>Cập nhật giới thiệu bản thân</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnEditProfile}>
                    <Image
                        style={styles.imgEdit}
                        source={require('../../../../assets/icon_edit.png')}
                    />
                    <Text style={styles.txtEdit}>Chỉnh sửa trang cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.editFrame}>
                    <Image style={styles.imgBack} source={require('../../../../assets/back_50px.png')} />
                    <TouchableOpacity style={styles.btnMore}>
                        <Image style={styles.imgMore} source={require('../../../../assets/icon_more_story.png')} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default OtherUserA
