import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {styles} from '../../styles/search';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import AllTopTabSearch from './allTop';
import {
  getComments,
  getMedia,
  getPostsAll,
  getReaction,
  getShare,
} from '../../../../../services/home/homeService';
import {LoadingScreen} from '../../../../../utils/loading';

const SearchPosts = props => {
  const {navigation} = props;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const onGetPosts = async () => {
    try {
      setIsLoading(true);
      const res = await getPostsAll();
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

          // console.log('>>>>>>>>>>>>>>> likedByCurrentUser', likedByCurrentUser);
          return {
            ...post,
            media,
            reaction,
            comment,
            share,
          };
        }),
      );
      setPosts(postsWithMedia);
      setIsLoading(false);
    } catch (error) {
      console.error('Lỗi lấy tất cả danh sách Search:', error);
    }
  };

  const filteredPostsData = posts.filter(
    post => post.idTypePosts.name === 'Bài viết',
  );

  useEffect(() => {
    const filtered = posts.filter(
      post =>
        post.content.toLowerCase().includes(searchText.toLowerCase()) &&
        post.idTypePosts.name === 'Bài viết',
    );
    console.log('Lỗi lấy tất cả danh sách Search:', filtered);
    setFilteredPosts(filtered);
  }, [searchText, posts]);

  const handleSearch = text => {
    setSearchText(text);
  };

  // console.log('Lỗi lấy tất cả danh sách Search:', filteredPosts);

  useEffect(() => {
    onGetPosts();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={30} color={'#000'} />
        </TouchableOpacity>
        <TextInput
          placeholder="Tìm kiếm trên Sweets"
          style={styles.inputSearch}
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>

      {/* body */}
      <View style={styles.body}>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <Text style={styles.text_GanDay}>Gần đây</Text>
          <TouchableOpacity>
            <Text style={styles.text_SeenAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View> */}
        {/* Tabtop */}
      </View>
      <View style={styles.tabtop}>
        <AllTopTabSearch posts={filteredPostsData} navigation={navigation} />
      </View>
    </View>
  );
};

export default SearchPosts;
