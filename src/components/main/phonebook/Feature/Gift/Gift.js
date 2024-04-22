import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import styles from '../../styles/GiftStyles';
import { useNavigation } from '@react-navigation/native';

const Gift = ({ route }) => {
    const navigation = useNavigation();
    const { birthdayData } = route.params;

    const [wishText, setWishText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSelectCard = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleWishSelection = (text) => {
        setWishText(text);
    };

    const handlePreview = () => {
        // Kiểm tra điều kiện trước khi điều hướng
        if (wishText === '') {
            alert('Vui lòng nhập nội dung lời chúc.');
            return;
        }
        if (selectedImage === null) {
            alert('Vui lòng chọn hình ảnh.');
            return;
        }
        // Điều hướng sang màn hình khác và truyền thông tin
        navigation.navigate('ReviewGift', {
            id:birthdayData.id,
            selectedItem: selectedItem,
            wishText: wishText,
            selectedImage: selectedImage,
            avatar: birthdayData.avatar,
            name: birthdayData.name
        });
    };
    
    const handleOK = () => {
        // Kiểm tra điều kiện trước khi điều hướng
        if (wishText === '') {
            alert('Vui lòng nhập nội dung lời chúc.');
            return;
        }
        if (selectedImage === null) {
            alert('Vui lòng chọn hình ảnh.');
            return;
        }
        // Điều hướng sang màn hình khác và truyền thông tin
        navigation.navigate('AcpectGift', {
            id:birthdayData.id,
            selectedItem: selectedItem,
            wishText: wishText,
            selectedImage: selectedImage,
            avatar: birthdayData.avatar,
            name: birthdayData.name
        });
    };
    
    

    const handleSelectItem = (item, image) => {
        setSelectedItem(item);
        setSelectedImage(image); // Lưu đường dẫn của tấm hình được chọn
    };
    

    return (
        <View style={{ flex: 1, backgroundColor: '#DCF9F9' }}>
            <View style={styles.wrapInfo}>
                <TouchableOpacity style={styles.iconBack} onPress={() => navigation.navigate('SinhNhat')}>
                    <Image source={require('../../../../../assets/icon_back.png')} style={styles.avatar} />
                </TouchableOpacity>
                <Image source={{ uri: birthdayData.avatar }} style={{ width: 60, height: 60, borderRadius: 30, borderColor: 'white', borderWidth: 1 }} />
                <Text style={styles.txtname}>{birthdayData.name}</Text>
            </View>

            <View style={styles.wrapInfo2}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập hoặc chọn bên dưới..."
                        placeholderTextColor="#a8a8a8"
                        multiline={true}
                        numberOfLines={2}
                        textAlignVertical="center"
                        keyboardType="default"
                        returnKeyType="done"
                        blurOnSubmit={true}
                        autoCapitalize="sentences"
                        autoCorrect={true}
                        autoFocus={false}
                        maxLength={30}
                        value={wishText}
                        onChangeText={(text) => setWishText(text)}
                    />
                    <TouchableOpacity style={styles.btnThiep} onPress={handleSelectCard}>
                        <Image source={require('../../../../../assets/icon_feeling.png')} />
                        <Text style={styles.txtChonThiep}>Chọn thiệp</Text>
                    </TouchableOpacity>

                    <Modal visible={showModal} transparent={true} animationType="fade"  >
                        <View style={styles.modalContainer}>
                            <View style={{ backgroundColor: 'white', borderRadius: 10, flexDirection: 'column', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'lightgray' }}>
                                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'lightgray' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>Đính kèm thiệp</Text>
                                    <TouchableOpacity onPress={handleCloseModal}>
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <ScrollView contentContainerStyle={styles.scrollViewContainer} horizontal={true}>
                                        <TouchableOpacity
                                             onPress={() => handleSelectItem(1, {uri: 'https://res.cloudinary.com/decryxsqb/image/upload/v1713364118/ss2ii9r5yqlx5zxx1jqw.jpg'})}
                                            style={[styles.imageContainer, selectedItem === 1 && styles.selectedItem]}
                                        >
                                            <Image source={require('../../../../../assets/bg111.jpg')} style={styles.image} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                           onPress={() => handleSelectItem(2, {uri: 'https://res.cloudinary.com/decryxsqb/image/upload/v1713364118/ss2ii9r5yqlx5zxx1jqw.jpg'})}
                                            style={[styles.imageContainer, selectedItem === 2 && styles.selectedItem]}
                                        >
                                            <Image source={require('../../../../../assets/bg222.jpg')} style={styles.image} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleSelectItem(3,{uri: 'https://res.cloudinary.com/decryxsqb/image/upload/v1713364114/eqchs00ex41jovwqtmde.jpg'})}
                                            style={[styles.imageContainer, selectedItem === 3 && styles.selectedItem]}
                                        >
                                            <Image source={require('../../../../../assets/bg333.jpg')} style={styles.image} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                           onPress={() => handleSelectItem(4,{uri: 'https://res.cloudinary.com/decryxsqb/image/upload/v1713364114/opcgopvuxyp87kkqemza.jpg'})}
                                            style={[styles.imageContainer, selectedItem === 4 && styles.selectedItem]}
                                        >
                                            <Image source={require('../../../../../assets/bg444.jpg')} style={styles.image} />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleSelectItem(5, {uri: 'https://res.cloudinary.com/decryxsqb/image/upload/v1713364114/pg9nm5aaaneucznapdos.jpg'})}
                                            style={[styles.imageContainer, selectedItem === 5 && styles.selectedItem]}
                                        >
                                            <Image source={require('../../../../../assets/bg555.jpg')} style={styles.image} />
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                                    <TouchableOpacity
                                        style={styles.btnSee}
                                        onPress={handlePreview}
                                    >
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Xem trước</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.btnSee2}
                                        onPress={handleOK}
                                    >
                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Áp dụng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={styles.defaultWishesContainer}>
                        <TouchableOpacity style={styles.defaultWishButton} onPress={() => handleWishSelection('🌹Chúc mừng sinh nhật!')}>
                            <Text style={styles.defaultWishText}>🌹Happy birthday!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.defaultWishButton} onPress={() => handleWishSelection('👏Yêu quá là yêu!')}>
                            <Text style={styles.defaultWishText}>👏Yêu quá là yêu!</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.defaultWishesContainer}>
                        <TouchableOpacity style={styles.defaultWishButton} onPress={() => handleWishSelection('❤Đi nhậu thôi!')}>
                            <Text style={styles.defaultWishText}>❤Đi nhậu thôi!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.defaultWishButton} onPress={() => handleWishSelection('✨Chúc bạn tất cả!')}>
                            <Text style={styles.defaultWishText}>✨Chúc bạn tất cả</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Gift;
