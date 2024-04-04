/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

const ModalEditPostsGuest = ({editPostsItemGuest}) => {
  // console.log('>>>>>>>> bên khách', editPostsItemGuest.idUsers.name);

  return (
    <View style={styles.T}>
      {/* list 1 */}
      <View style={styles.list_1_Container}>
        {/* save posts */}
        <View>
          <TouchableOpacity style={styles.savePosts}>
            <Ionicons name={'duplicate'} size={30} color={'#000'} />
            <View style={{paddingLeft: 15, width: '93%'}}>
              <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                Lưu bài viết
              </Text>
              <Text>Thêm vào danh sách các mục đã lưu.</Text>
            </View>
          </TouchableOpacity>
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
