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
import {useState} from 'react';

const initialLayout = {width: Dimensions.get('window').width};

export default function AllTopTabSearch({navigation, route}) {
  const {searchText, listUserSearch, posts} = route?.params;
  // console.log('>>>>>>>>>>>>> searchText', searchText);
  // console.log('>>>>>>>>>>>>> listUserSearch', listUserSearch);

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
        posts={posts}
        navigation={navigation}
      />
    ),
    PostsSearch: () => <PostsSearch posts={posts} navigation={navigation} />,
    PeopleSearch: () => (
      <PeopleSearch listUserSearch={listUserSearch} navigation={navigation} />
    ),
    ReelsSearch: () => <ReelsSearch posts={posts} navigation={navigation} />,
    GroupSearch: () => <GroupSearch posts={posts} navigation={navigation} />,
    PageSearch: () => <PageSearch posts={posts} navigation={navigation} />,
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
