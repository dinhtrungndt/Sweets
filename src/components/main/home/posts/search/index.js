import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';

import {styles} from '../../styles/search';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import AllTopTabSearch from './allTop';
import {
  addHistorySearch,
  getComments,
  getHistorySearch,
  getListUser,
  getMedia,
  getPostsAll,
  getReaction,
  getShare,
} from '../../../../../services/home/homeService';
import {LoadingScreen} from '../../../../../utils/loading';
import {Image} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {UserContext} from '../../../../../contexts/user/userContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchPosts = props => {
  const {navigation} = props;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showListUserSearch, setShowListUserSearch] = useState(false);
  const [showListHistorySearch, setShowListHistorySearch] = useState(null);
  const [listUserSearch, setListUserSearch] = useState([]);
  const {user} = useContext(UserContext);

  const onGetPosts = async () => {
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
  };

  const onPostHistorySearch = async () => {
    const idUsers = user.user._id;
    const res = await addHistorySearch(idUsers, searchText);
    // console.log('>>>>>>>>>>>>>>> onPostHistorySearch', res);
    setShowListHistorySearch(res);
    setListUserSearch(res.slice(0, 5));
  };

  const onGetHistorySearch = async () => {
    const idUsers = user.user._id;
    const res = await getHistorySearch(idUsers);
    // console.log('>>>>>>>>>>>>>>> onGetHistorySearch', res);
    // hiển thị tối đa 5 người dùng
    setShowListHistorySearch(res.slice(0, 5));
  };

  const filteredPostsData = posts.filter(
    post =>
      post.content.toLowerCase().includes(searchText.toLowerCase()) ||
      post.idUsers.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSearch = async text => {
    setSearchText(text);
    if (text !== '') {
      await onPostHistorySearch();
      await onGetHistorySearch();
    } else {
      setShowListUserSearch(false);
    }
  };

  useEffect(() => {
    onGetPosts();
    onGetHistorySearch();
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
          onChangeText={text => handleSearch(text)}
          value={searchText}
          onSubmitEditing={() => {
            navigation.navigate('AllTopTabSearch', {
              searchText: searchText,
              listUserSearch: listUserSearch,
              posts: filteredPostsData,
            });
          }}
        />
      </View>

      {/* body */}
      <View style={styles.body}>
        {searchText === '' ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 16,
                paddingBottom: 0,
              }}>
              <Text style={styles.text_GanDay}>Gần đây</Text>
              <TouchableOpacity>
                <Text style={styles.text_SeenAll}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            {showListHistorySearch && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={[styles.showListHistorySearch]}>
                {showListHistorySearch.map((history, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.showHistory_Text}
                    onPress={() => {
                      setSearchText(history.name);
                      navigation.navigate('AllTopTabSearch', {
                        searchText: history.name,
                        listUserSearch: listUserSearch,
                        posts: filteredPostsData,
                      });
                    }}>
                    <MaterialCommunityIcons
                      name="history"
                      size={25}
                      color={'#9c9c9c'}
                    />
                    <Text style={[styles.textContent, {paddingLeft: 15}]}>
                      {history.searchText}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        ) : (
          <>
            {listUserSearch !== undefined ? (
              <>
                {listUserSearch.map((user, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.itemContent, {padding: 16}]}
                    onPress={() => {
                      navigation.navigate('OtherUserA', {accountzzz: user});
                    }}>
                    <Image
                      source={{uri: user.avatar}}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 50 / 2,
                        marginRight: 10,
                      }}
                    />
                    <View>
                      <Text style={styles.textContent}>{user.name}</Text>
                      <View style={styles.container_object}>
                        <Text style={styles.lengthChung}>2 bạn chung</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AllTopTabSearch', {
                      searchText: searchText,
                      listUserSearch: listUserSearch,
                      posts: filteredPostsData,
                    });
                  }}>
                  <Text style={styles.textFooter}>Hiển thị thêm {'->'}</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.textContent}>Không có kết quả tìm kiếm</Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default SearchPosts;
