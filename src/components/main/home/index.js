/* eslint-disable prettier/prettier */

import {RefreshControl, ScrollView, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import HeaderScreen from '../layout/header';

// styles
import {styles} from './styles/home';

// components
import StoryScreen from './story';
import PostsScreen from './posts';

// data
import {
  getComments,
  getMedia,
  getPosts,
  getReaction,
  getShare,
} from '../../../services/home/homeService';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onGetPosts = async () => {
    try {
      const res = await getPosts();
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

          return {...post, media, reaction, comment, share};
        }),
      );
      setPosts(postsWithMedia);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  console.log('posts', posts);

  return (
    <ScrollView
      style={styles.T}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <HeaderScreen />
      <StoryScreen />
      <PostsScreen posts={posts} />
    </ScrollView>
  );
};

export default HomeScreen;
