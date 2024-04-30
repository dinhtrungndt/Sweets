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
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../../../../../../helper/Axiosinstance';

const initialLayout = {width: Dimensions.get('window').width};

export default function AllTopTabSearch({navigation, route}) {
  const {searchText, listUserSearch, showListHistorySearch} = route?.params;
  // console.log('>>>>>>>>>>>>> posts', posts);
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatedListUserSearch, setUpdatedListUserSearch] = useState([]);

  const onGetPosts = async () => {
    setIsLoading(true);
    const res = await getPostsAll();
    const postsWithMedia = (
      await Promise.all(
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
      )
    ).filter(
      post =>
        post.content.toLowerCase().includes(searchText.toLowerCase()) ||
        (post.idUsers.name.toLowerCase().includes(searchText.toLowerCase()) &&
          post.idTypePosts.name === 'Bài viết'),
    );
    setPost(postsWithMedia);
    setIsLoading(false);
  };

  const fetchFriendInvitations = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await AxiosInstance().get(
        `/friend/friend-requests-sent/${userId}`,
      );
      const response2 = await AxiosInstance().get(
        `/friend/friend-requests/${userId}`,
      );
      const response3 = await AxiosInstance().get(`/friend/friends/${userId}`);
      // console.log('re',response3)
      if (response.success) {
        // console.log('Kết quả lời mời đã gửi', response.friendRequestsSent);
        const invitations = response.friendRequestsSent; //mảng đã gửi
        const updatedList = listUserSearch.map(user => {
          const isInvited = invitations.some(
            invitation => invitation.idFriendReceiver === user._id,
          );
          return {
            ...user,
            CheckGui: isInvited, // Kiểm tra xem user có trong danh sách lời mời gửi không
            CheckNhan: false, // Ban đầu, chưa có lời mời nào được chấp nhận
            CheckALL: false,
          };
        });
        const invitations2 = response2.friendRequests;
        const updatedList2 = updatedList.map(user => {
          const isInvited = invitations2.some(
            invitation => invitation.idFriendSender === user._id,
          );
          return {
            ...user,

            CheckNhan: isInvited, // Ban đầu, chưa có lời mời nào được chấp nhận
          };
        });

        const invitationsAll = response3.friendsList;
        const updatedListAll = updatedList2.map(user => {
          const isInvited = invitationsAll.some(
            invitation => invitation.id === user._id,
          );
          return {
            ...user,

            CheckALL: isInvited, // Ban đầu, chưa có lời mời nào được chấp nhận
          };
        });
        setUpdatedListUserSearch(updatedListAll);
        // console.log('mảng 3', updatedListAll);
      } else {
        console.log('No friend invitations found.');
      }
    } catch (error) {
      console.error('Error fetching friend invitations:', error);
    }
  };
  // console.log('updatedListUserSearch', updatedListUserSearch);

  useEffect(() => {
    onGetPosts();
    fetchFriendInvitations();
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
        posts={post}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
        updatedListUserSearch={updatedListUserSearch}
        isLoading={isLoading}
        fetchFriendInvitations={fetchFriendInvitations}
      />
    ),
    PostsSearch: () => (
      <PostsSearch
        listUserSearch={listUserSearch}
        posts={post}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
        isLoading={isLoading}
      />
    ),
    PeopleSearch: () => (
      <PeopleSearch
        listUserSearch={listUserSearch}
        posts={post}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
    ReelsSearch: () => (
      <ReelsSearch
        listUserSearch={listUserSearch}
        posts={post}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
    GroupSearch: () => (
      <GroupSearch
        listUserSearch={listUserSearch}
        posts={post}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
    PageSearch: () => (
      <PageSearch
        listUserSearch={listUserSearch}
        posts={post}
        navigation={navigation}
        showListHistorySearch={showListHistorySearch}
      />
    ),
  });

  return (
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
