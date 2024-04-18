import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  deleteSavedPosts,
  getSavedIdUserTPosts,
  getSavedPosts,
} from '../../../../services/home/homeService';
import {UserContext} from '../../../../contexts/user/userContext';
import moment from 'moment';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DialogDeletePosts from 'react-native-dialog';
import Toast from 'react-native-toast-message';

const SavePostsScreen = props => {
  const {navigation} = props;
  const [savedPosts, setSavedPosts] = useState([]);
  const {user} = useContext(UserContext);
  const [visibleDiaLogDelete, setVisibleDiaLogDelete] = useState(false);
  const [idSaved, setIdSaved] = useState(null);

  const showDialogDelete = id => {
    setVisibleDiaLogDelete(true);
    setIdSaved(id);
  };

  const handleCancelDelete = () => {
    setVisibleDiaLogDelete(false);
  };

  const onGetSavedPosts = async () => {
    const res = await getSavedPosts(user.user._id);
    // console.log('res getSavedPosts', res);
    setSavedPosts(res.userSavedPosts);
  };

  const handleDeleteSavedPosts = async () => {
    try {
      const res = await deleteSavedPosts(user.user._id, idSaved);
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
      setVisibleDiaLogDelete(false);
    } catch (error) {
      console.log('error handleDeleteSavedPosts', error);
    }
  };

  const formatTime = createdAt => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInSeconds = currentTime.diff(postTime, 'seconds');

    if (diffInSeconds < 1) {
      return 'Đã lưu';
    } else if (diffInSeconds < 60) {
      return `Đã lưu ${diffInSeconds} giây trước`;
    } else if (diffInSeconds < 3600) {
      return `Đã lưu ${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 24 * 3600) {
      return `Đã lưu ${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else if (diffInSeconds < 30 * 24 * 3600) {
      return `Đã lưu ${Math.floor(diffInSeconds / (24 * 3600))} ngày trước`;
    } else if (diffInSeconds < 12 * 30 * 24 * 3600) {
      return `Đã lưu ${Math.floor(
        diffInSeconds / (30 * 24 * 3600),
      )} tháng trước`;
    } else {
      return `Đã lưu ${Math.floor(
        diffInSeconds / (12 * 30 * 24 * 3600),
      )} năm trước`;
    }
  };

  useEffect(() => {
    onGetSavedPosts();
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.T}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name={'chevron-back'} size={24} color={'#000'} />
          </TouchableOpacity>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
            Bài viết đã lưu
          </Text>
          <FontAwesome name={'search'} size={22} color={'#000'} />
        </View>
        <View style={styles.line}></View>
        <View style={styles.body}>
          <FlatList
            data={savedPosts}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <View style={styles.savedPosts_container}>
                <Image
                  source={{uri: item.idUsers.avatar}}
                  style={styles.avatar}
                />
                <View style={styles.content_container}>
                  <Text style={styles.content_text}>{item.content}</Text>
                  <Text style={styles.time_text}>
                    Bài viết của{' '}
                    <Text style={{fontWeight: 'bold'}}>
                      {item.idUsers.name}
                    </Text>
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#22b6c0', fontSize: 18}}>※</Text>
                    <Text style={styles.time_text}>
                      {formatTime(item.createAt)}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => showDialogDelete(item._id)}>
                  <FontAwesome6 name="x" size={12} color="#3d3d3d" />
                </TouchableOpacity>
              </View>
            )}
          />
          <DialogDeletePosts.Container visible={visibleDiaLogDelete}>
            <DialogDeletePosts.Title>
              Xóa thông báo này ?
            </DialogDeletePosts.Title>
            <DialogDeletePosts.Description>
              Sau khi xóa thông báo này bạn không thể khôi phục.
            </DialogDeletePosts.Description>
            <DialogDeletePosts.Button
              label="Hủy"
              onPress={handleCancelDelete}
            />
            <DialogDeletePosts.Button
              label="Chấp nhận"
              onPress={handleDeleteSavedPosts}
            />
          </DialogDeletePosts.Container>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default SavePostsScreen;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  body: {
    width: '100%',
    height: '100%',
  },
  savedPosts_container: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    padding: 10,
    paddingTop: 15,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  content_container: {
    width: '70%',
    height: '100%',
    marginLeft: 10,
  },
  content_text: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  time_text: {
    fontSize: 12,
    color: '#000',
    paddingLeft: 5,
  },
});
