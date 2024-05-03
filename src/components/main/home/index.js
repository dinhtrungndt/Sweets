/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import {RefreshControl, ScrollView} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import HeaderScreen from '../layout/header';

// styles
import {styles} from './styles/home';

// components
import StoryScreen from './uploads/story';
import PostsScreen from './posts';

// data
import {
  getBackgroundColor,
  getComments,
  getMedia,
  getPosts,
  getPostsBirthday,
  getPostsByUser,
  getReaction,
  getShare,
  getShareDetailObject,
  getSharedPosts,
  likeByPost,
} from '../../../services/home/homeService';
import {UserContext} from '../../../contexts/user/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingScreen} from '../../../utils/loading';

const HomeScreen = props => {
  const {navigation} = props;
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(
  //   '>>>>>>>>>>>>>> posts',
  //   posts.map(item => item.reaction),
  // );

  const onGetPosts = async () => {
    try {
      const res = await getPosts(user.user._id);
      const postsWithMedia = await Promise.all(
        res.map(async post => {
          const mediaResponse = await getMedia(post._id);
          const media = mediaResponse;

          const reactionResponse = await getReaction(post._id);
          const reaction = reactionResponse;

          const commentResponse = await getComments(post._id);
          const comment = commentResponse;

          const shareResponse = await getShareDetailObject(
            post._id,
            user.user._id,
          );
          const share = shareResponse;

          const birthdayResponse = await getPostsBirthday(user.user._id);
          const birthday = birthdayResponse;

          const colorResponse = await getBackgroundColor(post._id);
          const color = colorResponse;

          const likedByCurrentUser = reaction.some(
            reactionItem =>
              reactionItem.idUsers._id === user.id &&
              reactionItem.type === 'Thích',
          );

          // console.log('>>>>>>>>>>>>>>> likedByCurrentUser', likedByCurrentUser);
          return {
            ...post,
            media,
            reaction,
            comment,
            share,
            birthday,
            color,
            isLiked: likedByCurrentUser,
          };
        }),
      );
      setPosts(postsWithMedia);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    await onGetPosts();
    setRefreshing(false);
  }, []);

<<<<<<< HEAD
=======
  const handleLike = async idPosts => {
    try {
      const idUsers = user.id;
      const type = 'Thích';
      const response = await likeByPost(idUsers, idPosts, type);

      if (response.status === 1) {
        const updatedPosts = posts.map(post => {
          if (post._id === idPosts) {
            const updatedReaction = post.reaction.map(reactionItem => {
              if (reactionItem.idUsers._id === user.id) {
                return {...reactionItem, type: 'Thích'};
              }
              return reactionItem;
            });
            return {
              ...post,
              reaction: updatedReaction,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', response.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
  useEffect(() => {
    onGetPosts();
  }, []);

  const filteredPosts = posts.filter(
    post => post.idTypePosts.name === 'Bài viết',
  );
  const filteredStore = posts.filter(post => post.idTypePosts.name === 'Story');

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <ScrollView
        style={styles.T}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
<<<<<<< HEAD
        <ToastManager />
        <HeaderScreen onRefresh={onRefresh} navigation={navigation} />
=======
        <HeaderScreen />
>>>>>>> 16d62ec8c383bb71477951b93e23bb2b41441ebf
        <StoryScreen story={filteredStore} navigation={navigation} />
        <PostsScreen posts={filteredPosts} navigation={navigation} />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
