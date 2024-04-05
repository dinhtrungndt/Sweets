import * as React from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import PostsSearch from '../posts';
import AllPostsSearch from '../all';
import PeopleSearch from '../people';
import GroupSearch from '../group';
import PageSearch from '../page';
import ReelsSearch from '../reels';

const initialLayout = {width: Dimensions.get('window').width};

export default function AllTopTabSearch({posts, navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'AllPostsSearch', title: 'Tất cả'},
    {key: 'PostsSearch', title: 'Bài viết'},
    {key: 'PeopleSearch', title: 'Mọi người'},
    {key: 'ReelsSearch', title: 'Reels'},
    {key: 'GroupSearch', title: 'Nhóm'},
    {key: 'PageSearch', title: 'Trang'},
  ]);

  const renderScene = SceneMap({
    AllPostsSearch: () => (
      <AllPostsSearch posts={posts} navigation={navigation} />
    ),
    PostsSearch: () => <PostsSearch posts={posts} navigation={navigation} />,
    PeopleSearch: () => <PeopleSearch posts={posts} navigation={navigation} />,
    ReelsSearch: () => <ReelsSearch posts={posts} navigation={navigation} />,
    GroupSearch: () => <GroupSearch posts={posts} navigation={navigation} />,
    PageSearch: () => <PageSearch posts={posts} navigation={navigation} />,
  });

  return (
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
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
