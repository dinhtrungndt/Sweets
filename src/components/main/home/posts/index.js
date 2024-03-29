/* eslint-disable prettier/prettier */
import {
  FlatList,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

// styles
import {styles} from '../styles/posts';

// library
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import CustomReaction from '../../../customs/reaction/customreaction';
import VideoPlayer from 'react-native-video-player';
import {UserContext} from '../../../../contexts/user/userContext';
import {
  deletePostsAccount,
  likeByPost,
} from '../../../../services/home/homeService';
import ModalEditPostsAccount from './editPosts/account';
import ModalEditPostsGuest from './editPosts/guest';
import Share from 'react-native-share';
import {useLinkTo} from '@react-navigation/native';

const PostsScreen = ({posts, navigation, handleLike}) => {
  const [showMore, setShowMore] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [reaction, setReaction] = useState(false);
  const [modalEditPostsAccount, setModalEditPostsAccount] = useState(false);
  const [modalEditPostsGuest, setModalEditPostsGuest] = useState(false);
  const {user} = useContext(UserContext);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editPostsItemAccount, setEditPostsItemAccount] = useState(null);
  const [editPostsItemGuest, setEditPostsItemGuest] = useState(null);
  const [shareItems, setShareItems] = useState(null);
  const [post, setPost] = useState(posts);

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
      case 'Thích':
        return require('../../../../assets/icon_like_feeling.png');
      case 'Yêu thích':
        return require('../../../../assets/love_25px.png');
      case 'Haha':
        return require('../../../../assets/haha_25px.png');
      case 'Wow':
        return require('../../../../assets/wow_25px.png');
      case 'Tức giận':
        return require('../../../../assets/angry_25px.png');
      default:
        return require('../../../../assets/icon_like_feeling.png');
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
        return '#ff9900';
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

  const handleModalEditPostsAccount = item => {
    setEditPostsItemAccount(item);
    setModalEditPostsAccount(true);
  };

  const handleModalEditPostsGuest = item => {
    setEditPostsItemGuest(item);
    setModalEditPostsGuest(true);
  };

  const handleDeletePosts = async () => {
    try {
      const _idDelete = editPostsItemAccount._id;
      const res = await deletePostsAccount(_idDelete);
      const updatedPosts = posts.filter(post => post._id !== _idDelete);
      setPost(updatedPosts);
      setModalEditPostsAccount(false);
      // console.log('>>>. Xóa thành công', res);
    } catch (error) {
      console.log('>>>. Lỗi delete Posts', error);
    }
  };

  Linking.addEventListener('url', event => {
    const {path} = event;
    if (path.startsWith('/post/')) {
      const postId = path.split('/').pop();
    }
  });

  const createDeepLinkForPost = postId => {
    return `https://sweets-eight.vercel.app/posts/${postId}`;
  };

  const sharePostWithDeepLink = item => {
    const postId = item._id;
    const deepLink = createDeepLinkForPost(postId);
    const message = `${deepLink}`;
    Share.open({
      message: message,
    })
      .then(() => console.log('Chia sẻ thành công'))
      .catch(error => console.log('Lỗi khi chia sẻ:', error));
  };

  Linking.addEventListener('url', event => {
    const {path} = event;
    if (path.startsWith('/post/')) {
      const postId = path.split('/').pop();
    }
  });

  useEffect(() => {
    handleReaction.current = {
      handlePressOut: () => {
        setReaction(false);
      },
      handleLongPress: postId => {
        setReaction(true);
        setSelectedPostId(postId);
      },
    };

    return () => {
      handleReaction.current = null;
    };
  }, []);

  return (
    <View style={styles.T}>
      <FlatList
        data={post}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View>
            {/* header */}
            <View style={styles.container_avatar_name}>
              <View style={styles.avatar_name}>
                {item.idUsers._id !== user.user._id ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('OtherUserA', {
                        account: item,
                      })
                    }>
                    <Image
                      source={{uri: item.idUsers?.avatar}}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Profile', {
                        account: item,
                      })
                    }>
                    <Image
                      source={{uri: item.idUsers?.avatar}}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                )}
                <View>
                  {item.idUsers._id !== user.user._id ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('OtherUserA', {
                          account: item,
                        })
                      }>
                      <Text style={styles.name}>{item.idUsers?.name}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Profile', {
                          account: item,
                        })
                      }>
                      <Text style={styles.name}>{item.idUsers?.name}</Text>
                    </TouchableOpacity>
                  )}
                  <View style={styles.container_object}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CommentsScreen', {postId: item})
                      }>
                      <Text style={styles.time}>
                        {formatTime(item.createAt)}
                      </Text>
                    </TouchableOpacity>
                    <Text style={{paddingLeft: 5, fontSize: 6}}>●</Text>
                    <TouchableOpacity>
                      {item.idObject ? changeIdObject(item.idObject) : null}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {item.idUsers._id !== user.user._id ? (
                <TouchableOpacity
                  onPress={() => handleModalEditPostsGuest(item)}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={18}
                    color="#666666"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleModalEditPostsAccount(item)}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={18}
                    color="#666666"
                  />
                </TouchableOpacity>
              )}
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
                        <>
                          <Image
                            source={{uri: media.url.join()}}
                            style={styles.posts}
                          />
                        </>
                      ) : (
                        <VideoPlayer
                          video={{uri: media.url[0]}}
                          videoWidth={1600}
                          videoHeight={900}
                          thumbnail={{uri: media.url[0]}}
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

            {/* feeling */}
            {item.reaction.length > 0 ||
            item.comment.length > 0 ||
            item.share.length > 0 ? (
              <View style={styles.container_feeling_commnet_share}>
                {/* feeling */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CommentsScreen', {
                      postId: item,
                      handleLike: handleLike,
                    })
                  }
                  style={styles.container_feeling}>
                  {getUniqueReactions(item.reaction).map((reaction, index) => (
                    <View
                      key={index}
                      style={[
                        styles.feeling,
                        {
                          marginLeft: index === 0,
                        },
                      ]}>
                      {index < 2 && (
                        <Image
                          style={[
                            reaction.type === 'Haha' ||
                            reaction.type === 'Wow' ||
                            reaction.type === 'Tức giận'
                              ? {width: 22, height: 22}
                              : styles.icon_Like_Feeling,
                            ,
                          ]}
                          source={getFeelingIcon(reaction.type)}
                        />
                      )}
                    </View>
                  ))}

                  {item.reaction.length <= 2 ? (
                    <Text style={styles.text_feeling}>
                      {item.reaction.length}
                    </Text>
                  ) : (
                    <Text style={styles.text_feeling2}>
                      {item.reaction.length}
                    </Text>
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
                onPress={() => handleLike(item._id)}
                onLongPress={() =>
                  handleReaction.current.handleLongPress(item._id)
                }>
                {console.log(
                  '>>>>>>>>>>>. item.isUserReacted',
                  isUserReacted(item.reaction, user.user._id),
                )}
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

              {selectedPostId === item._id && reaction && (
                <View style={styles.container_reaction}>
                  <CustomReaction
                    reactions={reactions}
                    clone={handleReaction.current.handlePressOut}
                    posts={item}
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
              <TouchableOpacity
                style={styles.like_post}
                onPress={() => sharePostWithDeepLink(item)}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditPostsAccount}
        onRequestClose={() => {}}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          activeOpacity={1}
          onPressOut={() => setModalEditPostsAccount(false)}>
          <ModalEditPostsAccount
            editPostsItemAccount={editPostsItemAccount}
            handleDeletePosts={handleDeletePosts}
            navigation={navigation}
          />
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditPostsGuest}
        onRequestClose={() => {}}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
          activeOpacity={1}
          onPressOut={() => setModalEditPostsGuest(false)}>
          <ModalEditPostsGuest editPostsItemGuest={editPostsItemGuest} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PostsScreen;
