/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {LoadingScreen} from '../../../utils/loading';

// Data
import {dataStory} from './data';
import {BaiVietData} from './data/baiviet';
import {getPosts, getPostById} from '../../../services/home/homeService';

// StyleCss
import styles from './style/home';
import {UserContext} from '../../../contexts/user/userContext';

// Library
import AddModal from './dropDown/addModal';
import moment from 'moment';
import HeaderScreens from '../layout/header';

const HomeScreen = props => {
  const {navigation} = props;

  const {user} = useContext(UserContext);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  // const onGetPosts = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await getPosts();
  //     const updatedPosts = res.flatMap(project =>
  //       project.posts.map(post => {
  //         const likedByCurrentUser = post.likedBy.includes(user.id);
  //         // console.log('>>>>>>>>>>>>>>>>>> 78', likedByCurrentUser);
  //         return {
  //           ...post,
  //           posts: [
  //             {
  //               ...post,
  //               isLiked: likedByCurrentUser,
  //             },
  //           ],
  //         };
  //       }),
  //     );
  //     setPosts(updatedPosts);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Lỗi: ', error);
  //     setLoading(false);
  //   }
  // };

  const onGetPostById = async () => {
    try {
      setLoading(true);
      const userId = user.id;
      const res = await getPostById(userId);

      if (res && res.friends && res.posts) {
        // console.log('>>>>>>>>>>>>>>>>>> 93', res.posts);
        const updatedPostsFriends = res.friends.flatMap(friend =>
          friend.posts.map(friendd => {
            const likedByCurrentUser = friendd.likedBy.includes(user.id);
            return {
              ...friendd,
              friendds: [
                {
                  ...friendd,
                  isLiked: likedByCurrentUser,
                },
              ],
            };
          }),
        );

        const updatedPostsMe = res.posts.map(post => {
          // console.log('>>>>>>>>>>>>>>>>>> 93', post);
          const likedByCurrentUser = post.likedBy.includes(user.id);
          return {
            ...post,
            posts: [
              {
                ...post,
                isLiked: likedByCurrentUser,
              },
            ],
          };
        });

        // console.log('>>>>>>>>>>>>>>> In updatedPosts :', updatedPostsFriends);
        // console.log('>>>>>>>>>>>>>>> In updatedPostsMe :', updatedPostsMe);

        // Combine and sort the arrays based on time in descending order
        const sortedPosts = [...updatedPostsFriends, ...updatedPostsMe].sort(
          (a, b) => moment(b.time).diff(moment(a.time)),
        );

        // console.log('>>>>>>>>>>>>>>> In sortedPosts :', sortedPosts);
        setPosts([...sortedPosts]);
      } else {
        console.error('>>>>>>>>>>>>>>>> Lỗi trả về 93 ');
      }
      setLoading(false);
    } catch (error) {
      console.error('Lỗi:', error);
      setLoading(false);
    }
  };

  const handleLike = async postId => {
    try {
      const userId = user.id;
      const response = await fetch(
        `http://192.168.1.10:3001/post/like/${postId}/${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId, postId}),
        },
      );

      const data = await response.json();
      // console.log('Response from API:', data);

      if (data.status === 1) {
        const updatedPosts = posts.map(post => {
          if (post._id === postId) {
            const likedByCurrentUser = data.post.likedBy.includes(userId);
            // console.log('>>>>>>>>>>>>>>>>>> 14555555', post.isLiked);
            // console.log('>>>>>>>>>>>>>>>>>> 14555555', post);
            return {
              ...post,
              isLiked: likedByCurrentUser,
              likedBy: data.post.likedBy,
            };
          }
          return post;
        });

        // console.log('>>>>>>>>>>>>>>>>>> 81', data.post?.isLiked);
        // console.log('>>>>>>>>>>>>>>>>>> 81', data.isLiked);

        // console.log(
        //   // '------------>>>>>>>>>>>>>>>>>> 106 Updated posts:',
        //   updatedPosts,
        // );

        setPosts(updatedPosts);
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', data.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
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

  useEffect(() => {
    //   onGetPosts();
    onGetPostById();
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <View style={styles.T}>
        {/* Header */}
        <HeaderScreens {...props} />
        {/* Body */}
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.avatar_content_image}>
            <TouchableOpacity>
              <Image
                style={[styles.avatar, {marginLeft: 5}]}
                source={{uri: user.user.avatar}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 290,
                height: 40,
                justifyContent: 'center',
                borderRadius: 50,
              }}
              onPress={() => navigation.navigate('UpStatus', {user})}>
              <Text style={{marginLeft: 10, fontSize: 16}}>
                Bạn đang nghĩ gì?
              </Text>
            </TouchableOpacity>
            <View style={{flex: 1}} />
            <TouchableOpacity>
              <Image
                style={styles.avatar_icon_image}
                source={require('../../../assets/icon_image.png')}
              />
            </TouchableOpacity>
          </View>
          {/* anh-video-album-kyniem */}
          <View style={styles.pick_feelings}>
            <TouchableOpacity style={styles.boder_image}>
              <Image
                style={styles.avatar_icon_image}
                source={require('../../../assets/icon_image_pick.png')}
              />
              <Text style={{fontSize: 12, paddingLeft: 10}}>Ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boder_image}>
              <Image
                style={styles.avatar_icon_image}
                source={require('../../../assets/icon_video.png')}
              />
              <Text style={{fontSize: 12, paddingLeft: 10}}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boder_image}>
              <Image
                style={styles.avatar_icon_image}
                source={require('../../../assets/icon_album.png')}
              />
              <Text style={{fontSize: 12, paddingLeft: 10}}>Album</Text>
            </TouchableOpacity>
          </View>
          {/* đường kẻ ngang*/}
          <Text style={[styles.lineHr, {marginTop: 10, height: 5}]} />
          {/* Story */}
          <ScrollView
            style={{
              height: 227,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {/* UpStory User */}
            <TouchableOpacity style={styles.upStory_User}>
              <Image
                style={styles.avatar_upstory}
                source={{uri: user.user.avatar}}
              />
              <View style={styles.view_addStory}>
                <Image
                  style={styles.add_story}
                  source={require('../../../assets/add_story.png')}
                />
              </View>
              <Text style={styles.text_addStory}>Tạo tin</Text>
            </TouchableOpacity>
            {/* Story */}
            <View style={[styles.story, {flexDirection: 'row'}]}>
              {dataStory.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.storyItem}
                  onPress={() => navigation.navigate('UpStory')}>
                  <Image style={styles.storyAvatar} source={item.avatar} />
                  <Image style={styles.storyImage} source={item.image} />
                  <Text style={styles.storyName}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          {/* BaiViet */}
          <View>
            <Text style={[styles.lineHr, {marginTop: 20, height: 5}]} />
            {posts.length === 0 ? (
              <Text style={styles.noStatus}>
                Không có bài viết nào được đăng !
              </Text>
            ) : (
              posts.map((item, index) => (
                <View style={styles.baiViet} key={item._id}>
                  {/* {console.log('>>>>>>>>>>>>>>>>>> 2511111', item.name)} */}
                  <View
                    style={[
                      styles.baiVietHeader,
                      {paddingTop: index === 0 ? 15 : 0},
                    ]}>
                    <View style={styles.baiVietHeaderLeft}>
                      <Image
                        style={styles.baiVietAvatar}
                        source={{uri: item.avatar}}
                      />
                      <View style={styles.baiVietNameTime}>
                        <Text style={styles.baiVietName}>{item.name}</Text>
                        <Text style={styles.baiVietTime}>
                          {/* Vừa đăng, giây, phút, giờ, ngày*/}
                          {formatTime(item.time)}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('BottomSheetLayout', {item})
                      }
                      style={styles.baiVietHeaderRight}>
                      <Image
                        style={styles.baiVietHeaderRightIcon}
                        source={require('../../../assets/icon_more.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        style={[
                          styles.baiVietHeaderRightIcon,
                          {
                            left: 15,
                            width: 14,
                            height: 14,
                          },
                        ]}
                        source={require('../../../assets/icon_delete.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.baiVietContent}>
                    {showMore ? (
                      <Text style={styles.baiVietContentText}>
                        {item.content}
                      </Text>
                    ) : (
                      <Text style={styles.baiVietContentText}>
                        {item.content.slice(0, 100)}
                      </Text>
                    )}
                    {/* Toggle button */}
                    {item.content.length > 100 && (
                      <TouchableOpacity onPress={handleShowMore}>
                        <Text style={{color: 'blue'}}>
                          {showMore ? 'Ẩn' : 'Xem thêm'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {item.image && item.image.length > 0 ? (
                    <View style={styles.baiVietImage}>
                      {item.image.map((imageUrl, index) => (
                        <Image
                          key={index}
                          style={[
                            styles.baiVietImageImage,
                            {
                              width: 100 / item.image.length + '%',
                            },
                          ]}
                          source={{uri: imageUrl}}
                        />
                      ))}
                      {/* {console.log('>>>>>>>>>>>>>>>>>> 2511111', item.image)} */}
                    </View>
                  ) : (
                    <View style={{height: 0}} />
                  )}

                  <View style={styles.baiVietLikeCommentShare}>
                    <View style={styles.baiVietLike}>
                      <TouchableOpacity
                        onPress={() => handleLike(item._id)}
                        style={[
                          styles.baiVietLikeIcon,
                          {
                            flexDirection: 'row',
                            paddingLeft: 0,
                          },
                        ]}>
                        {item.isLiked ? (
                          <Image
                            style={styles.baiVietLikeIcon}
                            source={require('../../../assets/icon_like_click.png')}
                          />
                        ) : (
                          <Image
                            style={styles.baiVietLikeIcon}
                            source={require('../../../assets/icon_like.png')}
                          />
                        )}
                        {/* {console.log(
                          '------ >>>>>>>>>>>>>>>>>> 4111111',
                          item.isLiked,
                        )} */}
                        <Text style={styles.baiVietLikeText}>
                          {item.likedBy.length}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.baiVietComments}
                      onPress={() =>
                        navigation.navigate('CommentScreen', {postId: item})
                      }>
                      <Image
                        style={styles.baiVietCommentsIcon}
                        source={require('../../../assets/icon_comment.png')}
                      />
                      <Text style={styles.baiVietCommentsText}>
                        {item.comment} bình luận
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.baiVietShare}>
                      <Image
                        style={styles.baiVietShareIcon}
                        source={require('../../../assets/icon_share.png')}
                      />
                      <Text style={styles.baiVietShareText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.lineHr, {marginTop: 10, height: 5}]} />
                </View>
              ))
            )}
          </View>
          {/* đường kẻ ngang*/}
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;
