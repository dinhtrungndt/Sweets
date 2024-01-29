/* eslint-disable prettier/prettier */
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';

// styles
import {styles} from '../styles/story';

// data
import {storyData} from '../data/story';

// Library
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../../../../contexts/user/userContext';

const RenderItemStory = ({item}) => {
  const [seenStory, setSeenStory] = useState(false);
  const handleSeenStory = () => {
    setSeenStory(true);
  };

  let name = item.name;
  if (name.length > 10) {
    name = name.substring(0, 10 - 3) + '...';
  }

  return (
    <View style={styles.container_story}>
      <TouchableOpacity
        style={seenStory ? styles.border_story_seen : styles.border_story}
        onPress={handleSeenStory}>
        <Image style={styles.avatar_story} source={item.avatar} />
      </TouchableOpacity>
      <Text style={styles.name_story}>{name}</Text>
    </View>
  );
};

const StoryScreen = () => {
  const {user} = useContext(UserContext);

  console.log('>>>>>>>>> ----------- ', user.user.avatar);

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
              <Image source={require('../../../../assets/add_25px.png')} />
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
          data={storyData}
          renderItem={({item}) => <RenderItemStory item={item} />}
          keyExtractor={item => item.id}
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
