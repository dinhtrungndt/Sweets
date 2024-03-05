/* eslint-disable prettier/prettier */
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';

// styles
import {styles} from '../../styles/comments';

// library
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import VideoPlayer from 'react-native-video-player';
import CustomReaction from '../../../../customs/reaction/customreaction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import FeelingComponent from '../feeling';
import {UserContext} from '../../../../../contexts/user/userContext';

const CommentsScreen = ({navigation, route}) => {
  const {postId, handleLike} = route.params;
  const [posts, setPosts] = useState([postId]);
  const [showMore, setShowMore] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [reaction, setReaction] = useState(false);
  const snapPoints = useMemo(() => ['90%', '60%'], []);
  const bottomSheetRef = useRef(null);
  const {user} = useContext(UserContext);

  // console.log('>>>>>>>>> CommentsScreen postId', postId);

  const handleCloneBottomSheet = () => bottomSheetRef.current?.close();
  const handleOnpenBottomSheet = () => bottomSheetRef.current?.expand();

  const isUserReacted = (reactions, userId) => {
    return reactions.some(reaction => reaction.idUsers._id === userId);
  };

  const reactions = [
    {
      id: 0,
      emoji: '👍',
      name: 'Thích',
    },
    {
      id: 1,
      emoji: '❤️',
      name: 'Yêu thích',
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
      name: 'Tức giận',
    },
  ];

  const handleReaction = useRef(null);

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

  const getFeelingIcon = type => {
    switch (type) {
      case 'Thích':
        return require('../../../../../assets/icon_like_feeling.png');
      case 'Yêu thích':
        return require('../../../../../assets/love_25px.png');
      case 'Haha':
        return require('../../../../../assets/haha_25px.png');
      case 'Wow':
        return require('../../../../../assets/wow_25px.png');
      case 'Tức giận':
        return require('../../../../../assets/angry_25px.png');
      default:
        return require('../../../../../assets/icon_like_feeling.png');
    }
  };

  const ColorTextLikePost = type => {
    switch (type) {
      case 'Thích':
        return '#22b6c0';
      case 'Yêu thích':
        return '#ff0000';
      case 'Haha':
        return '#ff9900';
      case 'Wow':
        return '#ff00ff';
      case 'Tức giận':
        return '#ff0000';
      default:
        return '#000000';
    }
  };

  const getUniqueReactions = reactions => {
    const uniqueReactions = [];
    const reactionTypeSet = new Set();

    reactions.forEach(reaction => {
      if (!reactionTypeSet.has(reaction.type)) {
        uniqueReactions.push(reaction);
        reactionTypeSet.add(reaction.type);
      }
    });

    return uniqueReactions;
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
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.T}>
        {/* header */}
        <View style={styles.header}>
          {/* thông tin header */}
          <View style={styles.baiVietHeader}>
            <>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.icon_backTO}>
                <Ionicons name="arrow-back" size={23} color="#666" />
              </TouchableOpacity>
              {posts.map(post => (
                <View key={post._id} style={styles.baiVietHeaderLeft}>
                  <Image
                    style={styles.baiVietAvatar}
                    source={{uri: post.idUsers?.avatar}}
                  />
                  <View style={styles.baiVietNameTime}>
                    <Text style={styles.baiVietName}>{post.idUsers?.name}</Text>
                    <View style={styles.container_time}>
                      <Text style={styles.baiVietTime}>
                        {formatTime(post.createAt)}
                      </Text>
                      <Text style={{paddingLeft: 5, fontSize: 6}}>●</Text>
                      <TouchableOpacity>
                        {post.idObject ? changeIdObject(post.idObject) : null}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </>
            <TouchableOpacity
              onPress={() => navigation.navigate('BottomSheetLayout', {postId})}
              style={styles.baiVietHeaderRight}>
              <Feather name="more-horizontal" size={23} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
        {/* body */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          {posts.map(item => (
            <View key={item._id}>
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
                          <Image
                            source={{uri: media.url}}
                            style={styles.posts}
                          />
                        ) : (
                          <VideoPlayer
                            video={{uri: media.url}}
                            videoWidth={1600}
                            videoHeight={900}
                            thumbnail={{uri: media.url}}
                            // autoplay={true}
                            style={styles.posts}
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

              {/* line */}
              <Text style={styles.linePosts} />
              {/* like comment share 2 */}
              <View style={styles.container_like_comment_share}>
                {/* like */}
                <TouchableOpacity
                  style={styles.like_post}
                  onPress={() => handleLike(item._id)}
                  onLongPress={() => handleReaction.current.handleLongPress()}>
                  {isUserReacted(item.reaction, user.user._id) ? (
                    <>
                      {item.reaction
                        .filter(
                          reaction => reaction.idUsers._id === user.user._id,
                        )
                        .map(reaction => (
                          <Image
                            key={reaction.type}
                            source={getFeelingIcon(reaction.type)}
                            style={styles.feelingIcon}
                          />
                        ))}
                      <Text
                        style={[
                          styles.text_like_post,
                          {
                            color: ColorTextLikePost(
                              item.reaction.find(
                                reaction =>
                                  reaction.idUsers._id === user.user._id,
                              ).type,
                            ),
                          },
                        ]}>
                        {item.reaction
                          .filter(
                            reaction => reaction.idUsers._id === user.user._id,
                          )
                          .map(reaction => reaction.type)}
                      </Text>
                    </>
                  ) : (
                    <>
                      <AntDesign name="like2" size={20} color="#666666" />
                      <Text style={[styles.text_like_post, {color: '#666666'}]}>
                        Thích
                      </Text>
                    </>
                  )}
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
              <Text style={styles.linePostsEnd} />

              {/* feeling */}
              {item.reaction.length > 0 ? (
                <View style={styles.container_feeling_commnet_share}>
                  {/* feeling */}
                  <TouchableOpacity
                    onPress={handleOnpenBottomSheet}
                    style={styles.container_feeling}>
                    {getUniqueReactions(item.reaction).map(
                      (reaction, index) => (
                        <View
                          key={index}
                          style={[
                            styles.feeling,
                            {
                              marginLeft: index === 0,
                            },
                          ]}>
                          <Image
                            style={[
                              reaction.type === 'Haha' ||
                              reaction.type === 'Wow'
                                ? {width: 25, height: 25}
                                : styles.icon_Like_Feeling,
                              ,
                            ]}
                            source={getFeelingIcon(reaction.type)}
                          />
                        </View>
                      ),
                    )}
                    {item.reaction.length > 0 && (
                      <>
                        {item.reaction.map(item => item.idUsers._id).join() ===
                        user.user._id ? (
                          <Text style={styles.text_peopleLike}>Bạn</Text>
                        ) : item.reaction
                            .map(item => item.idUsers._id)
                            .join() === user.user._id ||
                          item.reaction.length > 2 ? (
                          <Text style={styles.text_peopleLike}>
                            Bạn,{' '}
                            {item.reaction
                              .filter(
                                reaction =>
                                  reaction.idUsers._id !== user.user._id &&
                                  item.reaction.slice(0, 1),
                              )
                              .map(reaction => reaction.idUsers.name)
                              .join(', ')}{' '}
                            và những người khác
                          </Text>
                        ) : item.reaction
                            .map(item => item.idUsers._id)
                            .join() !== user.user._id ? (
                          <Text style={styles.text_peopleLike}>
                            {item.reaction
                              .map(item => item.idUsers.name)
                              .join(', ')}
                          </Text>
                        ) : item.reaction
                            .map(item => item.idUsers._id)
                            .join() !== user.user._id ||
                          item.reaction.length > 2 ? (
                          <Text style={styles.text_peopleLike}>
                            {item.reaction
                              .map(item => item.idUsers.name)
                              .join()}{' '}
                            và những người khác
                          </Text>
                        ) : (
                          <Text>No</Text>
                        )}
                      </>
                    )}
                  </TouchableOpacity>
                  {/* line */}
                  <Text style={styles.linePostsEnd} />
                </View>
              ) : (
                <View style={{height: 0}} />
              )}
              {/* share */}
              <View style={styles.comment_share}>
                {/* share */}
                {item.share.length > 0 ? (
                  <TouchableOpacity style={styles.container_share}>
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
          ))}

          <TouchableOpacity style={styles.container_phuhop}>
            <Text style={styles.text_phuhop}>Phù hợp nhất</Text>
            <Icon name="chevron-down" size={12} color="#666666" />
          </TouchableOpacity>

          {/* comment */}
          <View style={styles.comment}>
            {postId.comment.map((item, index) => {
              if (item.idParent === null) {
                // comment father
                return (
                  <View style={styles.container_comment} key={index}>
                    {/* Bình luận cha */}
                    <View style={styles.container_comment_header}>
                      <Image
                        style={styles.avatar_comment}
                        source={{uri: item.idUsers?.avatar}}
                      />
                      <View style={styles.container_comment_content}>
                        <View style={styles.comment_content}>
                          <Text style={styles.name_comment}>
                            {item.idUsers?.name}
                          </Text>
                          <Text style={styles.content_comment}>
                            {item.content}
                          </Text>
                        </View>
                        <View style={styles.comment_time_like}>
                          <Text style={styles.time_comment}>
                            {' '}
                            {formatTime(item.createAt)}
                          </Text>
                          <TouchableOpacity style={styles.like_like_comment}>
                            <Text style={styles.like_like_comment}> Thích</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.like_like_comment}>
                            <Text style={styles.like_like_comment}>
                              {' '}
                              Phản hồi
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    {/* {console.log(
                      '>>>>>>>>>>>>>>>>Bình luận con user name',
                      postId.comment.filter(
                        subItem =>
                          subItem.idParent && subItem.idParent._id === item._id,
                      ),
                    )} */}
                    {/* Bình luận con */}
                    <View
                      style={{
                        borderLeftWidth: 2,
                        borderColor: '#ccc',
                        marginLeft: 18,
                      }}>
                      {postId.comment
                        .filter(
                          subItem =>
                            subItem.idParent &&
                            subItem.idParent._id === item._id,
                        )
                        .map((subItem, subIndex) => (
                          <View
                            style={[
                              styles.container_comment_body,
                              styles.childComment,
                            ]}
                            key={subIndex}>
                            <Image
                              style={[
                                styles.avatar_comment,
                                {width: 30, height: 30},
                              ]}
                              source={
                                subItem.idUsers?.avatar === '' ||
                                subItem.idUsers?.avatar === null ||
                                subItem.idUsers?.avatar === undefined ||
                                subItem.idUsers?.avatar === 'default' ||
                                subItem.idUsers?.avatar === 'null'
                                  ? require('../../../../../assets/account.png')
                                  : {uri: subItem.idUsers?.avatar}
                              }
                            />
                            <View style={styles.container_comment_content}>
                              <View style={styles.comment_content}>
                                <Text style={styles.name_comment}>
                                  {subItem.idUsers?.name}
                                </Text>
                                <Text style={styles.content_comment}>
                                  {subItem.content}
                                </Text>
                              </View>
                              <View style={styles.comment_time_like}>
                                <Text style={styles.time_comment}>
                                  {formatTime(subItem.createAt)}
                                </Text>
                                <TouchableOpacity
                                  style={styles.like_like_comment}>
                                  <Text style={styles.like_like_comment}>
                                    Thích
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={styles.like_like_comment}>
                                  <Text style={styles.like_like_comment}>
                                    Phản hồi
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        ))}
                    </View>
                  </View>
                );
              }
              return null;
            })}
          </View>
        </ScrollView>
        {/* Reply Comment */}
        <View style={styles.container_reply_comment}>
          <TouchableOpacity>
            <Image
              style={styles.icon_comment}
              source={require('../../../../../assets/icon_camera_comment.png')}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input_comment}
            placeholder={`Bình luận dưới tên ${postId.idUsers?.name}`}
          />
        </View>
        {/* bottom sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}>
          <FeelingComponent
            reactions={postId.reaction}
            clone={handleCloneBottomSheet}
          />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default CommentsScreen;
