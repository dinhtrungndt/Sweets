import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image, Alert } from 'react-native';
import { changePassword } from '../../../../services/user/userService';
import { UserContext } from '../../../../contexts/user/userContext';
import { styles } from '../style/changePassword';
import { useTranslation } from 'react-i18next';

const ChangePassword = (props) => {
    const { navigation } = props;
    const { user } = useContext(UserContext);
    const { t } = useTranslation();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    console.log(user.user.password);

    const handleChangePassword = async () => {
        if (currentPassword === '' || newPassword === '' || confirmNewPassword === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        } else if (newPassword !== confirmNewPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới không khớp. Vui lòng nhập lại.');
            return;
        } else if (newPassword === currentPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới không được trùng với mật khẩu cũ. Vui lòng nhập lại.');
            return;
        }
        else {
            try {
                setLoading(true);
                const response = await changePassword(user.user._id, currentPassword, newPassword);
                // Xử lý kết quả trả về từ hàm changePassword ở đây
                if (response.message === 'Mật khẩu cũ không đúng') {
                    Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng. Vui lòng nhập lại.');
                    return;
                } else if (response.status === 1) {
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                    setLoading(false);
                    Alert.alert('Thành công', 'Mật khẩu đã được thay đổi thành công !');
                }
            } catch (error) {
                console.log('Lỗi khi đổi mật khẩu:', error);
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.body}>
            <View style={styles.btnBackyourself}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../assets/icon_back.png')} style={styles.imgAvt} />
                </TouchableOpacity>
                <Text style={styles.txtShowImg}>{t('changepassword')}</Text>
            </View>
            <View style={styles.title}>
                <Text style={styles.txt1}>{t('currentPassword')}:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu hiện tại"
                    secureTextEntry={true}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
            </View>
            <View style={styles.title}>
                <Text style={styles.txt1}>{t('newPassword')}:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập mật khẩu mới"
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nhập lại mật khẩu mới"
                    secureTextEntry={true}
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                />
            </View>
            <TouchableOpacity style={styles.btnUpdate} onPress={handleChangePassword} disabled={loading}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.txtShowImg}>Xác nhận</Text>}
            </TouchableOpacity>
        </View>
    );
};

export default ChangePassword;
