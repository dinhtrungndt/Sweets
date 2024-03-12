import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
} from 'react-native'
import React, { useContext, useState, useCallback, useEffect } from 'react'
import { UserContext } from '../../../../contexts/user/userContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateAvatar } from '../../../../services/user/userService'
import { updateCoverImage } from '../../../../services/user/userService'

// style
import { styles } from '../style/profile'
import BottomSheet from '@gorhom/bottom-sheet'
import Animated from 'react-native-reanimated'

// library
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { set } from 'date-fns'


const Profile = (props) => {
    const { navigation } = props;

    const [loading, setLoading] = useState(false);

    const [imageAvatar, setImageAvatar] = useState(user && user.user.avatar ? user.user.avatar : null);
    const [coverImage, setCoverImage] = useState(null);

    const [modalVisibleAnhbia, setModalVisibleAnhbia] = useState(false);
    const [modalVisibleAvatar, setModalVisibleAvatar] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const { user, setUser } = useContext(UserContext);
    // console.log('user test', user);

    const handleModelOpen = () => {
        setModalVisible(true);
    }

    const handleAvatar = async () => {
        setModalVisibleAvatar(true);
    }

    const handleCoverImage = async () => {
        setModalVisibleAnhbia(true);
    }

    const takePhotoAvatar = useCallback(async (response) => {
        if (response.didCancel || response.errorCode || response.errorMessage) return;
            
        try {
            const formData = new FormData();
            formData.append('avatar', {
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
            });
            const data = await updateAvatar(user.user._id, formData);
            console.log('data avatar', data);

            // Cập nhật lại user sau khi cập nhật ảnh
            if (data.status === 1) {
                const updatedUser = { user: { ...user.user, avatar: data.data.avatar }};
                setUser({ user: updatedUser });
            }
        } catch (error) {
            console.log('Error uploading avatar:', error);
        }
    }, [setUser, user.user._id]);

    console.log(">>>>>> imageAvatar ", imageAvatar)

    const openCamera = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        await launchCamera(options, takePhotoAvatar);
    }, [takePhotoAvatar]);

    const openLibrary = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        await launchImageLibrary(options, takePhotoAvatar);
    }, [takePhotoAvatar]);

    const takePhotoCoverImage = useCallback(async (response) => {
        if (response.didCancel) return;
        if (response.errorCode) return;
        if (response.errorMessage) return;
        if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            setCoverImage(asset.uri);
            setModalVisibleAnhbia(false);
            // Upload image
            const formData = new FormData();
            formData.append('coverImage', { // Use 'coverImage' field name
                uri: asset.uri,
                type: asset.type,
                name: asset.fileName,
            });
            const data = await updateCoverImage(formData); // Call updateCoverImage with correct FormData
            console.log('data 106', data);
            // Handle response as needed
        }
    }, [takePhotoCoverImage]);

    const openCameraCoverImg = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        await launchCamera(options, takePhotoCoverImage);
    }, [takePhotoCoverImage]);

    const openLibraryCoverImg = useCallback(async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            saveToPhotos: true,
        };
        await launchImageLibrary(options, takePhotoCoverImage);
    }, [takePhotoCoverImage]);


    return (
        <View style={styles.body}>
            <View style={styles.profileFrame}>
                <TouchableOpacity onPress={handleCoverImage}>
                    <Image
                        style={styles.imgCover}
                        source={user && user.user.coverImage ? { uri: user.user.coverImage } : require('../../../../assets/diana.jpg')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAvatar}>
                    <Image
                        style={styles.imgAvatar}
                        source={user && user.user.avatar ? { uri: user.user.avatar } : require('../../../../assets/diana.jpg')}
                    />
                </TouchableOpacity>
                <Text style={styles.textName}>{user ? user.user.name : ''}</Text>
                <TouchableOpacity onPress={handleModelOpen} style={styles.btnIntroduce}>
                    <Text style={styles.textIntroduce}>Cập nhật giới thiệu bản thân</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.btnEditProfile}>
                    <Image style={styles.imgEdit} source={require('../../../../assets/icon_edit.png')}></Image>
                    <Text style={styles.txtEdit}>Chỉnh sửa trang cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.editFrame}>
                    <Image source={require('../../../../assets/icon_back.png')}></Image>
                    <TouchableOpacity
                        style={styles.btnMore}>
                        <Image source={require('../../../../assets/icon_more.png')}></Image>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisibleAnhbia}
                onRequestClose={() => {
                    setModalVisibleAnhbia(!modalVisibleAnhbia);
                }}>
                <View style={styles.modalContainerCoverImg}>
                    <TouchableOpacity style={styles.btnShowImg}>
                        <Image style={styles.imgAvt} source={require('../../../../assets/account.png')}></Image>
                        <Text style={styles.txtShowImg}>Xem ảnh bìa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openCameraCoverImg} style={styles.btnShowImg}>
                        <Image style={styles.imgAvt} source={require('../../../../assets/icon_camera_comment.png')}></Image>
                        <Text style={styles.txtShowImg}>Chụp ảnh mới</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openLibraryCoverImg} style={styles.btnShowImg}>
                        <Image style={styles.imgAvt} source={require('../../../../assets/icon_image.png')}></Image>
                        <Text style={styles.txtShowImg}>Chọn ảnh trên máy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={() => setModalVisibleAnhbia(!modalVisibleAnhbia)}>
                        <Image style={styles.imgAvt} source={require('../../../../assets/icon_delete.png')}></Image>
                        <Text style={styles.txtCancel}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisibleAvatar}
                onRequestClose={() => {
                    setModalVisibleAvatar(!modalVisibleAvatar);
                }}>
                <View style={styles.modalContainerAvatar}>
                    <TouchableOpacity style={styles.btnShowImg}>
                        <Image style={styles.imgAvt} source={require('../../../../assets/account.png')}></Image>
                        <Text style={styles.txtShowImg}>Xem ảnh đại diện</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openCamera} style={styles.btnShowImg}>
                        <Image style={styles.imgAvt} source={require('../../../../assets/icon_camera_comment.png')}></Image>
                        <Text style={styles.txtShowImg}>Chụp ảnh mới</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openLibrary} style={styles.btnShowImg}>
                        <Image style={styles.imgAvt} source={require('../../../../assets/icon_image.png')}></Image>
                        <Text style={styles.txtShowImg}>Chọn ảnh trên máy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnCancel}
                        onPress={() => setModalVisibleAvatar(!modalVisibleAvatar)}>
                        <Image style={styles.imgAvt} source={require('../../../../assets/icon_delete.png')}></Image>
                        <Text style={styles.txtCancel}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}  >
                <View style={styles.modalContainerYourself}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={styles.btnBackyourself}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Image style={styles.imgAvt} source={require('../../../../assets/icon_back.png')}></Image>
                            <Text style={styles.textStyle}>Chỉnh sửa lời giới thiệu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    )
}

export default Profile
