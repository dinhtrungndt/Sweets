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

  const handleSeenStory = () => {
    navigation.navigate('PickStory', {story: story});
    setSeenStory(true);
  };

  let name = story.idUsers.name;
  if (name.length > 10) {
    name = name.substring(0, 10 - 3) + '...';
  }

  if (story.idUsers._id === currentUserID) {
    return null;
  }

  return (
    <View style={styles.container_story}>
      <TouchableOpacity
        style={seenStory ? styles.border_story_seen : styles.border_story}
        onPress={handleSeenStory}>
        <Image
          style={styles.avatar_story}
          source={{uri: story.idUsers.avatar}}
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
            {(showStoryMe && !isMyStoryExpired) ||
              (!seenStory && (
                <View style={styles.iconAdd}>
                  <Image
                    source={require('../../../../../assets/add_25px.png')}
                  />
                </View>
              ))}
          </TouchableOpacity>
          <Text style={styles.name_me}>Tin của bạn</Text>
        </View>

        <FlatList
          data={filteredStories}
          renderItem={({item}) => (
            <RenderItemStory
              story={item}
              navigation={navigation}
              currentUserID={user.user._id}
            />
          )}
          keyExtractor={item => item._id}
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
