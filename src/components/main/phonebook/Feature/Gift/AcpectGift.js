import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../../../../helper/Axiosinstance';
import { useNavigation } from '@react-navigation/native';
const AcpectGift = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedItem, wishText, selectedImage, avatar, name,id } = route.params;
    const [info, setinfo] = useState(null);
    const [av, setav] = useState(null);

    useEffect(() => {
        console.log(">>>>>>> selectedImages",selectedImage)
        const fetchFriendsDetails = async () => {
            try {
                const axiosInstance = AxiosInstance(); // Tạo một instance của Axios

                // Lấy userId từ AsyncStorage
                const userId = await AsyncStorage.getItem('userId');
                // Tạo một mảng chứa thông tin chi tiết của các bạn bè



                const friendDetailsResponse = await axiosInstance.get(`/users/get-user/${userId}`);
                console.log('friendDetailsResponse2222', friendDetailsResponse)

                setinfo(friendDetailsResponse.user.name)
                setav(friendDetailsResponse.user.avatar)
                return friendDetailsResponse.user; // Lấy thông tin user từ response

                // Kiểm tra xem userId có tồn tại không

            } catch (error) {
                console.error('Lỗi khi lấy danh sách bạn bè:', error);
            }
        };

        fetchFriendsDetails();
    }, []);

    const handleSendCard = async () => {
        try {
           
            const userId = await AsyncStorage.getItem('userId');
            const payload = {
                idSender:userId,
                idReceiver:id,
                content:wishText,
                image:selectedImage.uri
               
            };
            const response = await AxiosInstance().post('/birthday/add', payload);
            // Xử lý response nếu cần
            Alert.alert(response.message)
            console.log('Response:', response);
            navigation.navigate('SinhNhat')
        } catch (error) {
            console.error('Lỗi khi gửi thiệp mời:', error);
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={styles.wrapInfo}>
                <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../../assets/icon_back.png')} style={styles.avatar} />
                </TouchableOpacity>

                <Text style={styles.txtname}>Thiệp chúc sinh nhật</Text>
            </View>

            <View style={{ margin:5, alignItems: 'center', borderWidth: 1, borderColor: 'lightgray', borderRadius: 20 }}>
                <Image source={selectedImage} 
                style={{ width: '100%', height: '60%', resizeMode: 'contain',borderBottomLeftRadius:40,borderBottomRightRadius:40 }} />
                <View style={{ flexDirection: 'row' ,justifyContent:'space-around',width:'100%',margin:5}}>


                <View style={{alignItems:'center'}}>
                <Text style={{color:'#22b6c0'}}> Từ</Text>
                  <Image source={{ uri: av }} style={{ width: 60, height: 60, borderRadius: 30, borderColor: 'white', borderWidth: 1 }} />
                    <Text style={styles.names}> {info}</Text>
                  </View>
                  
                    <View style={{alignItems:'center'}}>
                    <Text style={{color:'#22b6c0'}}> Đến</Text>
                    <Image source={{ uri: avatar }} style={{ width: 60, height: 60, borderRadius: 30, borderColor: 'white', borderWidth: 1 }} />
                    <Text style={styles.names}> {name}</Text>
                    </View>

                
                </View>
                
                <Text style={styles.title}> {wishText}</Text>



            </View>
            <TouchableOpacity style={styles.btnSend} onPress={handleSendCard}>
                <Text style={{color:'black', textAlign:'center'}}>Gửi thiệp mời</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#22b6c0',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    txtname: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 12,
        marginHorizontal: 9
    },
    iconBack: {
        padding: 3,
        backgroundColor: 'lightgray',
        alignSelf: 'flex-start',
        borderRadius: 10,
        marginLeft: 10,
        marginTop: 13,

        marginHorizontal: 10

    },
    avatar: {
        width: 20,
        height: 20
    },
    names: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    },
    title: {
        color: '#22b6c0',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:10,
        textAlign:'center'
    },
    btnSend:{
        width:'80%',
        backgroundColor:'#DCF9F9',
        justifyContent:'center',
        alignSelf:'center',
        height:40
       
    }

})
export default AcpectGift;
