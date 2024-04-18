import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../../../../../../../contexts/user/userContext';
import {
  deleteNotification,
  getNotificationRecipient,
  updateNotification,
} from '../../../../../../../services/home/homeService';
import moment from 'moment';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DialogDeletePosts from 'react-native-dialog';

const CommentsTabs = props => {
  const {navigation} = props;
  const {user} = useContext(UserContext);
  const [listNotifiRecipi, setListNotifiRecipi] = useState([]);
  const [visibleDiaLogDelete, setVisibleDiaLogDelete] = useState(false);
  const [idNotifi, setIdNotifi] = useState(null);

  const cutString = str => {
    if (str.length > 10) {
      return str.slice(0, 10) + '...';
    }
    return str;
  };

  const cutStringContent = str => {
    if (str.length > 100) {
      return str.slice(0, 100) + '...';
    }
    return str;
  };

  const formatTime = createdAt => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInSeconds = currentTime.diff(postTime, 'seconds');

    if (diffInSeconds < 1) {
      return 'Vừa đăng';
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 24 * 3600) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else if (diffInSeconds < 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (24 * 3600))} ngày trước`;
    } else if (diffInSeconds < 12 * 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (30 * 24 * 3600))} tháng trước`;
    } else {
      return `${Math.floor(diffInSeconds / (12 * 30 * 24 * 3600))} năm trước`;
    }
  };

  const onGetNotifiRecipi = async () => {
    try {
      const res = await getNotificationRecipient(user.user._id);
      setListNotifiRecipi(res);
    } catch (error) {
      console.log('error onGetNotifiRecipi', error);
    }
  };

  const findType = listNotifiRecipi.filter(item => item.type === 'comments');
  //   console.log('findTypeC', findType);

  const showDialogDelete = idNotifi => {
    setVisibleDiaLogDelete(true);
    setIdNotifi(idNotifi);
  };

  const handleCancelDelete = () => {
    setVisibleDiaLogDelete(false);
  };

  const handleOpenLink = async item => {
    await updateNotification(item._id);
    navigation.navigate('CommentsScreen', {postId: item.link});
    await onGetNotifiRecipi();
  };

  const handleDeleteNotifi = async () => {
    try {
      await deleteNotification(idNotifi);
      setVisibleDiaLogDelete(false);
      onGetNotifiRecipi();
    } catch (error) {
      console.log('error handleDeleteNotifi', error);
    }
  };

  useEffect(() => {
    onGetNotifiRecipi();
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.T}>
        <FlatList
          data={findType}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <>
              {item.read === false ? (
                <TouchableOpacity
                  style={styles.listNotifi_ContainerFalse}
                  onPress={() => handleOpenLink(item)}>
                  {/* user */}
                  <View style={styles.user_container}>
                    <Image
                      source={{uri: item?.sender?.avatar}}
                      style={{width: 50, height: 50, borderRadius: 50}}
                    />
                    <Text style={styles.user_name}>
                      {cutString(item?.sender?.name)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    {/* content */}
                    <View style={styles.content_container}>
                      <Text style={styles.text_content}>
                        {cutStringContent(item.content)}
                      </Text>
                      <Text style={{fontSize: 12}}>
                        {formatTime(item.createdAt)}
                      </Text>
                    </View>
                    {/* delete */}
                    <TouchableOpacity
                      onPress={() => showDialogDelete(item._id)}>
                      <FontAwesome6 name="x" size={12} color="#3d3d3d" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.listNotifi_Container}
                  onPress={() => handleOpenLink(item)}>
                  {/* user */}
                  <View style={styles.user_container}>
                    <Image
                      source={{uri: item?.sender?.avatar}}
                      style={{width: 50, height: 50, borderRadius: 50}}
                    />
                    <Text style={styles.user_name}>
                      {cutString(item?.sender?.name)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    {/* content */}
                    <View style={styles.content_container}>
                      <Text style={styles.text_content}>
                        {cutStringContent(item.content)}
                      </Text>
                      <Text style={{fontSize: 12}}>
                        {formatTime(item.createdAt)}
                      </Text>
                    </View>
                    {/* delete */}
                    <TouchableOpacity
                      onPress={() => showDialogDelete(item._id)}>
                      <FontAwesome6 name="x" size={12} color="#3d3d3d" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            </>
          )}
        />
        <DialogDeletePosts.Container visible={visibleDiaLogDelete}>
          <DialogDeletePosts.Title>Xóa thông báo này ?</DialogDeletePosts.Title>
          <DialogDeletePosts.Description>
            Sau khi xóa thông báo này bạn không thể khôi phục.
          </DialogDeletePosts.Description>
          <DialogDeletePosts.Button label="Hủy" onPress={handleCancelDelete} />
          <DialogDeletePosts.Button
            label="Chấp nhận"
            onPress={handleDeleteNotifi}
          />
        </DialogDeletePosts.Container>
      </View>
    </GestureHandlerRootView>
  );
};

export default CommentsTabs;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  listNotifi_ContainerFalse: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  listNotifi_Container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user_container: {
    width: '15%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_name: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  content_container: {
    width: '80%',
    flexDirection: 'column',
    paddingLeft: 16,
  },
  text_content: {
    fontSize: 14,
    color: '#000',
  },
});
