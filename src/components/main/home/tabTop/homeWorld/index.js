/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// StyleCss
import styles from './style/home';

// Data
import {getPosts, likePost} from '../../../../../services/home/homeService';

// Library
import {UserContext} from '../../../../../contexts/user/userContext';
import {LoadingScreen} from '../../../../../utils/loading';
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeWorldTab = props => {
  const {navigation} = props;
  const {user} = useContext(UserContext);
  const [showMore, setShowMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const onGetPosts = async () => {
    try {
      const res = await getPosts();
      const updatedPosts = res?.flatMap(project =>
        project?.posts?.map(post => {
          const likedByCurrentUser = post.likedBy.includes(user.id);
          // console.log('>>>>>>>>>>>>>>>>>> 78', likedByCurrentUser);
          return {
            ...post,
            isLiked: likedByCurrentUser,
          };
        }),
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Lỗi: ', error);
    }
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

  const handleLike = async postId => {
    try {
      const userId = user.id;
      const response = await likePost(userId, postId);
      const likedByCurrentUser = response.post.likedBy.includes(userId);

      if (response.status === 1) {
        const updatedPosts = posts.map(post => {
          if (post._id === postId) {
            return {
              ...post,
              isLiked: likedByCurrentUser,
              likedBy: response.post.likedBy,
            };
          }
          return post;
        });

        setPosts(updatedPosts);
        await AsyncStorage.setItem(
          `isLiked_${postId}`,
          likedByCurrentUser ? 'true' : 'false',
        );
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', response.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await onGetPosts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    onGetPosts();
  }, []);

  return (
    <View style={styles.T}>
      <View style={styles.postsCss}>
        <Text style={styles.lineHr} />
        {posts.length === 0 ? (
          <Text style={styles.noStatus}>Không có bài viết nào được đăng !</Text>
        ) : (
          <FlatList
            data={posts}
            renderItem={({item, index}) => (
              <View style={styles.baiViet} key={item._id}>
                {/* {console.log('>>>>>>>>>>>>>>>>>> 2511111', item.name)} */}
                <View
                  style={[
                    styles.baiVietHeader,
                    {paddingTop: index === 0 ? 15 : 0},
                  ]}>
                  <View style={styles.baiVietHeaderLeft}>
                    <Image
                      style={styles.baiVietAvatar}
                      source={{uri: item.avatar}}
                    />
                    <View style={styles.baiVietNameTime}>
                      <Text style={styles.baiVietName}>{item.name}</Text>
                      <Text style={styles.baiVietTime}>
                        {/* Vừa đăng, giây, phút, giờ, ngày*/}
                        {formatTime(item.time)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('BottomSheetLayout', {item})
                    }
                    style={styles.baiVietHeaderRight}>
                    <Icon name="ellipsis1" size={24} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{paddingLeft: 5}}>
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
                      <Text style={{color: 'blue'}}>
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
                            width:
                              item.image.length > 3
                                ? 180 / item.image.length + '%'
                                : 90 / item.image.length + '%',
                            borderRadius: 5,
                            margin: 5,
                            alignItems: 'center',
                            resizeMode: 'contain',
                            height:
                              item.image.length > 3
                                ? 195 / item.image.length + '%'
                                : '100%',
                          },
                        ]}
                        resizeMode="cover"
                        source={{uri: imageUrl}}
                      />
                    ))}
                    {/* {console.log('>>>>>>>>>>>>>>>>>> 2511111', item.image)} */}
                  </View>
                ) : (
                  <View style={{height: 0}} />
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
                        <Image
                          style={styles.baiVietLikeIcon}
                          source={require('../../../../../assets/icon_like_click.png')}
                        />
                      ) : (
                        <Image
                          style={styles.baiVietLikeIcon}
                          source={require('../../../../../assets/icon_like.png')}
                        />
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
                    onPress={() =>
                      navigation.navigate('CommentScreen', {postId: item})
                    }>
                    <Image
                      style={styles.baiVietCommentsIcon}
                      source={require('../../../../../assets/icon_comment.png')}
                    />
                    <Text style={styles.baiVietCommentsText}>
                      {item.comment} bình luận
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.baiVietShare}>
                    <Image
                      style={styles.baiVietShareIcon}
                      source={require('../../../../../assets/icon_share.png')}
                    />
                    <Text style={styles.baiVietShareText}>Share</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.lineHr, {marginTop: 10, height: 5}]} />
              </View>
            )}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={3000}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};
