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
  likeByPost,
} from '../../../services/home/homeService';
import {UserContext} from '../../../contexts/user/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingScreen} from '../../../utils/loading';
import ToastManager from 'toastify-react-native';

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

          const shareResponse = await getShare(post._id);
          const share = shareResponse;

          const birthdayResponse = await getPostsBirthday(user.user._id);
          const birthday = birthdayResponse;

          const colorResponse = await getBackgroundColor(
            user.user._id,
            post._id,
          );
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
    setIsLoading(true);
    await onGetPosts();
    setIsLoading(false);
  }, []);

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
        <ToastManager />
        <HeaderScreen onRefresh={onRefresh} navigation={navigation} />
        <StoryScreen story={filteredStore} navigation={navigation} />
        <PostsScreen posts={filteredPosts} navigation={navigation} />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
