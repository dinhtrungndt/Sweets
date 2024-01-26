/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

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
  getLengthShare,
  getMedia,
  getPosts,
} from '../../../services/home/homeService';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState([]);
  const [share, setShare] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getPosts();
      const data = response;
      const idPosts = posts.map(item => item._id);
      setPosts(data);
      // console.log('>>>>>>>>>>>>>>>>> 29999999 Posts Console', data);

      const media = await getMedia(idPosts);
      setMedia(media);
      // console.log('>>>>>>>>>>>>>>>>> 344444444 Media Console', media);

      const share = await getLengthShare(idPosts);
      setShare(share);
      console.log('>>>>>>>>>>>>>>>>> 3888888 Share Console', share);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  console.log('>>>>>>>>>>>>>>>>> 72 Share Console', share);

  return (
    <View style={styles.T}>
      <HeaderScreen />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <StoryScreen />
        <PostsScreen posts={posts} media={media} share={share} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
