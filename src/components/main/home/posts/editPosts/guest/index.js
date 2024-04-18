/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../../../../../../contexts/user/userContext';
import {
  deleteSavedPosts,
  getSavedPosts,
  savePosts,
} from '../../../../../../services/home/homeService';
import Toast from 'react-native-toast-message';

const ModalEditPostsGuest = ({editPostsItemGuest}) => {
  // console.log('>>>>>>>> bên khách', user.user._id);
  const {user} = useContext(UserContext);
  const [savedPosts, setSavedPosts] = useState([]);

  const handleSavePosts = async id => {
    try {
      const res = await savePosts(user.user._id, id);
      // console.log('res handleSavePosts', res);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Lưu bài viết thành công !',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      onGetSavedPosts();
    } catch (error) {
      console.log('error handleSavePosts', error);
    }
  };

  const handleDeleteSavedPosts = async id => {
    try {
      const res = await deleteSavedPosts(user.user._id, id);
      // console.log('res handleDeleteSavedPosts', res);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Hủy lưu bài viết thành công !',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      onGetSavedPosts();
    } catch (error) {
      console.log('error handleDeleteSavedPosts', error);
    }
  };

  const onGetSavedPosts = async () => {
    try {
      const res = await getSavedPosts(user.user._id);
      // console.log('res onGetSavedPosts', res.userSavedPosts.length === 0);
      setSavedPosts(res);
    } catch (error) {
      console.log('error onGetSavedPosts', error);
    }
  };

  useEffect(() => {
    onGetSavedPosts();
  }, []);

  return (
    <View style={styles.T}>
      {/* list 1 */}
      <View style={styles.list_1_Container}>
        {/* save posts */}
        <View>
          {!savedPosts?.userSavedPosts
            ?.map(item => item._id)
            .includes(editPostsItemGuest._id) ? (
            <TouchableOpacity
              style={styles.savePosts}
              onPress={() => handleSavePosts(editPostsItemGuest._id)}>
              <Ionicons name={'duplicate'} size={30} color={'#000'} />
              <View style={{paddingLeft: 15, width: '93%'}}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                  Lưu bài viết
                </Text>
                <Text>Thêm vào danh sách các mục đã lưu.</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.savePosts}
              onPress={() => handleDeleteSavedPosts(editPostsItemGuest._id)}>
              <Ionicons name={'duplicate'} size={30} color={'#000'} />
              <View style={{paddingLeft: 15, width: '93%'}}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                  Hủy lưu bài viết
                </Text>
                <Text>Thêm vào danh sách các mục đã lưu.</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.savePosts, {paddingTop: 20}]}>
            <Ionicons name={'close-circle-sharp'} size={30} color={'#000'} />
            <View style={{paddingLeft: 15, width: '93%'}}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                Ẩn bớt
              </Text>
              <Text>Ẩn bớt bài viết gợi ý tương tự.</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.savePosts, {paddingTop: 20}]}>
            <Ionicons name={'alert-circle'} size={30} color={'#000'} />
            <View style={{paddingLeft: 15, width: '93%'}}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                Báo cáo ảnh
              </Text>
              <Text>
                Chúng tôi sẽ không cho{' '}
                <Text style={{color: '#22b6c0'}}>
                  {editPostsItemGuest.idUsers.name}
                </Text>{' '}
                biết ai đã báo cáo.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.savePosts, {paddingTop: 20}]}>
            <Ionicons name={'notifications'} size={30} color={'#000'} />
            <View style={{paddingLeft: 15, width: '93%'}}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                Nhận thông báo về bài viết này
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* hide temporarily */}
      <View style={styles.hide_temporarily_Container}>
        <TouchableOpacity style={styles.savePosts}>
          <Ionicons name={'time-sharp'} size={30} color={'#000'} />
          <View style={{paddingLeft: 15, width: '93%'}}>
            <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
              Tạm ẩn{' '}
              <Text style={{color: '#22b6c0'}}>
                {editPostsItemGuest.idUsers.name}
              </Text>{' '}
              trong 30 ngày
            </Text>
            <Text>Tạm thời không nhìn thấy bài viết này nữa.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.savePosts, {paddingTop: 20}]}>
          <Ionicons name={'file-tray-full'} size={30} color={'#000'} />
          <View style={{paddingLeft: 15, width: '93%'}}>
            <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
              Ẩn tất cả từ{' '}
              <Text style={{color: '#22b6c0'}}>
                {editPostsItemGuest.idUsers.name}
              </Text>{' '}
            </Text>
            <Text>Bạn sẽ không thấy tất cả bài viết nữa.</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalEditPostsGuest;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '60%',
    bottom: 0,
    backgroundColor: '#fff',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  list_1_Container: {
    padding: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 2,
    borderRadius: 10,
  },
  savePosts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hide_temporarily_Container: {
    padding: 18,
    marginTop: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 2,
    borderRadius: 10,
  },
});
