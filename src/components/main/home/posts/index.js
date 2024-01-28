/* eslint-disable prettier/prettier */
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

// styles
import {styles} from '../styles/posts';

// library
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import CustomReaction from '../../../customs/reaction/customreaction';

const PostsScreen = ({posts, navigation}) => {
  const [showMore, setShowMore] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [reaction, setReaction] = useState(false);

  const reactions = [
    {
      id: 0,
      emoji: '👍',
      name: 'Like',
    },
    {
      id: 1,
      emoji: '😍',
      name: 'Love',
    },
    {
      id: 2,
      emoji: '😂',
      name: 'Haha',
    },
    {
      id: 3,
      emoji: '😮',
      name: 'Wow',
    },
    {
      id: 4,
      emoji: '😡',
      name: 'Angry',
    },
  ];

  const handleReaction = useRef(null);

  const changeIdObject = idObject => {
    if (idObject.name === 'Công khai') {
      return (
        <Fontisto
          name="world-o"
          size={12}
          color="#666666"
          style={{paddingLeft: 5}}
        />
      );
    } else if (idObject.name === 'Bạn bè') {
      return (
        <FontAwesome5
          name="user-friends"
          size={12}
          color="#666666"
          style={{paddingLeft: 5}}
        />
      );
    } else if (idObject.name === 'Chỉ mình tôi') {
      return (
        <FontAwesome5
          name="lock"
          size={12}
          color="#666666"
          style={{paddingLeft: 5}}
        />
      );
    } else {
      return <Text style={styles.text_object}>{idObject.name}</Text>;
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const formatTime = createdAt => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInSeconds = currentTime.diff(postTime, 'seconds');

    if (diffInSeconds < 1) {
      return 'Vừa đăng';
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 24 * 3600) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else if (diffInSeconds < 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (24 * 3600))} ngày trước`;
    } else if (diffInSeconds < 12 * 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (30 * 24 * 3600))} tháng trước`;
    } else {
      return `${Math.floor(diffInSeconds / (12 * 30 * 24 * 3600))} năm trước`;
    }
  };

  const getFeelingIcon = type => {
    switch (type) {
      case 'Like':
        return require('../../../../assets/icon_like_feeling.png');
      case 'Love':
        return require('../../../../assets/love_25px.png');
      case 'Haha':
        return require('../../../../assets/haha_25px.png');
      case 'Wow':
        return require('../../../../assets/wow_25px.png');
      default:
        return require('../../../../assets/icon_like_feeling.png');
    }
  };

  const backgroundColor = type => {
    switch (type) {
      case 'Like':
        return '#22b6c0';
      case 'Love':
        return '#f02849';
      case 'Haha':
        return '#f7cb1c';
      case 'Wow':
        return '#f7cb1c';
      default:
        return '#22b6c0';
    }
  };

  useEffect(() => {
    handleReaction.current = {
      handlePressOut: () => {
        setReaction(false);
        console.log('press out');
      },
      handleLongPress: () => {
        setReaction(true);
        console.log('long press');
      },
    };

    return () => {
      handleReaction.current = null;
    };
  }, []);

  return (
    <View style={styles.T}>
      <FlatList
        data={posts}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View>
            {/* header */}
            <View style={styles.container_avatar_name}>
              <View style={styles.avatar_name}>
                <TouchableOpacity>
                  <Image
                    source={{uri: item.idUsers?.avatar}}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity>
                    <Text style={styles.name}>{item.idUsers?.name}</Text>
                  </TouchableOpacity>
                  <View style={styles.container_object}>
                    <Text style={styles.time}>{formatTime(item.createAt)}</Text>
                    <Text style={{paddingLeft: 5, fontSize: 6}}>●</Text>
                    <TouchableOpacity>
                      {item.idObject ? changeIdObject(item.idObject) : null}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-horizontal"
                  size={18}
                  color="#666666"
                />
              </TouchableOpacity>
            </View>
            {/* content */}
            <View style={styles.baiVietContent}>
              {showMore ? (
                <Text style={styles.content}>{item.content}</Text>
              ) : (
                <Text style={styles.content}>
                  {item.content?.slice(0, 100)}
                </Text>
              )}
              {/* Toggle button */}
              {item.content && item.content.length > 100 && (
                <TouchableOpacity
                  style={styles.showMore}
                  onPress={handleShowMore}>
                  <Text style={{color: 'blue'}}>
                    {showMore ? 'Ẩn' : 'Xem thêm'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* media */}
            {item.media.length > 0 ? (
              <View style={styles.container_media}>
                <Swiper
                  style={styles.swiper}
                  showsButtons={false}
                  loop={false}
                  paginationStyle={{bottom: 10}}
                  activeDotColor="#22b6c0"
                  onIndexChanged={index => setActiveSlide(index)}>
                  {item.media?.map((media, index) => (
                    <View key={media._id}>
                      {media.type === 'image' ? (
                        <Image source={{uri: media.url}} style={styles.posts} />
                      ) : (
                        <Video
                          source={{uri: media.url}}
                          style={styles.posts}
                          resizeMode="cover"
                          paused={activeSlide !== index}
                          repeat={true}
                        />
                      )}
                      <View style={styles.imageCountContainer}>
                        <Text style={styles.imageCountText}>
                          {index + 1}/{item.media.length}
                        </Text>
                      </View>
                    </View>
                  ))}
                </Swiper>
              </View>
            ) : (
              <View style={{height: 0}} />
            )}

            {/* feeling */}
            {item.reaction.length > 0 ||
            item.comment.length > 0 ||
            item.share.length > 0 ? (
              <View style={styles.container_feeling_commnet_share}>
                {/* feeling */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CommentsScreen', {postId: item})
                  }
                  style={styles.container_feeling}>
                  {item.reaction.map((reaction, index) => (
                    <View
                      key={reaction._id}
                      style={[
                        styles.feeling,
                        {
                          marginLeft: index === 0,
                          backgroundColor: backgroundColor(reaction.type),
                        },
                      ]}>
                      <Image
                        style={styles.icon_Like_Feeling}
                        source={getFeelingIcon(reaction.type)}
                      />
                    </View>
                  ))}
                  {item.reaction.length > 0 ? (
                    <Text style={styles.text_feeling}>
                      {item.reaction.length}
                    </Text>
                  ) : (
                    <View style={{height: 0}} />
                  )}
                </TouchableOpacity>
                {/* comment vs share */}
                <View style={styles.comment_share}>
                  {/* comment */}
                  {item.comment.length > 0 ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CommentsScreen', {postId: item})
                      }
                      style={styles.container_comment}>
                      <Text style={styles.text_comment}>
                        {item.comment.length}
                      </Text>
                      <Text style={[styles.text_comment, {paddingLeft: 5}]}>
                        Bình luận
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{height: 0}} />
                  )}
                  {/* share */}
                  {item.share.length > 0 ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CommentsScreen', {postId: item})
                      }
                      style={styles.container_share}>
                      <Text style={styles.text_share}>{item.share.length}</Text>
                      <Text style={[styles.text_share, {paddingLeft: 5}]}>
                        Chia sẻ
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{height: 0}} />
                  )}
                </View>
              </View>
            ) : (
              <View style={{height: 0}} />
            )}

            {/* line */}
            <Text style={styles.linePosts} />
            {/* like comment share 2 */}
            <View style={styles.container_like_comment_share}>
              {/* like */}
              <TouchableOpacity
                style={styles.like_post}
                onPress={() => handleReaction.current.handlePressOut()}
                onLongPress={() => handleReaction.current.handleLongPress()}>
                <AntDesign
                  name={reaction ? 'like1' : 'like2'}
                  size={20}
                  color={reaction ? '#22b6c0' : '#666666'}
                />
                <Text
                  style={[
                    styles.text_like_post,
                    {color: reaction ? '#22b6c0' : '#666666'},
                  ]}>
                  Thích
                </Text>
              </TouchableOpacity>
              {reaction && (
                <View style={styles.container_reaction}>
                  <CustomReaction
                    reactions={reactions}
                    clone={handleReaction.current.handlePressOut}
                  />
                </View>
              )}

              {/* comment */}
              <TouchableOpacity
                style={styles.like_post}
                onPress={() =>
                  navigation.navigate('CommentsScreen', {postId: item})
                }>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={20}
                  color="#666666"
                />
                <Text style={styles.text_like_post}>Bình luận</Text>
              </TouchableOpacity>
              {/* share */}
              <TouchableOpacity style={styles.like_post}>
                <MaterialCommunityIcons
                  name="share-outline"
                  size={23}
                  color="#666"
                />
                <Text style={styles.text_like_post}>Chia sẻ</Text>
              </TouchableOpacity>
            </View>
            {/* line */}
            <Text style={styles.linePostsEnd} />
          </View>
        )}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={3000}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default PostsScreen;
