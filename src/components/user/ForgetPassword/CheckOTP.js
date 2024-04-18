import { View, Text, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { styles } from './StyleCheckOTP'
import { checkOTP } from '../../../services/user/userService'
import { useTranslation } from 'react-i18next';

const CheckOTP = ({ navigation, route }) => {
    const { email } = route.params;
    const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleCheckOTP = async () => {
        const otp = otpInputs.join('');
        if (otp.length < 6) {
            Alert.alert('OTP is required');
            return;
        }
        setLoading(true);
        try {
            const res = await checkOTP(email, otp);
            if (res.success) {
                Alert.alert('Success', res.message);
                navigation.navigate('ResetPassword', { email: email, otp: otp });
            } else {
                Alert.alert('Error', 'OTP is not correct');
            }
        } catch (error) {
            console.log('CheckOTP error: ', error);
            Alert.alert('Error', 'An error occurred. Please try again later.');
        }
        setLoading(false);
    };


    const handleInputChange = (index, value) => {
        const newOtpInputs = [...otpInputs];
        newOtpInputs[index] = value;
        setOtpInputs(newOtpInputs);

        // Auto focus to the next input field if available
        if (index < otpInputs.length - 1 && value !== '') {
            const nextInput = index + 1;
            this[`textInput${nextInput}`].focus();
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
            <View style={styles.viewif}>
                <Text style={styles.txt1}>{t('otpVerification')}</Text>
                <Text style={styles.txt2}>{t('wibuNeverdie')}</Text>
            </View>
            <View style={styles.viewinput}>
                {otpInputs.map((value, index) => (
                    <TextInput
                        ref={(input) => (this[`textInput${index}`] = input)}
                        key={index}
                        style={styles.input}
                        placeholderTextColor="grey"
                        value={value}
                        onChangeText={(text) => handleInputChange(index, text)}
                        maxLength={1}
                        keyboardType="numeric"
                    />
                ))}
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
