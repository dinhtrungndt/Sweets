import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../../../helper/Axiosinstance';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {UserContext} from '../../../../contexts/user/userContext';  
// styles
import { styles } from '../style/myQRcode';

const MyQRcode = (props) => {
    const { navigation } = props;
    const {user} = useContext(UserContext);
    const { t, i18n } = useTranslation();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const response = await AxiosInstance().get(`/users/get-user/${userId}`);
                setUserData(response.user);
            } catch (error) {
                console.error('Lỗi khi lấy thông tin người dùng:', error);
            }
        };

        fetchUserData();
    }, []);

    const viewShotRef = useRef();

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.body}>
            <View style={styles.wrapContent1}>
                <TouchableOpacity style={styles.friendItem} onPress={() => navigation.goBack()}>
                    <MaterialIcons
                        name='arrow-back'
                        color={'#FFFFFF'}
                        size={30}
                    />
                </TouchableOpacity>
                <Text style={styles.txtContent1}>{t('myQRcode')}</Text>
            </View>
            <View style={styles.wrapQr}>
                <View style={styles.container}>
                    <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                        <QRCode
                            style={styles.imgQR}
                            value={JSON.stringify(userData)}
                            size={240}
                        />
                        {/* <Image source={require('../../../../assets/logongang.png')} style={styles.avatar2} /> */}
                    </ViewShot>
                </View>
            </View>
            <Text style={styles.txtName}>{user.user.name}</Text>
            <Text style={styles.txt1}>Quét mã để thêm bạn với tôi</Text>
        </View>
    )
}

export default MyQRcode