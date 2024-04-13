/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// styles
import {styles} from '../../styles/comments';

// library
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Swiper from 'react-native-swiper';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import FeelingComponent from '../feeling';
import {UserContext} from '../../../../../contexts/user/userContext';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  ArrangeCommentFriend,
  deleteComments,
  deleteCommentsC,
  deletePostsAccount,
  getComments,
  getListUser,
  getMedia,
  getPosts,
  getPostsDetail,
  getReaction,
  getReactionComments,
  getShare,
  likeByComments,
  likeByPost,
  submitComments,
  submitCommentsC,
  uploadImageStatus,
} from '../../../../../services/home/homeService';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import BottomSheetFit from '../../../../customs/bottomsheet/bottomSheetFit';
import Toast from 'react-native-toast-message';
import Customreaction_Comment from '../../../../customs/reaction/customreaction_comment';
import linking from '../../../../../utils/linking';
import Share from 'react-native-share';
import ModalEditPostsAccount from '../editPosts/account';
import ModalEditPostsGuest from '../editPosts/guest';
import DialogDeletePosts from 'react-native-dialog';

const CommentsScreen = ({navigation, route}) => {
  const {postId} = route.params;
  const [posts, setPosts] = useState([postId]);
  // console.log('>>>>>>>>> postsposts in commnets', postId);
  const [showMore, setShowMore] = useState(false);
  const [showMoreImage, setShowMoreImage] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [reaction, setReaction] = useState(false);
  const snapPoints = useMemo(() => ['90%', '60%'], []);
  const snapPointsFit = useMemo(() => ['35%'], []);
  const bottomSheetRef = useRef(null);
  const initialSnapIndex = -1;
  const bottomSheetRefFit = useRef(null);
  const {user} = useContext(UserContext);
  const [image, setImage] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleFeeling, setModalVisibleFeeling] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCamera, setIsLoadingCamera] = useState(false);
  const commentInputRef = useRef(null);
  const [parentId, setParentId] = useState(null);
  const [imageimageShowMore, setImageImageShowMore] = useState(null);
  const [parentUserName, setParentUserName] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editPostsItemAccount, setEditPostsItemAccount] = useState(null);
  const [modalEditPostsAccount, setModalEditPostsAccount] = useState(false);
  const [editPostsItemGuest, setEditPostsItemGuest] = useState(null);
  const [modalEditPostsGuest, setModalEditPostsGuest] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [searchNameInList, setSearchNameInList] = useState([]);
  const [reactionLiked, setReactionLiked] = useState([]);
  const [visibleDiaLogDelete, setVisibleDiaLogDelete] = useState(false);
  const [idComments, setIdComments] = useState(null);
  const [detailPosts, setDetailPosts] = useState(null);
  const numColumns = 4;

  // console.log('>>>>>>>>> listUser listUser', listUser);
  // console.log('>>>>>>>>> comments comments', comments);

  const handleCloneBottomSheet = () => bottomSheetRef.current?.close();
  const handleOnpenBottomSheet = () => bottomSheetRef.current?.expand();
  const handleOnpenBottomSheetFit = () => bottomSheetRefFit.current?.expand();

  const onGetDetailPosts = async () => {
    try {
      const res = await getPostsDetail(postId._id || postId);
      // console.log('>>>>>>>> handleGetDetailPosts res', res);
      setDetailPosts(res);
    } catch (error) {
      console.log('Lỗi khi lấy danh sách handleGetDetailPosts', error);
    }
  };

  const handleSearch = text => {
    const filteredUsers = listUser.filter(user =>
      user.name.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchNameInList(filteredUsers.slice(0, 5));
  };

  const handleTextChange = text => {
    setCommentContent(text);
    const lastAtPos = text.lastIndexOf('@');
    if (lastAtPos > -1) {
      setShowUserList(true);
      handleSearch(text.substring(lastAtPos + 1));
    } else {
      setShowUserList(false);
    }
  };

  const handleUserSelect = userName => {
    const lastAtPos = commentContent.lastIndexOf('@');
    const newText = commentContent.substring(0, lastAtPos) + `@${userName} `;
    setParentUserName(newText);
    setCommentContent('');
    setShowUserList(false);
    commentInputRef.current.focus();
  };

  const onGetListUser = async () => {
    const res = await getListUser();
    setListUser(res);
    // console.log('>>>>>>>> res', res);
  };

  // const onGetReactionIdComments = async idComments => {
  //   if (!idComments) {
  //     console.log('idComments là undefined, không thể thực hiện truy vấn');
  //     return;
  //   }
  //   try {
  //     const res = await getReactionComments(idComments);
  //     setReactionLiked(res);
  //   } catch (error) {
  //     console.log('Lỗi khi lấy danh sách liked comments', error);
  //   }
  // };

  const handleLikeComments = async idComments => {
    try {
      const idUsers = user.user._id;
      const type = 'Thích';
      const response = await likeByComments(idUsers, idComments, type);
      if (response.status === 1) {
        await reloadComments();
      }
      // console.log('Like comments thành công !', response);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  const showDialogDelete = idComments => {
    setVisibleDiaLogDelete(true);
    setIdComments(idComments);
  };

  const handleCancelDelete = () => {
    setVisibleDiaLogDelete(false);
  };

  const handleDeleteComments = async () => {
    try {
      if (parentId !== null) {
        const res = await deleteCommentsC(user.user._id, idComments);
        setVisibleDiaLogDelete(false);
        await reloadComments();
      } else {
        const res = await deleteComments(idComments);
        setVisibleDiaLogDelete(false);
        await reloadComments();
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  const isUserReacted = (reactions, userId) => {
    return reactions?.some(reaction => reaction.idUsers._id === userId);
  };

  const handleModalEditPostsAccount = item => {
    setEditPostsItemAccount(item);
    setModalEditPostsAccount(true);
  };

  const handleModalEditPostsGuest = item => {
    setEditPostsItemGuest(item);
    setModalEditPostsGuest(true);
  };

  const reloadPosts = async () => {
    try {
      const res = await getPosts(user.user._id);
      const postsWithMedia = await Promise.all(
        res.map(async post => {
          const mediaResponse = await getMedia(post._id);
          const media = mediaResponse;

          const reactionResponse = await getReaction(post._id);
          const reaction = reactionResponse;

          const commentResponse = await getComments(post._id);
          const comment = commentResponse;

          const shareResponse = await getShare(post._id);
          const share = shareResponse;

          return {
            ...post,
            media,
            reaction,
            comment,
            share,
          };
        }),
      );
      setPosts(postsWithMedia);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeletePosts = async () => {
    try {
      const _idDelete = editPostsItemAccount._id;
      const res = await deletePostsAccount(_idDelete);
      navigation.replace('HomeScreen');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Xóa bài viết thành công !',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      // console.log('>>>. Xóa thành công', res);
    } catch (error) {
      console.log('>>>. Lỗi delete Posts', error);
    }
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
      emoji: '😔',
      name: 'Buồn',
    },
    {
      id: 5,
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
      case 'Buồn':
        return require('../../../../../assets/sad_25px.png');
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
        return '#ff9900';
      case 'Buồn':
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

  const takePhoto = useCallback(async response => {
    if (response.didCancel || response.errorCode || response.errorMessage) {
      return;
    }
    if (response.assets && response.assets.length > 0) {
      const selectedImages = response.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
      }));
      setImage(selectedImages);
      const formData = new FormData();

      selectedImages.forEach((image, index) => {
        formData.append('media', image);
      });

      setIsLoadingCamera(true);
      const data = await uploadImageStatus(formData);
      console.log('>>>>>>>>>>>>>>>>>>>> Data 59 data', data);
      setImagePath(data.urls);
      // console.log('>>>>>>>>>>>>>>>>>>>>>>> 62 dataImage', data.urls);
      setIsLoadingCamera(false);
    }
  }, []);

  const openCamera = useCallback(async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };
    await launchCamera(options, takePhoto);
  }, []);

  const openLibrary = useCallback(async () => {
    const options = {
      mediaType: 'mixed',
      quality: 5,
      saveToPhotos: true,
      selectionLimit: 0,
      multiple: true,
    };
    await launchImageLibrary(options, takePhoto);
    setModalVisible(false);
  }, []);

  const reloadComments = async () => {
    try {
      // setIsLoading(true);
      const response = await getComments(postId._id || postId);
      const postComments = await Promise.all(
        response.map(async comment => {
          const reaction = await getReactionComments(comment._id);
          return {...comment, reaction};
        }),
      );
      setComments(postComments.reverse());
      // setIsLoading(false);
    } catch (error) {
      console.error('Lỗi khi tải danh sách bình luận:', error);
    }
  };

  const handleLike = async idPosts => {
    try {
      const idUsers = user.user._id;
      const type = 'Thích';
      const response = await likeByPost(idUsers, idPosts, type);

      if (response.status === 1) {
        const updatedPosts = posts.map(post => {
          if (post._id === idPosts) {
            const updatedReaction = post.reaction.map(reactionItem => {
              if (reactionItem.idUsers._id === user.id) {
                return {...reactionItem, type: 'Thích'};
              }
              return reactionItem;
            });
            return {
              ...post,
              reaction: updatedReaction,
            };
          }
          return post;
        });
        // console.log('postsposts:', updatedPosts);

        setPosts(updatedPosts);
        await reloadPosts();
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', response.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  const submitCommentSend = async () => {
    try {
      if (!commentContent && !imagePath) {
        return Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Bạn chưa nhập nội dung hoặc chọn ảnh/video',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      }

      if (parentId && parentUserName !== null) {
        const response = await submitCommentsC(
          user.user._id,
          postId._id,
          parentId,
          commentContent,
          imagePath,
          parentUserName,
        );
        // console.log('Tải danh sách bình luận con:', response);
      } else {
        const response = await submitComments(
          user.user._id,
          postId._id,
          commentContent,
          imagePath,
          parentUserName,
        );
        // console.log('Tải danh sách bình luận cha:', response);
      }
      setCommentContent('');
      setImagePath(null);
      setImage('');
      setParentUserName(null);
      await reloadComments();
      commentInputRef.current.clear();
    } catch (error) {
      console.error('Lỗi khi gửi comment:', error);
      setIsLoading(false);
    }
  };

  const removeImage = index => {
    const newImages = [...image];
    newImages.splice(index, 1);
    setImage(newImages);
  };

  const handleArrange = async () => {
    try {
      const res = await ArrangeCommentFriend(user.user._id, postId._id);
      setComments(res);
      // console.log('Sắp xếp thành công', res);
    } catch (error) {
      console.log('Lỗi sắp xếp !', error);
    }
  };

  const isImage = url => {
    return /\.(jpeg|jpg|png)$/i.test(url);
  };

  const isVideo = url => {
    return /\.(mp4|avi|mov)$/i.test(url);
  };

  const handleShowMoreImage = image => {
    setImageImageShowMore(image);
    setShowMoreImage(true);
  };

  const handleShowMoreImageList = image => {
    setImageImageShowMore(image);
    setShowMoreImage(true);
  };

  const handleShare = async item => {
    try {
      const deepLink = linking.prefixes[0] + '/' + `posts/${item._id}`;
      const shareOptions = {
        title: 'Share',
        message: 'Chia sẻ bài viết này!',
        url: deepLink,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Lỗi chia sẻ nè:', error);
    }
  };

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

  useEffect(() => {
    reloadComments();
  }, [route.params.postId]);

  useEffect(() => {
    onGetListUser();
    onGetDetailPosts();
  }, []);

  // useEffect(() => {
  //   commentInputRef.current.focus();
  // }, []);

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
              {detailPosts === null ? (
                <>
                  {posts.map(post => (
                    <View key={post._id} style={styles.baiVietHeaderLeft}>
                      <Image
                        style={styles.baiVietAvatar}
                        source={{uri: post.idUsers?.avatar}}
                      />
                      <View style={styles.baiVietNameTime}>
                        <Text style={styles.baiVietName}>
                          {post.idUsers?.name}
                        </Text>
                        {post.taggedFriends === null ? (
                          <View />
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '50%',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                paddingLeft: 13,
                              }}>
                              {' '}
                              cùng với
                            </Text>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                              onPress={() =>
                                navigation.navigate('OtherUserA', {
                                  account: post.taggedFriends,
                                })
                              }>
                              <Text
                                style={[
                                  styles.baiVietName,
                                  {color: '#ff0000', marginLeft: 5},
                                ]}>
                                {post.taggedFriends?.name}
                              </Text>
                              <Text style={{color: '#000'}}>🎉🎁🎂</Text>
                            </TouchableOpacity>
                          </View>
                        )}
                        <View style={styles.container_time}>
                          <Text style={styles.baiVietTime}>
                            {formatTime(post.createAt)}
                          </Text>
                          <Text style={{paddingLeft: 5, fontSize: 6}}>●</Text>
                          <TouchableOpacity>
                            {post.idObject
                              ? changeIdObject(post.idObject)
                              : null}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </>
              ) : (
                <>
                  <View style={styles.baiVietHeaderLeft}>
                    <Image
                      style={styles.baiVietAvatar}
                      source={{uri: detailPosts?.idUsers?.avatar}}
                    />
                    <View style={styles.baiVietNameTime}>
                      <Text style={styles.baiVietName}>
                        {detailPosts?.idUsers?.name}
                      </Text>

                      {detailPosts.taggedFriends === null ? (
                        <View />
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '50%',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              paddingLeft: 13,
                            }}>
                            {' '}
                            cùng với
                          </Text>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                            onPress={() =>
                              navigation.navigate('OtherUserA', {
                                account: detailPosts.taggedFriends,
                              })
                            }>
                            <Text
                              style={[
                                styles.baiVietName,
                                {color: '#ff0000', marginLeft: 5},
                              ]}>
                              {detailPosts.taggedFriends?.name}
                            </Text>
                            <Text style={{color: '#000'}}>🎉🎁🎂</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      <View style={styles.container_time}>
                        <Text style={styles.baiVietTime}>
                          {formatTime(detailPosts?.createAt)}
                        </Text>
                        <Text style={{paddingLeft: 5, fontSize: 6}}>●</Text>
                        <TouchableOpacity>
                          {detailPosts?.idObject
                            ? changeIdObject(detailPosts?.idObject)
                            : null}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </>
              )}
              {/* {console.log('>>>>>>>> detailPosts', detailPosts)} */}
              {posts[0].idUsers?._id !== user.user._id ? (
                <TouchableOpacity
                  onPress={() => handleModalEditPostsGuest(posts[0])}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={18}
                    color="#666666"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleModalEditPostsAccount(posts[0])}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={18}
                    color="#666666"
                  />
                </TouchableOpacity>
              )}
            </>
          </View>
        </View>
        {/* body */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          {posts.map(item => (
            <View key={item._id}>
              {/* content */}
              {detailPosts === null ? (
                <>
                  {item.content === '' ? (
                    <></>
                  ) : (
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
                  )}
                </>
              ) : (
                <>
                  {detailPosts.content === '' ? (
                    <></>
                  ) : (
                    <View style={styles.baiVietContent}>
                      {showMore ? (
                        <Text style={styles.content}>
                          {detailPosts?.content}
                        </Text>
                      ) : (
                        <Text style={styles.content}>
                          {detailPosts?.content?.slice(0, 100)}
                        </Text>
                      )}
                      {/* Toggle button */}
                      {detailPosts?.content &&
                        detailPosts?.content.length > 100 && (
                          <TouchableOpacity
                            style={styles.showMore}
                            onPress={handleShowMore}>
                            <Text style={{color: 'blue'}}>
                              {showMore ? 'Ẩn' : 'Xem thêm'}
                            </Text>
                          </TouchableOpacity>
                        )}
                    </View>
                  )}
                </>
              )}

              {/* media */}
              {detailPosts === null ? (
                <>
                  {item.media?.length > 0 ? (
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
                                source={{uri: media.url.join()}}
                                style={styles.posts}
                              />
                            ) : (
                              <VideoPlayer
                                video={{uri: media.url.join()}}
                                videoWidth={1600}
                                videoHeight={900}
                                thumbnail={require('../../../../../assets/play_96px.png')}
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
                </>
              ) : (
                <>
                  {detailPosts?.media?.length > 0 ? (
                    <View style={styles.container_media}>
                      <Swiper
                        style={styles.swiper}
                        showsButtons={false}
                        loop={false}
                        paginationStyle={{bottom: 10}}
                        activeDotColor="#22b6c0"
                        onIndexChanged={index => setActiveSlide(index)}>
                        {detailPosts?.media?.map((media, index) => (
                          <View key={media._id}>
                            {media.type === 'image' ? (
                              <Image
                                source={{uri: media.url.join()}}
                                style={styles.posts}
                              />
                            ) : (
                              <VideoPlayer
                                video={{uri: media.url.join()}}
                                videoWidth={1600}
                                videoHeight={900}
                                thumbnail={require('../../../../../assets/play_96px.png')}
                                // autoplay={true}
                                style={styles.posts}
                              />
                            )}
                            <View style={styles.imageCountContainer}>
                              <Text style={styles.imageCountText}>
                                {index + 1}/{detailPosts?.media.length}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </Swiper>
                    </View>
                  ) : (
                    <View style={{height: 0}} />
                  )}
                </>
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
                    <Customreaction_Comment
                      reactions={reactions}
                      clone={handleReaction.current.handlePressOut}
                      posts={item}
                      reloadPosts={reloadPosts}
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
                  onPress={() => handleShare(item)}>
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
              {item.reaction?.length > 0 ? (
                <View style={styles.container_feeling_commnet_share}>
                  {/* feeling */}
                  <TouchableOpacity
                    onPress={() => setModalVisibleFeeling(true)}
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
                          {index < 2 && (
                            <Image
                              style={[
                                reaction.type === 'Haha' ||
                                reaction.type === 'Wow' ||
                                reaction.type === 'Buồn' ||
                                reaction.type === 'Tức giận'
                                  ? {width: 22, height: 22}
                                  : styles.icon_Like_Feeling,
                                ,
                              ]}
                              source={getFeelingIcon(reaction.type)}
                            />
                          )}
                        </View>
                      ),
                    )}
                    {item.reaction.length > 1 ? (
                      <View style={styles.cssLengthMeYou}>
                        {item.reaction.map(item => item.idUsers._id).join() ===
                        user.user._id ? (
                          <Text style={styles.text_peopleLike}>Bạn</Text>
                        ) : (
                          <Text style={styles.text_peopleLike}>
                            {item.reaction.length} người khác
                          </Text>
                        )}
                      </View>
                    ) : (
                      <View style={styles.cssLengthMeYou2}>
                        {item.reaction.map(item => item.idUsers._id).join() ===
                        user.user._id ? (
                          <Text style={styles.text_peopleLike}>Bạn</Text>
                        ) : (
                          <Text style={styles.text_peopleLike}>
                            {item.reaction.length} người khác
                          </Text>
                        )}
                      </View>
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
                {item.share?.length > 0 ? (
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

          <TouchableOpacity
            style={styles.container_phuhop}
            onPress={handleOnpenBottomSheetFit}>
            <Text style={styles.text_phuhop}>Phù hợp nhất</Text>
            <Icon name="chevron-down" size={12} color="#666666" />
          </TouchableOpacity>

          {/* comment */}
          {isLoading ? (
            <ActivityIndicator size="small" color="#22b6c0" />
          ) : (
            <View style={styles.comment}>
              {comments.map((item, index) => {
                if (item.idParent === null) {
                  // comment cha
                  return (
                    <View style={styles.container_comment} key={index}>
                      {/* Bình luận cha */}
                      <Pressable
                        onLongPress={() => showDialogDelete(item._id)}
                        style={styles.container_comment_header}>
                        <Image
                          style={styles.avatar_comment}
                          source={{uri: item.idUsers?.avatar}}
                        />
                        <View style={styles.container_comment_content}>
                          <View
                            style={
                              item?.content !== ''
                                ? styles.comment_content
                                : {backgroundColor: '#fff'}
                            }>
                            <Text style={styles.name_comment}>
                              {item.idUsers?.name}
                            </Text>
                            <View style={{flexDirection: 'row'}}>
                              <TouchableOpacity>
                                <Text
                                  style={{
                                    color: '#1b9e9a',
                                    paddingRight: 5,
                                  }}>
                                  {item.parentUserName}
                                </Text>
                              </TouchableOpacity>
                              {item?.content && (
                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      color: '#000',
                                      width: '70%',
                                    }}>
                                    {item.content}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>

                          {item?.image && item?.image.length > 0 && (
                            <View style={styles.container_image_camera}>
                              {item.image.map((image, imageIndex) => {
                                if (isImage(image)) {
                                  return (
                                    <TouchableOpacity
                                      key={imageIndex}
                                      onPress={() =>
                                        handleShowMoreImage(image)
                                      }>
                                      <Image
                                        source={{uri: image}}
                                        style={styles.content_image}
                                      />
                                    </TouchableOpacity>
                                  );
                                } else if (isVideo(image)) {
                                  return (
                                    <TouchableOpacity
                                      key={imageIndex}
                                      onPress={() =>
                                        handleShowMoreImage(image)
                                      }>
                                      <VideoPlayer
                                        video={{uri: image}}
                                        videoWidth={1600}
                                        videoHeight={900}
                                        thumbnail={require('../../../../../assets/play_96px.png')}
                                        style={styles.content_video}
                                      />
                                    </TouchableOpacity>
                                  );
                                } else {
                                  return null;
                                }
                              })}
                            </View>
                          )}
                          <View style={styles.comment_time_like}>
                            <Text style={styles.time_comment}>
                              {formatTime(item.createAt)}
                            </Text>
                            <TouchableOpacity
                              style={styles.like_like_comment}
                              onPress={() => handleLikeComments(item._id)}
                              onLongPress={() =>
                                handleReaction.current.handleLongPress()
                              }>
                              {isUserReacted(item.reaction, user.user._id) ? (
                                <Text
                                  style={[
                                    styles.like_like_comment,
                                    {color: '#22b6c0'},
                                  ]}>
                                  Thích
                                </Text>
                              ) : (
                                <Text style={styles.like_like_comment}>
                                  Thích
                                </Text>
                              )}
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.like_like_comment}
                              onPress={() => {
                                setParentId(item._id),
                                  setParentUserName(item.idUsers.name);
                              }}>
                              <Text style={styles.like_like_comment}>
                                Phản hồi
                              </Text>
                            </TouchableOpacity>
                            {item.reaction && item.reaction.length > 0 && (
                              <View style={styles.like_like_comment}>
                                <Text style={styles.like_like_comment}>
                                  {item.reaction.length} lượt thích
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </Pressable>
                      {/* Bình luận con */}
                      <View
                        style={{
                          paddingLeft: 15,
                        }}>
                        {comments
                          .filter(
                            subItem =>
                              subItem.idParent &&
                              subItem.idParent._id === item._id,
                          )
                          .map((subItem, subIndex) => (
                            <View
                              style={{
                                borderLeftWidth: 2,
                                borderColor: '#c6c6c6',
                                borderBottomLeftRadius: 50,
                              }}
                              key={subIndex}>
                              <Pressable
                                onLongPress={() => {
                                  showDialogDelete(subItem._id),
                                    setParentId(subItem._id);
                                }}
                                style={[
                                  styles.container_comment_body,
                                  styles.childComment,
                                ]}>
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
                                  <View
                                    style={
                                      subItem?.content !== ''
                                        ? styles.comment_content
                                        : {backgroundColor: '#fff'}
                                    }>
                                    <Text style={styles.name_comment}>
                                      {subItem.idUsers?.name}
                                    </Text>
                                    <View style={{flexDirection: 'row'}}>
                                      {subItem.idUsers.name !==
                                      user.user.name ? (
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate('OtherUserA', {
                                              account: subItem,
                                            })
                                          }>
                                          <Text
                                            style={{
                                              color: '#1b9e9a',
                                              paddingRight: 5,
                                            }}>
                                            {subItem.parentUserName}
                                          </Text>
                                        </TouchableOpacity>
                                      ) : (
                                        <TouchableOpacity
                                          onPress={() =>
                                            navigation.navigate('Profile', {
                                              account: subItem,
                                            })
                                          }>
                                          <Text
                                            style={{
                                              color: '#1b9e9a',
                                              paddingRight: 5,
                                            }}>
                                            {subItem.parentUserName}
                                          </Text>
                                        </TouchableOpacity>
                                      )}
                                      {subItem?.content && (
                                        <View style={{flexDirection: 'row'}}>
                                          <Text
                                            style={{
                                              color: '#000',
                                              width: '70%',
                                            }}>
                                            {subItem.content}
                                          </Text>
                                        </View>
                                      )}
                                    </View>
                                  </View>

                                  {subItem?.image &&
                                    subItem?.image.length > 0 && (
                                      <View
                                        style={styles.container_image_camera}>
                                        {subItem.image.map(
                                          (image, imageIndex) => {
                                            if (isImage(image)) {
                                              return (
                                                <TouchableOpacity
                                                  key={imageIndex}
                                                  onPress={() =>
                                                    handleShowMoreImage(image)
                                                  }>
                                                  <Image
                                                    source={{uri: image}}
                                                    style={styles.content_image}
                                                  />
                                                </TouchableOpacity>
                                              );
                                            } else if (isVideo(image)) {
                                              return (
                                                <TouchableOpacity
                                                  key={imageIndex}
                                                  onPress={() =>
                                                    handleShowMoreImage(image)
                                                  }>
                                                  <VideoPlayer
                                                    video={{uri: image}}
                                                    videoWidth={1600}
                                                    videoHeight={900}
                                                    thumbnail={require('../../../../../assets/play_96px.png')}
                                                    style={styles.content_video}
                                                  />
                                                </TouchableOpacity>
                                              );
                                            } else {
                                              return null;
                                            }
                                          },
                                        )}
                                      </View>
                                    )}
                                  <View style={styles.comment_time_like}>
                                    <Text style={styles.time_comment}>
                                      {formatTime(subItem.createAt)}
                                    </Text>
                                    <TouchableOpacity
                                      style={styles.like_like_comment}
                                      onPress={() =>
                                        handleLikeComments(subItem._id)
                                      }
                                      onLongPress={() =>
                                        handleReaction.current.handleLongPress()
                                      }>
                                      {isUserReacted(
                                        subItem.reaction,
                                        user.user._id,
                                      ) ? (
                                        <Text
                                          style={[
                                            styles.like_like_comment,
                                            {color: '#22b6c0'},
                                          ]}>
                                          Thích
                                        </Text>
                                      ) : (
                                        <Text style={styles.like_like_comment}>
                                          Thích
                                        </Text>
                                      )}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      style={styles.like_like_comment}
                                      onPress={() => {
                                        setParentId(subItem._id);
                                        setParentUserName(subItem.idUsers.name);
                                      }}>
                                      <Text style={styles.like_like_comment}>
                                        Phản hồi
                                      </Text>
                                    </TouchableOpacity>
                                    {subItem.reaction &&
                                      subItem.reaction.length > 0 && (
                                        <View style={styles.like_like_comment}>
                                          <Text
                                            style={styles.like_like_comment}>
                                            {subItem.reaction.length} lượt thích
                                          </Text>
                                        </View>
                                      )}
                                  </View>
                                </View>
                              </Pressable>

                              {/* Bình luận lòng con */}
                              <View
                                style={{
                                  paddingLeft: 30,
                                }}>
                                {/* {console.log(
                                  '>>>> asasd',
                                  comments.filter(
                                    subItemC =>
                                      subItemC.idParent &&
                                      subItemC.idParent?._id &&
                                      subItemC.idParent?.idParent ===
                                        subItem._id,
                                  ),
                                )} */}
                                {comments
                                  .filter(
                                    subItemC =>
                                      subItemC.idParent?._id === subItem._id,
                                  )
                                  .map((subItemC, subIndex) => (
                                    <Pressable
                                      onLongPress={() => {
                                        showDialogDelete(subItemC._id),
                                          setParentId(subItemC._id);
                                      }}
                                      style={{
                                        borderLeftWidth: 2,
                                        borderColor: '#c6c6c6',
                                        borderBottomLeftRadius: 50,
                                      }}
                                      key={subIndex}>
                                      <View
                                        style={[
                                          styles.container_comment_body,
                                          styles.childCommentCC,
                                        ]}>
                                        <Image
                                          style={[
                                            styles.avatar_comment,
                                            {width: 25, height: 25},
                                          ]}
                                          source={
                                            subItemC.idUsers?.avatar === '' ||
                                            subItemC.idUsers?.avatar === null ||
                                            subItemC.idUsers?.avatar ===
                                              undefined ||
                                            subItemC.idUsers?.avatar ===
                                              'default' ||
                                            subItemC.idUsers?.avatar === 'null'
                                              ? require('../../../../../assets/account.png')
                                              : {uri: subItemC.idUsers?.avatar}
                                          }
                                        />
                                        <View
                                          style={
                                            styles.container_comment_contentCC
                                          }>
                                          <View
                                            style={
                                              subItemC?.content !== ''
                                                ? styles.comment_content
                                                : {backgroundColor: '#fff'}
                                            }>
                                            <Text
                                              style={[
                                                styles.name_comment,
                                                {fontSize: 14},
                                              ]}>
                                              {subItemC.idUsers?.name}
                                            </Text>
                                            <View
                                              style={{flexDirection: 'row'}}>
                                              <TouchableOpacity>
                                                <Text
                                                  style={{
                                                    color: '#1b9e9a',
                                                    paddingRight: 5,
                                                  }}>
                                                  {subItemC.parentUserName}
                                                </Text>
                                              </TouchableOpacity>
                                              {subItemC?.content && (
                                                <View
                                                  style={{
                                                    flexDirection: 'row',
                                                  }}>
                                                  <Text
                                                    style={{
                                                      color: '#000',
                                                      width: '60%',
                                                      fontSize: 14,
                                                    }}>
                                                    {subItemC.content}
                                                  </Text>
                                                </View>
                                              )}
                                            </View>
                                          </View>

                                          {subItemC?.image &&
                                            subItemC?.image.length > 0 && (
                                              <View
                                                style={
                                                  styles.container_image_camera
                                                }>
                                                {subItemC.image.map(
                                                  (image, imageIndex) => {
                                                    if (isImage(image)) {
                                                      return (
                                                        <TouchableOpacity
                                                          key={imageIndex}
                                                          onPress={() =>
                                                            handleShowMoreImage(
                                                              image,
                                                            )
                                                          }>
                                                          <Image
                                                            source={{
                                                              uri: image,
                                                            }}
                                                            style={
                                                              styles.content_image
                                                            }
                                                          />
                                                        </TouchableOpacity>
                                                      );
                                                    } else if (isVideo(image)) {
                                                      return (
                                                        <TouchableOpacity
                                                          key={imageIndex}
                                                          onPress={() =>
                                                            handleShowMoreImage(
                                                              image,
                                                            )
                                                          }>
                                                          <VideoPlayer
                                                            video={{uri: image}}
                                                            videoWidth={1600}
                                                            videoHeight={900}
                                                            thumbnail={require('../../../../../assets/play_96px.png')}
                                                            style={
                                                              styles.content_video
                                                            }
                                                          />
                                                        </TouchableOpacity>
                                                      );
                                                    } else {
                                                      return null;
                                                    }
                                                  },
                                                )}
                                              </View>
                                            )}
                                          <View
                                            style={styles.comment_time_like}>
                                            <Text style={styles.time_comment}>
                                              {formatTime(subItemC.createAt)}
                                            </Text>
                                            <TouchableOpacity
                                              style={styles.like_like_comment}
                                              onPress={() =>
                                                handleLikeComments(subItemC._id)
                                              }
                                              onLongPress={() =>
                                                handleReaction.current.handleLongPress()
                                              }>
                                              {isUserReacted(
                                                subItemC.reaction,
                                                user.user._id,
                                              ) ? (
                                                <Text
                                                  style={[
                                                    styles.like_like_comment,
                                                    {color: '#22b6c0'},
                                                  ]}>
                                                  Thích
                                                </Text>
                                              ) : (
                                                <Text
                                                  style={
                                                    styles.like_like_comment
                                                  }>
                                                  Thích
                                                </Text>
                                              )}
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                              style={styles.like_like_comment}
                                              onPress={() => {
                                                setParentId(subItemC._id);
                                                setParentUserName(
                                                  subItemC.idUsers.name,
                                                );
                                              }}>
                                              <Text
                                                style={
                                                  styles.like_like_comment
                                                }>
                                                Phản hồi
                                              </Text>
                                            </TouchableOpacity>
                                            {subItemC.reaction &&
                                              subItemC.reaction.length > 0 && (
                                                <View
                                                  style={
                                                    styles.like_like_comment
                                                  }>
                                                  <Text
                                                    style={
                                                      styles.like_like_comment
                                                    }>
                                                    {subItemC.reaction.length}{' '}
                                                    thích
                                                  </Text>
                                                </View>
                                              )}
                                          </View>
                                        </View>
                                      </View>
                                    </Pressable>
                                  ))}
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
          )}
        </ScrollView>
        {/* Reply Comment */}
        <>
          {image.length > 0 && (
            <>
              {isLoadingCamera ? (
                <ActivityIndicator size="small" color="#22b6c0" />
              ) : (
                <FlatList
                  style={{marginTop: 10}}
                  data={image}
                  numColumns={numColumns}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleShowMoreImageList(item.uri)}>
                      {isImage(item.uri) ? (
                        <View
                          style={{
                            alignItems: 'center',
                          }}>
                          {/* cho clone ảnh và cho item.uri = null */}
                          {console.log('>>> item', item)}
                          <TouchableOpacity
                            style={styles.container_image_camera}
                            onPress={() => {
                              removeImage(item);
                              setImagePath(null);
                            }}>
                            <Octicons
                              name="x-circle"
                              size={16}
                              color="#666666"
                            />
                          </TouchableOpacity>
                          <Image
                            source={{uri: item.uri}}
                            style={{
                              width:
                                Dimensions.get('window').width / numColumns -
                                10,
                              height:
                                Dimensions.get('window').width / numColumns -
                                10,
                              margin: 5,
                              borderRadius: 5,
                            }}
                          />
                          {console.log('>>> item.uri', item.uri)}
                        </View>
                      ) : isVideo(item.uri) ? (
                        <View
                          style={{
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            style={styles.container_image_camera}
                            onPress={() => {
                              removeImage(item);
                              setImagePath(null);
                            }}>
                            <Octicons
                              name="x-circle"
                              size={16}
                              color="#666666"
                            />
                          </TouchableOpacity>
                          <VideoPlayer
                            video={{uri: item.uri}}
                            videoWidth={1600}
                            videoHeight={900}
                            thumbnail={require('../../../../../assets/play_96px.png')}
                            style={{
                              width:
                                Dimensions.get('window').width / numColumns -
                                10,
                              height:
                                Dimensions.get('window').width / numColumns -
                                10,
                              margin: 5,
                              borderRadius: 5,
                            }}
                          />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  )}
                />
              )}
            </>
          )}
          <View style={styles.container_reply_comment}>
            <TouchableOpacity onPress={openLibrary}>
              <MaterialIcons name="video-library" size={24} color="#666666" />
            </TouchableOpacity>
            <View style={styles.input_comment}>
              {parentUserName !== null ? (
                <>
                  <TouchableOpacity onPress={() => setParentUserName(null)}>
                    <Octicons name="x-circle" size={16} color="#666666" />
                  </TouchableOpacity>
                  <Text style={styles.parentUserName}>{parentUserName}</Text>
                </>
              ) : null}
              {parentUserName !== null ? (
                <>
                  <TextInput
                    ref={commentInputRef}
                    style={styles.input_comment_text}
                    placeholder={`Bình luận dưới tên ${user.user.name}`}
                    onChangeText={handleTextChange}
                    value={commentContent}
                  />
                  {showUserList && (
                    <View style={styles.userList}>
                      {searchNameInList.map(user => (
                        <TouchableOpacity
                          key={user._id}
                          onPress={() => handleUserSelect(user.name)}
                          style={styles.listUser_container}>
                          <Image
                            style={styles.listUser_image}
                            source={{uri: user.avatar}}
                          />
                          <Text style={styles.listUser_text}>{user.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </>
              ) : (
                <>
                  <TextInput
                    ref={commentInputRef}
                    style={styles.input_comment_textAll}
                    placeholder={`Bình luận dưới tên ${user.user.name}`}
                    onChangeText={handleTextChange}
                    value={commentContent}
                  />
                  {showUserList && (
                    <View style={styles.userList}>
                      {searchNameInList.map(user => (
                        <TouchableOpacity
                          key={user._id}
                          onPress={() => handleUserSelect(user.name)}
                          style={styles.listUser_container}>
                          <Image
                            style={styles.listUser_image}
                            source={{uri: user.avatar}}
                          />
                          <Text style={styles.listUser_text}>{user.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                submitCommentSend();
                setCommentContent('');
              }}>
              <Image
                style={styles.icon_comment_send}
                source={require('../../../../../assets/send_comment_50px.png')}
              />
            </TouchableOpacity>
          </View>
        </>
        {/* bottom sheet */}
        <BottomSheet
          ref={bottomSheetRefFit}
          index={initialSnapIndex}
          snapPoints={snapPointsFit}
          enablePanDownToClose={true}>
          <BottomSheetFit
            comment={comments}
            handleArrange={handleArrange}
            reloadComments={reloadComments}
          />
        </BottomSheet>

        {/* modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleFeeling}
          onRequestClose={() => {}}>
          <View style={styles.modalContainerFeeling}>
            <TouchableOpacity
              style={styles.modalViewFeelingClose}
              onPress={() => setModalVisibleFeeling(false)}></TouchableOpacity>
            <View style={styles.modalViewFeeling}>
              <FeelingComponent
                reactions={postId.reaction}
                clone={handleCloneBottomSheet}
              />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={showMoreImage}
          onRequestClose={() => {}}>
          <TouchableOpacity
            activeOpacity={1}
            onPressOut={() => setShowMoreImage(false)}
            style={styles.modalShowMoreImage}>
            {/* {console.log('>>> showw', imageimageShowMore)} */}
            {isImage(imageimageShowMore) ? (
              <Image
                source={{uri: imageimageShowMore}}
                style={[styles.content_image, {width: '80%', height: '80%'}]}
              />
            ) : isVideo(imageimageShowMore) ? (
              <Video
                onBuffer={this.onBuffer}
                onError={this.videoError}
                source={{uri: imageimageShowMore}}
                resizeMode="contain"
                rate={1}
                volume={1}
                muted={false}
                ignoreSilentSwitch={null}
                repeat={false}
                controls={false}
                progressive={true}
                style={styles.content_videoShowMore}
              />
            ) : null}
          </TouchableOpacity>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.button_select_camera}
                onPress={openCamera}>
                <Image
                  style={styles.icon_comment_send}
                  source={require('../../../../../assets/camera_50px_pick_modal.png')}
                />
                <Text style={styles.text_camera_modal}>Chụp ảnh</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button_select_camera}
                onPress={openLibrary}>
                <Image
                  style={styles.icon_comment_send}
                  source={require('../../../../../assets/photo_video_50px_pick_camera.png')}
                />
                <Text style={styles.text_camera_modal}>Chọn ảnh/video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_select_camera}
                onPress={() => setModalVisible(false)}>
                <Image
                  style={styles.icon_comment_send}
                  source={require('../../../../../assets/cancel_50px_pick_camera.png')}
                />
                <Text style={styles.text_camera_modal}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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

        <DialogDeletePosts.Container visible={visibleDiaLogDelete}>
          <DialogDeletePosts.Title>Xóa comments này ?</DialogDeletePosts.Title>
          <DialogDeletePosts.Description>
            Sau khi xóa comments này bạn không thể khôi phục.
          </DialogDeletePosts.Description>
          <DialogDeletePosts.Button label="Hủy" onPress={handleCancelDelete} />
          <DialogDeletePosts.Button
            label="Chấp nhận"
            onPress={handleDeleteComments}
          />
        </DialogDeletePosts.Container>
      </View>
    </GestureHandlerRootView>
  );
};

export default CommentsScreen;
