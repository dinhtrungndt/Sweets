import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Account_Transfer = (props) => {
    const { navigation } = props;
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.btnBack}>
                <Image source={require('../../../../assets/icon_back.png')} />
                <Text>Chuyển tài khoản</Text>
            </TouchableOpacity>

        </View>
    )
}

export default Account_Transfer

const styles = StyleSheet.create({
    btnBack: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
    },

})