/* eslint-disable prettier/prettier */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// Css
import styles from './style/index';

// Library
import moment from 'moment';
import {UserContext} from '../../../../contexts/user/userContext';

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
    const diffInMinutes = currentTime.diff(postTime, 'minutes');

    if (diffInMinutes < 1) {
      return 'Vừa đăng';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 24 * 60) {
      return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    } else if (diffInMinutes < 24 * 60 * 30) {
      return `${Math.floor(diffInMinutes / (60 * 24))} ngày trước`;
    } else if (diffInMinutes < 24 * 60 * 30 * 12) {
      return `${Math.floor(diffInMinutes / (60 * 24 * 30))} tháng trước`;
    } else {
      return `${Math.floor(diffInMinutes / (60 * 24 * 30 * 12))} năm trước`;
    }
  };

  const handleLike = async postId => {
    try {
      const userId = user.id;
      const response = await fetch(
        `https://sweets-bf2818fd7e8e.herokuapp.com/post/like/${postId}/${userId}`,
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

  // console.log(
  //   '>>>>>>>>>>>>>>>>>> 922222222',
  //   posts.map(post => post._id),
  // );

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.baiViet} key={postId._id}>
          {/* {console.log('>>>>>>>>>>>>>>>>>> 2511111', postId.name)} */}
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
          <Text style={[styles.lineHr, {marginTop: 10, height: 5}]} />
        </View>
      </View>
    </View>
  );
};

export default CommentScreen;
