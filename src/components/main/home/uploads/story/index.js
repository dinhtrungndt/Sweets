/* eslint-disable prettier/prettier */
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';

// styles
import {styles} from '../../styles/story';

// data
import {storyData} from '../../data/story';
import {UserContext} from '../../../../../contexts/user/userContext';
import moment from 'moment';
import SelectFeeingStory from './selectFeelingStory';

const RenderItemStory = ({story, navigation, currentUserID}) => {
  const [seenStory, setSeenStory] = useState(false);

  // console.log('>>>>>>>>>>>> story userzzzzzzzzz', story);
  const hashStoryFM = story.flatMap(item => item.idUsers);

  // console.log('>> --------- hash: ' + hashStoryFM.map(item => item.name)[0]);

  const handleSeenStory = () => {
    navigation.navigate('PickStory', {story: story});
    setSeenStory(true);
  };

  let name = hashStoryFM.map(item => item.name)[0];
  if (name.length > 10) {
    name = name.substring(0, 10 - 3) + '...';
  }

  if (hashStoryFM.map(item => item._id)[0] === currentUserID) {
    return null;
  }

  return (
    <View style={styles.container_story}>
      <TouchableOpacity
        style={seenStory ? styles.border_story_seen : styles.border_story}
        onPress={handleSeenStory}>
        <Image
          style={styles.avatar_story}
          source={{uri: hashStoryFM.map(item => item.avatar)[0]}}
        />
      </TouchableOpacity>
      <Text style={styles.name_story}>{name}</Text>
    </View>
  );
};

const StoryScreen = ({navigation, story}) => {
  const {user} = useContext(UserContext);
  const [seenStory, setSeenStory] = useState(false);
  const [modelSelectFeeingStory, setModelSelectFeeingStory] = useState(false);

  const userStories = story.filter(
    story => story.idUsers._id === user.user._id,
  );
  const showStoryMe = userStories.length > 0;

  const handleSeenStory = selectedStory => {
    navigation.navigate('PickStory', {story: selectedStory});
    setSeenStory(true);
  };

  const filterStories = stories => {
    const currentTimestamp = moment();
    return stories.filter(story => {
      const storyTimestamp = moment(story.createAt);
      const hoursDiff = currentTimestamp.diff(storyTimestamp, 'hours');
      return hoursDiff < 24;
    });
  };

  const filteredStories = filterStories(story);

  // console.log('>>>>>>>>>>>> filteredStories', filteredStories);

  const userStoriesMap = {};
  filteredStories.forEach(story => {
    const userId = story.idUsers._id;
    if (!userStoriesMap[userId]) {
      userStoriesMap[userId] = [story];
    } else {
      userStoriesMap[userId].push(story);
    }
  });

  const groupedStories = Object.values(userStoriesMap);

  // console.log('>>>>>>>>-------------', groupedStories);

  const isMyStoryExpired = userStories.every(story => {
    const currentTimestamp = moment();
    const storyTimestamp = moment(story.createAt);
    const hoursDiff = currentTimestamp.diff(storyTimestamp, 'hours');
    return hoursDiff >= 24;
  });

  return (
    <View style={styles.T}>
      <View style={styles.container_story_me}>
        {/* story me */}
        <View style={styles.container_me}>
          <TouchableOpacity
            onPress={
              showStoryMe && !isMyStoryExpired
                ? () => handleSeenStory(userStories)
                : () => setModelSelectFeeingStory(true)
            }
            style={
              showStoryMe && !isMyStoryExpired
                ? seenStory
                  ? styles.border_story_seen
                  : styles.border_story
                : styles.add_me
            }>
            <View style={styles.border_me}>
              {user.user.avatar ? (
                <Image
                  style={styles.avatar_me}
                  source={{
                    uri: user.user.avatar,
                  }}
                />
              ) : (
                <Image
                  style={styles.avatar_me}
                  source={{
                    uri: 'https://res.cloudinary.com/dqo8whkdr/image/upload/v1690714031/cld-sample-3.jpg',
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconAdd}
            onPress={() => setModelSelectFeeingStory(true)}>
            <Image source={require('../../../../../assets/add_25px.png')} />
          </TouchableOpacity>
          <Text style={styles.name_me}>Tin của bạn</Text>
        </View>

        {/* list story of friends */}
        <FlatList
          data={groupedStories}
          renderItem={({item, index}) => (
            <RenderItemStory
              story={item}
              navigation={navigation}
              currentUserID={user.user._id}
              key={index.toString()}
            />
          )}
          showsVerticalScrollIndicator={false}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          updateCellsBatchingPeriod={3000}
          removeClippedSubviews={true}
          onEndReachedThreshold={0.5}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* line */}
      <Text style={styles.line} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modelSelectFeeingStory}
        onRequestClose={() => {}}>
        <SelectFeeingStory
          navigation={navigation}
          cancel={() => setModelSelectFeeingStory(false)}
        />
      </Modal>
    </View>
  );
};

export default StoryScreen;
