/* eslint-disable prettier/prettier */

import {RefreshControl, ScrollView} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
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
  likeByPost,
} from '../../../services/home/homeService';
import {UserContext} from '../../../contexts/user/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = props => {
  const {navigation} = props;
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {user} = useContext(UserContext);

  // console.log(
  //   '>>>>>>>>>>>>>> posts',
  //   posts.map(item => item.reaction),
  // );

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
    await onGetPosts();
    setRefreshing(false);
  }, []);

  const handleLike = async idPosts => {
    try {
      const idUsers = user.id;
      const response = await likeByPost(idUsers, idPosts);
      if (response.status === 1) {
        const updatedPosts = posts.map(post => {
          if (post._id === idPosts) {
            return {
              ...post,
              type: response.idPosts.likedBy,
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

  useEffect(() => {
    onGetPosts();
  }, []);

  // Lọc bài viết theo typePosts
  const filteredPosts = posts.filter(
    post => post.idTypePosts.name === 'Bài viết',
  );
  const filteredStore = posts.filter(post => post.idTypePosts.name === 'Story');

  return (
    <ScrollView
      style={styles.T}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <HeaderScreen />
      <StoryScreen story={filteredStore} navigation={navigation} />
      <PostsScreen
        posts={filteredPosts}
        navigation={navigation}
        handleLike={handleLike}
      />
    </ScrollView>
  );
};

export default HomeScreen;
