import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { UserContext } from '../../../../contexts/user/userContext';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../style/account_transfer';
import { useTranslation } from 'react-i18next';

const Account_Transfer = (props) => {
    const { navigation } = props;
    const { user, onLogin } = useContext(UserContext);
    const bottomSheetRef = useRef(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { t, i18n } = useTranslation();

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {
        try {
            const storedAccounts = await AsyncStorage.getItem('userAccounts');
            // console.log('storedAccounts:', storedAccounts);
            if (storedAccounts !== null) {
                const parsedAccounts = JSON.parse(storedAccounts);
                if (Array.isArray(parsedAccounts)) {
                    setAccounts(parsedAccounts);
                } else {
                    console.error("Lỗi khi phân tích danh sách tài khoản: Dữ liệu không phải mảng.");
                }
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tài khoản:", error);
        }
    };

    const openBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current.collapse();
        setIsBottomSheetOpen(false);
    };

    const handleOkPress = async () => {
        closeBottomSheet();
        const success = await onLogin(email, password);
        if (success) {
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('userPassword', password);
            alert('Chuyển tài khoản thành công');
            loadAccounts();
        } else {
            alert('Chuyển tài khoản thất bại');
        }
    };

    const renderAccount = ({ item }) => {
        return (
            <TouchableOpacity style={styles.AccountFrame}>
                <Image style={styles.imgAccount} source={item.avatar ? { uri: item.avatar } : require('../../../../assets/diana.jpg')} />
                <Text style={styles.txt3}>{item.name}</Text>
                <Text style={styles.txt4}>{item.isLoggedIn ? 'Đã đăng nhập' : 'Chưa đăng nhập'}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.btnBack}>
                    <MaterialIcons
                        name='arrow-back'
                        size={30}
                        color='#FFFFFF'
                        style={styles.imgBack} />
                    <Text style={styles.txt1}>{t('switchAccount')}</Text>
                </TouchableOpacity>
                <View style={styles.body}>
                    <Text style={styles.txt2}>{t('quickLogin')}</Text>
                </View>
                <View style={styles.bodyAccount}>
                    <FlatList
                        data={accounts}
                        renderItem={renderAccount}
                        keyExtractor={item => item.id.toString()}
                    />
                    <TouchableOpacity style={styles.AccountFrame} onPress={openBottomSheet}>
                        <Image style={styles.imgAccount} source={require('../../../../assets/icon_add.png')} />
                        <Text style={styles.txt3}>{t('addAccount')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {isBottomSheetOpen && (
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={['35%', '60%']}
                    backgroundComponent={({ style }) => <View style={[style, { backgroundColor: '#FFFFFF' }]} />}
                    handleComponent={() => <View style={{ backgroundColor: 'black', height: 1, borderRadius: 2 }} />}
                    onChange={(index) => {
                        if (index === -1) {
                            setIsBottomSheetOpen(false);
                        }
                    }}>
                    <View style={{ backgroundColor: '#FFFFFF', padding: 16 }}>
                        <Text style={{ fontSize: 16, color: '#000000' }}>Nhập tài khoản và mật khẩu để đăng nhập</Text>
                        <TextInput
                            style={{ height: 60, borderBottomWidth: 1, borderBottomColor: '#E5E5E5', marginTop: 10 }}
                            placeholder="Tài khoản"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <TextInput
                            style={{ height: 60, borderBottomWidth: 1, borderBottomColor: '#E5E5E5', marginTop: 10 }}
                            placeholder="Mật khẩu"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry={true}
                        />
                        <View style={styles.btnBottomSheet}>
                            <TouchableOpacity onPress={closeBottomSheet} style={styles.btnCancel}>
                                <Text style={{ color: 'red', fontSize: 16, }}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleOkPress} style={styles.btnOk}>
                                <Text style={{ color: 'blue', fontSize: 16 }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BottomSheet>
            )}
        </GestureHandlerRootView>
    );
};

export default Account_Transfer;
