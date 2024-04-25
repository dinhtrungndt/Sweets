import { View, Text, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { styles } from './StyleFgPw'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { forgetPassword } from '../../../services/user/userService'
import { useTranslation } from 'react-i18next';

const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();

    const handleForgetPassword = async () => {
        if (email === '') {
            Alert.alert('Email is required');
            return;
        }
        setLoading(true);
        try {
            const res = await forgetPassword(email);
            if (res.success) {
                Alert.alert('Success', 'OTP code sent to email');
                setEmail('');
                navigation.navigate('CheckOTP', { email: email });
            } else {
                if (res.message === "Email không tồn tại trong hệ thống") {
                    Alert.alert('Error', 'Email không tồn tại trong hệ thống');
                } else {
                    Alert.alert('Error', 'An error occurred. Please try again later.');
                }
            }
        } catch (error) {
            console.log('ForgetPassword error: ', error);
            Alert.alert('Error', 'An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.body}>
            <TouchableOpacity>
                <MaterialIcons
                    style={styles.imgBack}
                    name='arrow-back'
                    color={'#000000'}
                    size={30}
                    onPress={() => navigation.goBack()}
                />
            </TouchableOpacity>
            <View style={styles.viewlogo}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logongang.png')}
                />
            </View>
            <View style={styles.viewif}>
                <Text style={styles.txt1}>{t('findYourAccount')}</Text>
                <Text style={styles.txt2}>{t('enterYourEmailAddress')}</Text>
            </View>
            <View style={styles.viewinput}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="grey"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleForgetPassword}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={styles.txt3}>{t('continue')}</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default ForgetPassword