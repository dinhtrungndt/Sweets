import { View, Text, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { PinInput, PinInputField, usePinInput, usePinInputField, } from '@chakra-ui/pin-input'
import { styles } from './StyleCheckOTP'
import { checkOTP } from '../../../services/user/userService'
import { useTranslation } from 'react-i18next';

const CheckOTP = ({ navigation, route }) => {
    const { email } = route.params;
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();

    const handleCheckOTP = async () => {
        if (otp === '') {
            Alert.alert('OTP is required');
            return;
        }
        setLoading(true);
        try {
            const res = await checkOTP(email, otp);
            if (res.status === 1) {
                Alert.alert('Error', res.message);
            } else {
                Alert.alert('Success', res.message);
                setOtp('');
                navigation.navigate('ResetPassword', { email: email, otp: otp });
            }
        } catch (error) {
            console.log('CheckOTP error: ', error);
            Alert.alert('Error', 'An error occurred. Please try again later.');
        }
        setLoading(false);
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
            {/* <PinInput >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
            </PinInput> */}
            {/* <View style={styles.viewlogo}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logongang.png')}
                />
            </View> */}
            <View style={styles.viewif}>
                <Text style={styles.txt1}>{t('otpVerification')}</Text>
                <Text style={styles.txt2}>{t('wibuNeverdie')}</Text>
            </View>
            <View style={styles.viewinput}>
                <TextInput style={styles.input}
                    placeholder="OTP"
                    placeholderTextColor="grey"
                    value={otp}
                    onChangeText={(text) => setOtp(text)}
                >
                </TextInput>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCheckOTP}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text style={styles.txt3}>{t('continue')}</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default CheckOTP