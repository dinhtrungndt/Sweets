/* eslint-disable prettier/prettier */
import {ScrollView, View} from 'react-native';
import React from 'react';
import HeaderScreen from '../layout/header';

// styles
import {styles} from './styles/home';

// components
import StoryScreen from './story';
import PostsScreen from './posts';

const HomeScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.T}>
      <HeaderScreen />
      <StoryScreen />
      <PostsScreen />
    </ScrollView>
  );
};

export default HomeScreen;
