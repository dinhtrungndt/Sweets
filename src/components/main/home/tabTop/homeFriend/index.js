/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';

// Data
import {dataStory} from './data';
import {getPostById, likePost} from '../../../../../services/home/homeService';

// StyleCss
import styles from './style/home';

// Library
import moment from 'moment';
import {UserContext} from '../../../../../contexts/user/userContext';
import {LoadingScreen} from '../../../../../utils/loading';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeFriendTab = props => {
  const {navigation} = props;

  const {user} = useContext(UserContext);
  const [showMore, setShowMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const onGetPostById = async () => {
    try {
      const userId = user.id;
      const res = await getPostById(userId);

      if (res && res.friends && res.posts) {
        // console.log('>>>>>>>>>>>>>>>>>> 93', res.posts);
        const updatedPostsFriends = res.friends.flatMap(friend =>
          friend.posts.map(friendd => {
            const likedByCurrentUser = friendd.likedBy.includes(user.id);
            return {
              ...friendd,
              friendds: [
                {
                  ...friendd,
                  isLiked: likedByCurrentUser,
                },
              ],
            };
          }),
        );

        const updatedPostsMe = res.posts.map(post => {
          // console.log('>>>>>>>>>>>>>>>>>> 93', post);
          const likedByCurrentUser = post.likedBy.includes(user.id);
          return {
            ...post,
            isLiked: likedByCurrentUser,
          };
        });

        // console.log('>>>>>>>>>>>>>>> In updatedPosts :', updatedPostsFriends);
        // console.log('>>>>>>>>>>>>>>> In updatedPostsMe :', updatedPostsMe);

        const sortedPosts = [...updatedPostsFriends, ...updatedPostsMe].sort(
          (a, b) => moment(b.time).diff(moment(a.time)),
        );

        // console.log('>>>>>>>>>>>>>>> In sortedPosts :', sortedPosts);
        setPosts([...sortedPosts]);
      } else {
        console.error('>>>>>>>>>>>>>>>> Lỗi trả về 93 ');
      }
    } catch (error) {
      console.error('Lỗi:', error);
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await onGetPostById();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    onGetPostById();
  }, []);

  return (
    <View style={styles.T}>
      <ScrollView
        style={styles.body}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Story */}
        <ScrollView
          style={{
            height: 227,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {/* UpStory User */}
          <TouchableOpacity style={styles.upStory_User}>
            <Image
              style={styles.avatar_upstory}
              source={{uri: user.user.avatar}}
            />
            <View style={styles.view_addStory}>
              <Image
                style={styles.add_story}
                source={require('../../../../../assets/add_story.png')}
              />
            </View>
            <Text style={styles.text_addStory}>Tạo tin</Text>
          </TouchableOpacity>
          {/* Story */}
          <View style={[styles.story, {flexDirection: 'row'}]}>
            {dataStory.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.storyItem}
                onPress={() => navigation.navigate('UpStory')}>
                <Image style={styles.storyAvatar} source={item.avatar} />
                <Image style={styles.storyImage} source={item.image} />
                <Text style={styles.storyName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* BaiViet */}
        <View style={styles.postsCss}>
          <Text style={[styles.lineHr, {marginTop: 20, height: 5}]} />
          {posts.length === 0 ? (
            <Text style={styles.noStatus}>
              Không có bài viết nào được đăng !
            </Text>
          ) : (
            <FlatList
              data={posts}
              scrollEnabled={false}
              keyExtractor={item => item._id}
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
                              width: 100 / item.image.length + '%',
                            },
                          ]}
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
              showsVerticalScrollIndicator={false}
              initialNumToRender={5}
              maxToRenderPerBatch={5}
              updateCellsBatchingPeriod={3000}
              removeClippedSubviews={true}
              onEndReachedThreshold={0.5}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
