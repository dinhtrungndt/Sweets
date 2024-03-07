/* eslint-disable prettier/prettier */
import {
  Dimensions,
  FlatList,
  Image,
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

// Library

const RenderItemStory = ({story, navigation}) => {
  const [seenStory, setSeenStory] = useState(false);

  const handleSeenStory = () => {
    navigation.navigate('PickStory', {story: story});
    setSeenStory(true);
  };

  let name = story.idUsers.name;
  if (name.length > 10) {
    name = name.substring(0, 10 - 3) + '...';
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

  return (
    <View style={styles.T}>
      <View style={styles.container_story_me}>
        {/* story me */}
        <View style={styles.container_me}>
          <TouchableOpacity style={styles.add_me}>
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
            <View style={styles.iconAdd}>
              <Image source={require('../../../../../assets/add_25px.png')} />
            </View>
          </TouchableOpacity>
          <Text style={styles.name_me}>Tin của bạn</Text>
        </View>
        {/* <View style={styles.container_me}>
          <TouchableOpacity style={styles.border_me}>
            <Image
              style={styles.avatar_me}
              source={{
                uri: 'https://res.cloudinary.com/dqo8whkdr/image/upload/v1690714031/cld-sample-3.jpg',
              }}
            />
          </TouchableOpacity>
          <Text style={styles.name_me}>Your Story</Text>
        </View> */}
        <FlatList
          data={story}
          renderItem={({item}) => (
            <RenderItemStory story={item} navigation={navigation} />
          )}
          keyExtractor={story._id}
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
    </View>
  );
};

export default StoryScreen;
