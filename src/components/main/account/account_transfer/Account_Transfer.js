import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../contexts/user/userContext'

// style
import { styles } from '../style/account_transfer'

const Account_Transfer = (props) => {
    const { navigation } = props;
    const { user } = useContext(UserContext);

    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.btnBack}>
                <Image style={styles.imgBack} source={require('../../../../assets/icon_back.png')} />
                <Text style={styles.txt1}>Chuyển tài khoản</Text>
            </TouchableOpacity>
            <View style={styles.body}>
                <Text style={styles.txt2}>Thêm tài khoản để đăng nhập nhanh.</Text>
            </View>
            <View style={styles.bodyAccount}>
                <TouchableOpacity style={styles.AccountFrame}>
                    <Image style={styles.imgAccount} source={user && user.user.avatar ? { uri: user.user.avatar } : require('../../../../assets/diana.jpg')} />
                    <Text style={styles.txt3}> {user && user.user.name} </Text>
                    <Text style={styles.txt4}>Đã đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.AccountFrame}>
                    <Image style={styles.imgAccount} source={require('../../../../assets/icon_add.png')} />
                    <Text style={styles.txt3}> Thêm tài khoản </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Account_Transfer