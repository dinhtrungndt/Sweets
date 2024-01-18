/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// Data
import {getLikedBy} from '../../../../services/home/homeService';
import AxiosInstance from '../../../../helper/Axiosinstance';
import {UserContext} from '../../../../contexts/user/userContext';
import {DataComment} from './data';

// Css
import styles from './style/index';

// Library
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommentScreen = ({navigation, route}) => {
  const {postId} = route.params;
  const {user} = useContext(UserContext);

  const [showMore, setShowMore] = useState(false);
  const [posts, setPosts] = useState([postId]);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  // console.log('>>>>>>>>>>> comment 14 ', postId);

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

  const handleLike = async postId => {
    try {
      const userId = user.id;
      const response = await fetch(
        `http://192.168.2.209:3001/post/like/${postId}/${userId}`,
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
            // console.log('>>>>>>>>>>>>>>>>>> 6555555', post._id);
            return {
              ...post,
              isLiked: !post.isLiked,
              likedBy: post.isLiked
                ? post.likedBy.filter(id => id !== userId)
                : [...post.likedBy, userId],
            };
          }
          return post;
        });

        // console.log('>>>>>>>>>>>>>>>>>> 7777', data.post._id);

        // console.log(
        //   '------------>>>>>>>>>>>>>>>>>> 80000 Updated posts:',
        //   updatedPosts,
        // );

        setPosts([...updatedPosts]);
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', data.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  // Lấy danh sách người dùng đã like
  const isGetLikedBy = async postId => {
    try {
      const url = `/post/${postId}/get-liked-by`;
      const response = await AxiosInstance().get(url);
      console.log('get post >>>>>>>>>>>>>>> 10333333  ', response);
      return response;
    } catch (error) {
      console.error(' >>>>>>>>> Lỗi get: 1033333 s', error);
      throw error;
    }
  };

  useEffect(() => {
    isGetLikedBy(postId._id);
  }, []);

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        {/* thông tin header */}
        <View style={styles.baiVietHeader}>
          <>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.icon_backTO}>
              <Image
                style={styles.icon_back}
                source={require('../../../../assets/icon_back.png')}
              />
            </TouchableOpacity>
            <View style={styles.baiVietHeaderLeft}>
              <Image
                style={styles.baiVietAvatar}
                source={{uri: postId.avatar}}
              />
              <View style={styles.baiVietNameTime}>
                <Text style={styles.baiVietName}>{postId.name}</Text>
                <Text style={styles.baiVietTime}>
                  {/* Vừa đăng, giây, phút, giờ, ngày*/}
                  {formatTime(postId.time)}
                </Text>
              </View>
            </View>
          </>
          <TouchableOpacity
            onPress={() => navigation.navigate('BottomSheetLayout', {postId})}
            style={styles.baiVietHeaderRight}>
            <Image
              style={styles.baiVietHeaderRightIcon}
              source={require('../../../../assets/icon_more.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* body */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {/* content bài viết */}
        <View style={styles.baiVietContent}>
          {showMore ? (
            <Text style={styles.baiVietContentText}>{postId.content}</Text>
          ) : (
            <Text style={styles.baiVietContentText}>
              {postId.content.slice(0, 100)}
            </Text>
          )}
          {/* Toggle button */}
          {postId.content.length > 100 && (
            <TouchableOpacity onPress={handleShowMore}>
              <Text style={{color: 'blue'}}>
                {showMore ? 'Ẩn' : 'Xem thêm'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.baiViet} key={postId._id}>
          {/* {console.log('>>>>>>>>>>>>>>>>>> 2511111', postId.name)} */}

          {postId.image && postId.image.length > 0 ? (
            <View style={styles.baiVietImage}>
              {postId.image.map((imageUrl, index) => (
                <Image
                  key={index}
                  style={[
                    styles.baiVietImageImage,
                    {
                      width: 100 / postId.image.length + '%',
                    },
                  ]}
                  source={{uri: imageUrl}}
                />
              ))}
              {/* {console.log('>>>>>>>>>>>>>>>>>> 2511111', postId.image)} */}
            </View>
          ) : (
            <View style={{height: 0}} />
          )}

          <View style={styles.baiVietLikeCommentShare}>
            <View style={styles.baiVietLike}>
              <TouchableOpacity
                onPress={() => handleLike(postId._id)}
                style={[
                  styles.baiVietLikeIcon,
                  {
                    flexDirection: 'row',
                    paddingLeft: 0,
                  },
                ]}>
                {postId.isLiked ? (
                  <Image
                    style={styles.baiVietLikeIcon}
                    source={require('../../../../assets/icon_like_click.png')}
                  />
                ) : (
                  <Image
                    style={styles.baiVietLikeIcon}
                    source={require('../../../../assets/icon_like.png')}
                  />
                )}
                <Text style={styles.baiVietLikeText}>
                  {postId.likedBy.length}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.baiVietComments}>
              <Image
                style={styles.baiVietCommentsIcon}
                source={require('../../../../assets/icon_comment.png')}
              />
              <Text style={styles.baiVietCommentsText}>
                {postId.comment} bình luận
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.baiVietShare}>
              <Image
                style={styles.baiVietShareIcon}
                source={require('../../../../assets/icon_share.png')}
              />
              <Text style={styles.baiVietShareText}>Share</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.lineHr} />
        </View>
        {/* people who like */}
        <View style={styles.container_peopleLike}>
          {postId.likedBy.length > 0 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('PeopleLike', {postId})}
              style={styles.container_peopleLike}>
              <Image
                style={styles.icon_like}
                source={require('../../../../assets/icon_like_click.png')}
              />
              <Text style={styles.text_peopleLike}>
                {postId.likedBy.map((item, index) => {
                  if (item === user.id) {
                    return 'Bạn';
                  }
                })}
                {postId.likedBy.length > 1 && ' và'}
                {postId.likedBy.length > 2
                  ? postId.likedBy.length - 2 + 'và những người khác'
                  : postId.likedBy.map((item, index) => {
                      if (item !== user.id) {
                        return ' ' + postId.name;
                      }
                    })}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Sort bình luận */}
        <TouchableOpacity>
          <Text style={styles.text_sortComment}>
            Phù hợp nhất <Icon name="chevron-down" size={13} />
          </Text>
        </TouchableOpacity>
        {/* Comment */}
        <View style={styles.comment}>
          {DataComment.map((item, index) => {
            if (item.parentId === null) {
              // Bình luận cha
              return (
                <View style={styles.container_comment} key={index}>
                  {/* Bình luận cha */}
                  <View style={styles.container_comment_header}>
                    <Image
                      style={styles.avatar_comment}
                      source={{uri: item.avatar}}
                    />
                    <View style={styles.container_comment_content}>
                      <View style={styles.comment_content}>
                        <Text style={styles.name_comment}>{item.name}</Text>
                        <Text style={styles.content_comment}>
                          {item.content}
                        </Text>
                      </View>
                      <View style={styles.comment_time_like}>
                        <Text style={styles.time_comment}>{item.time}</Text>
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

                  {/* Bình luận con */}
                  <View
                    style={{
                      borderLeftWidth: 2,
                      borderColor: '#ccc',
                      marginLeft: 18,
                    }}>
                    {DataComment.filter(
                      subItem => subItem.parentId === item.id,
                    ).map((subItem, subIndex) => (
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
                          source={{uri: subItem.avatar}}
                        />
                        <View style={styles.container_comment_content}>
                          <View style={styles.comment_content}>
                            <Text style={styles.name_comment}>
                              {subItem.name}
                            </Text>
                            <Text style={styles.content_comment}>
                              {subItem.content}
                            </Text>
                          </View>
                          <View style={styles.comment_time_like}>
                            <Text style={styles.time_comment}>
                              {subItem.time}
                            </Text>
                            <TouchableOpacity style={styles.like_like_comment}>
                              <Text style={styles.like_like_comment}>
                                Thích
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.like_like_comment}>
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
            source={require('../../../../assets/icon_camera_comment.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input_comment}
          placeholder={`Bình luận dưới tên ${postId.name}`}
        />
      </View>
    </View>
  );
};

export default CommentScreen;
