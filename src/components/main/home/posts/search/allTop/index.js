import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import PostsSearch from '../posts';
import AllPostsSearch from '../all';
import PeopleSearch from '../people';
import GroupSearch from '../group';
import PageSearch from '../page';
import ReelsSearch from '../reels';
import {TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import {
  getComments,
  getMedia,
  getPostsAll,
  getReaction,
  getShare,
} from '../../../../../../services/home/homeService';
import {LoadingScreen} from '../../../../../../utils/loading';

const initialLayout = {width: Dimensions.get('window').width};

export default function AllTopTabSearch({navigation, route}) {
  const {searchText, listUserSearch, posts, showListHistorySearch} =
    route?.params;
  // console.log('>>>>>>>>>>>>> posts', posts);
  const [post, setPost] = useState(posts);
  const [isLoading, setIsLoading] = useState(false);

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
    setPost(postsWithMedia);
    setIsLoading(false);
  };

  const filteredPostsData = post.filter(
    post =>
      post.content.toLowerCase().includes(searchText.toLowerCase()) ||
      post.idUsers.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    onGetPosts();
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'AllPostsSearch', title: 'Tất cả'},
    {key: 'PostsSearch', title: 'Bài viết'},
    {key: 'PeopleSearch', title: 'Mọi người'},
    {key: 'ReelsSearch', title: 'Reels'},
    {key: 'GroupSearch', title: 'Nhóm'},
    {key: 'PageSearch', title: 'Trang'},
  ]);

  const renderScene = SceneMap({
    AllPostsSearch: () => (
      <AllPostsSearch
        listUserSearch={listUserSearch}
        posts={filteredPostsData}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
    PostsSearch: () => (
      <PostsSearch
        listUserSearch={listUserSearch}
        posts={filteredPostsData}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
    PeopleSearch: () => (
      <PeopleSearch
        listUserSearch={listUserSearch}
        posts={filteredPostsData}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
    ReelsSearch: () => (
      <ReelsSearch
        listUserSearch={listUserSearch}
        posts={filteredPostsData}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
    GroupSearch: () => (
      <GroupSearch
        listUserSearch={listUserSearch}
        posts={filteredPostsData}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
    PageSearch: () => (
      <PageSearch
        listUserSearch={listUserSearch}
        posts={filteredPostsData}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
  });

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <TouchableOpacity
        style={styles.inputSearch}
        onPress={() => navigation.goBack()}>
        <Text style={styles.textSearch}>{searchText}</Text>
      </TouchableOpacity>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={{
              backgroundColor: '#22b6c0',
              width: '12%',
              marginLeft: 12,
            }}
            style={{backgroundColor: 'white'}}
            activeColor="#22b6c0"
            inactiveColor="grey"
            tabStyle={{width: 90, height: 40}}
            renderLabel={({route, focused, color}) => (
              <Text style={{color, fontSize: 13}}>{route.title}</Text>
            )}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  inputSearch: {
    margin: 16,
    backgroundColor: '#ebebeb',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 10,
  },
  textSearch: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
