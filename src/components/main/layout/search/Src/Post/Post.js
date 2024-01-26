// All.js, User.js, Post.js (các màn hình con)

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useRoute, } from '@react-navigation/native';
import { searchpost } from '../../../../../../services/search/Search';
import { LoadingScreen } from '../../../../../../utils/loading';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserContext } from '../../../../../../contexts/user/userContext';
const Post = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onGetPosts = async () => {
    try {
      const response = await searchpost(name);
      const usersData = response.users;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {

  }, [name]);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await onGetPosts();
    setRefreshing(false);
  }, []);
  const { user } = useContext(UserContext);
  const { navigation } = props;
  const route = useRoute();
  const parentRouteList = Object.values(route.params || {});
  const formatTime = createdAt => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInMinutes = currentTime.diff(postTime, 'minutes');

    if (diffInMinutes < 1) {
      return 'Vừa đăng';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else if (diffInMinutes < 24 * 60 * 30) {
      return `${Math.floor(diffInMinutes / (60 * 24))} ngày trước`;
    } else if (diffInMinutes < 24 * 60 * 30 * 12) {
      return `${Math.floor(diffInMinutes / (60 * 24 * 30))} tháng trước`;
    } else {
      return `${Math.floor(diffInMinutes / (60 * 24 * 30 * 12))} năm trước`;
    }
  }; const handleLike = async postId => {
    try {
      const userId = user.id;
      const response = await fetch(
        `https://sweets-bf2818fd7e8e.herokuapp.com/post/like/${postId}/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, postId }),
        },
      );

      const data = await response.json();
      // console.log('Response from API:', data);

      if (data.status === 1) {
        const updatedPosts = posts.map(post => {
          if (post._id === postId) {
            // console.log('>>>>>>>>>>>>>>>>>> 81', post.isLiked);
            return {
              ...post,
              isLiked: !post.isLiked,
              likedBy: post.isLiked
                ? post.likedBy.filter(id => id !== userId)
                : [...post.likedBy, userId],
            };
          }
          return post;
        });


        setposts([...updatedPosts]);
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', data.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  const name = parentRouteList.join(''); // Chuỗi các giá trị, cách nhau bằng dấu phẩy
  const [posts, setposts] = useState([]); // mảng bài viết
  const searchPost = async () => {
    try {
      const response = await searchpost(name);
      const usersData = response.users;

      // Tạo một mảng mới chứa tất cả các bài viết từ mảng users
      const allPosts = usersData.flatMap(user => user.posts || []);

      setposts(allPosts);

    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    searchPost();
  }, [name]);

  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(!showMore);
  }


  return (
    <View style={styles.container}>
      <View style={styles.viewconternt}>
        <Text style={styles.moinguoi}>Bài viết</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <View style={styles.baiViet} key={item._id}>

            <View
              style={[
                styles.baiVietHeader,
                { paddingTop: index === 0 ? 15 : 0 },
              ]}>
              <View style={styles.baiVietHeaderLeft}>
                <Image
                  style={styles.baiVietAvatar}
                  source={{ uri: item.avatar }}
                />
                <View>
                  <Text style={styles.baiVietName}>{item.name}</Text>
                  <Text style={styles.baiVietTime}>
                    {/* Vừa đăng, giây, phút, giờ, ngày*/}
                    {formatTime(item.time)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BottomSheetLayout', { item })
                }
                style={styles.baiVietHeaderRight}>
                <Icon name="ellipsis-horizontal-outline" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingLeft: 5 }}>
                <Icon name="close" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.baiVietContent}>
              {showMore ? (
                <Text style={styles.baiVietContentText}>
                  {item.content}
                </Text>
              ) : (
                <Text style={styles.baiVietContentText}>
                  {item.content.slice(0, 100)}
                </Text>
              )}
              {/* Toggle button */}
              {item.content.length > 100 && (
                <TouchableOpacity onPress={handleShowMore}>
                  <Text style={{ color: 'blue' }}>
                    {showMore ? 'Ẩn' : 'Xem thêm'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {item.image && item.image.length > 0 ? (
              <View style={styles.baiVietImage}>
                {item.image.map((imageUrl, index) => (
                  <Image
                    key={index}
                    style={[
                      styles.baiVietImageImage,
                      {
                        width: 100 / item.image.length + '%',
                      },
                    ]}
                    resizeMode="cover"
                    source={{ uri: imageUrl }}
                  />
                ))}
                {/* {console.log('>>>>>>>>>>>>>>>>>> 2511111', item.image)} */}
              </View>
            ) : (
              <View style={{ height: 0 }} />
            )}

            <View style={styles.baiVietLikeCommentShare}>
              <View style={styles.baiVietLike}>
                <TouchableOpacity
                  onPress={() => handleLike(item._id)}
                  style={[
                    styles.baiVietLikeIcon,
                    {
                      flexDirection: 'row',
                      paddingLeft: 0,
                    },
                  ]}>
                  {item.isLiked ? (
                    <Icon name="heart" size={20} color="red" style={styles.baiVietLikeIcon} />
                  ) : (
                    <Icon name="heart" size={20} color="grey" style={styles.baiVietLikeIcon} />
                  )}
                  {/* {console.log(
                          '------ >>>>>>>>>>>>>>>>>> 4111111',
                          item.isLiked,
                        )} */}
                  <Text style={styles.baiVietLikeText}>
                    {item.likedBy.length}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.baiVietComments}
              >
                {/* onPress={() =>
                  navigation.navigate('CommentScreen', { postId: item })
                } */}
                <Icon name="chatbox-outline" size={20} color="grey" style={styles.baiVietLikeIcon} />
                <Text style={styles.baiVietCommentsText}>
                  {item.comment} bình luận
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.baiVietShare}>
                <Icon name="arrow-redo-outline" size={20} color="grey" style={styles.baiVietLikeIcon} />
                <Text style={styles.baiVietShareText}>Share</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.lineHr, { marginTop: 10, height: 5 }]} />
          </View>
        )}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={3000}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <View style={styles.noMore}>
            <LoadingScreen />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }


      />
    </View>
  );
};

export default Post;

export const styles = StyleSheet.create({
  viewconternt: {
    width: '100%',
    height: 'auto',
    marginLeft: '5%',
    marginTop: '5%'
  },
  txtprofile: {
    color: 'blue',
    fontWeight: '400',
    fontSize: 15
  },
  fl: {
    flexDirection: 'row',
    marginTop: '2%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  item2: {
    width: '40%',
    height: 'auto',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  container: {
    flex: 1,

    width: '100%'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '60%',
  },
  moinguoi: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },

  baiViet: {
    margin: 16,
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,

  },
  baiVietHeader: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  baiVietAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  baiVietName: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
    marginLeft: 15,
    color: '#050505',
  },
  baiVietTime: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#606770',
    marginLeft: 15,
  },
  baiVietHeaderLeft: {
    width: 265,
    flexDirection: 'row',
    alignItems: 'center',
  },
  baiVietHeaderRight: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  baiVietHeaderRightIcon: {
    width: 26,
    height: 26,
    resizeMode: 'cover',
  },
  baiVietContent: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  baiVietContentText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#050505',
    fontWeight: '300',
  },
  baiVietImage: {
    marginTop: 10,
    height: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'gray',
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
  },
  baiVietImageImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  baiVietLikeCommentShare: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  baiVietLike: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  baiVietLikeIcon: {
    width: 28,
    height: 28,
  },
  baiVietLikeText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: 3,
    marginTop: 3,
  },
  baiVietComments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  baiVietCommentsIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  baiVietCommentsText: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  baiVietShare: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  baiVietShareIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  baiVietShareText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: 5,
  },
  noStatus: {
    padding: 10,
  },
});
