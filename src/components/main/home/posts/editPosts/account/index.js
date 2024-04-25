/* eslint-disable prettier/prettier */
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  deletePostsAccount,
  deleteSavedPosts,
  getPosts,
  getSavedPosts,
  savePosts,
} from '../../../../../../services/home/homeService';
import DialogDeletePosts from 'react-native-dialog';
import EditPostsIn from '../editPostsIn';
import ChangeObjects from './objects';
import {UserContext} from '../../../../../../contexts/user/userContext';
import Toast from 'react-native-toast-message';

const ModalEditPostsAccount = ({
  editPostsItemAccount,
  handleDeletePosts,
  navigation,
  reloadPosts,
}) => {
  // console.log('>>>>>>>> bên user', editPostsItemAccount._id);
  const [visibleDiaLogDeletePosts, setVisibleDiaLogDeletePosts] =
    useState(false);
  const [modalEditPostsIn, setModalEditPostsIn] = useState(false);
  const [modalEditObjects, setModalEditObjects] = useState(false);
  const {user} = useContext(UserContext);
  const [savedPosts, setSavedPosts] = useState([]);

  const showDialog = () => {
    setVisibleDiaLogDeletePosts(true);
  };

  const handleCancel = () => {
    setVisibleDiaLogDeletePosts(false);
  };

  const handleDelete = async () => {
    await handleDeletePosts();
    setVisibleDiaLogDeletePosts(false);
  };

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
        <View style={{alignItems: 'center'}}>
          {!savedPosts?.userSavedPosts
            ?.map(item => item._id)
            .includes(editPostsItemAccount._id) ? (
            <TouchableOpacity
              style={[styles.savePosts]}
              onPress={() => handleSavePosts(editPostsItemAccount._id)}>
              <Ionicons name={'duplicate'} size={30} color={'#000'} />
              <View style={styles.textList}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                  Lưu bài viết
                </Text>
                <Text>Thêm vào danh sách các mục đã lưu.</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.savePosts]}
              onPress={() => handleDeleteSavedPosts(editPostsItemAccount._id)}>
              <Ionicons name={'duplicate'} size={30} color={'#000'} />
              <View style={styles.textList}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                  Hủy lưu bài viết
                </Text>
                <Text>Thêm vào danh sách các mục đã lưu.</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.savePosts, {paddingTop: 20}]}
            onPress={() => setModalEditPostsIn(true)}>
            <MaterialIcons name={'edit'} size={30} color={'#000'} />
            <View style={styles.textList}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                Chỉnh sửa bài viết
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.savePosts, {paddingTop: 20}]}
            onPress={() => setModalEditObjects(true)}>
            <FontAwesome6 name={'lock'} size={23} color={'#000'} />
            <View style={[styles.textList, {paddingLeft: 18}]}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                Chỉnh sửa quyền riêng tư
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.savePosts, {paddingTop: 20}]}
            onPress={showDialog}>
            <MaterialIcons name={'delete'} size={30} color={'#000'} />
            <View style={[styles.textList, {paddingLeft: 16}]}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                Xóa bài viết
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.savePosts, {paddingTop: 20}]}>
            <Ionicons name={'notifications'} size={30} color={'#000'} />
            <View style={[styles.textList, {paddingLeft: 16}]}>
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
          <Ionicons name={'albums'} size={30} color={'#000'} />
          <View style={styles.textList}>
            <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
              Thêm vào album
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <DialogDeletePosts.Container visible={visibleDiaLogDeletePosts}>
        <DialogDeletePosts.Title>Xóa bài viết này ?</DialogDeletePosts.Title>
        <DialogDeletePosts.Description>
          Sau khi xóa bài viết này bạn không thể khôi phục.
        </DialogDeletePosts.Description>
        <DialogDeletePosts.Button label="Hủy" onPress={handleCancel} />
        <DialogDeletePosts.Button label="Chấp nhận" onPress={handleDelete} />
      </DialogDeletePosts.Container>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditPostsIn}
        onRequestClose={() => {}}>
        <EditPostsIn
          cancel={() => setModalEditPostsIn(false)}
          editPostsItemAccount={editPostsItemAccount}
          navigation={navigation}
          reloadPosts={reloadPosts}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditObjects}
        onRequestClose={() => {}}>
        <ChangeObjects
          cancel={() => setModalEditObjects(false)}
          itemPosts={editPostsItemAccount}
          navigation={navigation}
          reloadPosts={reloadPosts}
        />
      </Modal>
    </View>
  );
};

export default ModalEditPostsAccount;

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  textList: {
    width: '93%',
    paddingLeft: 15,
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
    alignItems: 'center',
  },
});
