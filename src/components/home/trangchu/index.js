/* eslint-disable prettier/prettier */
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {LoadingScreen} from '../../loading';

// Data
import {dataStory} from './data';
import {BaiVietData} from './data/baiviet';
import {getPosts} from '../homeService';

// StyleCss
import styles from './style/home';
import {UserContext} from '../../user/userContext';
import AddModal from './dropDown/addModal';

const TrangChuScreen = props => {
  const {navigation} = props;

  const {user} = useContext(UserContext);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const onGetPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      // Update isLiked property based on the data received
      const updatedPosts = res.flatMap(project =>
        project.posts.map(post => {
          const likedByCurrentUser = post.likedBy.includes(user.id);
          // console.log('>>>>>>>>>>>>>>>>>> 78', likedByCurrentUser);
          return {
            ...post,
            posts: [
              {
                ...post,
                isLiked: likedByCurrentUser,
              },
            ],
          };
        }),
      );
      setPosts(updatedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
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
        // Update the posts array with the new like count
        const updatedPosts = posts.map(post => {
          if (post._id === postId) {
            // console.log('>>>>>>>>>>>>>>>>>> 81', post.isLiked);
            return {
              ...post,
              isLiked: !post.isLiked, // Toggle the like status
              likedBy: post.isLiked
                ? post.likedBy.filter(id => id !== userId)
                : [...post.likedBy, userId],
            };
          }
          return post;
        });

        // Move log statement outside the map
        // console.log('>>>>>>>>>>>>>>>>>> 81', data.isLiked);

        console.log(
          '------------>>>>>>>>>>>>>>>>>> 106 Updated posts:',
          updatedPosts,
        ); // Log updated posts for debugging

        setPosts([...updatedPosts]);
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', data.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  const handleOnDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    onGetPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <View style={styles.T}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.textHeader}>𝓢𝔀𝓮𝓮𝓽𝓼</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.headerIconContainer}
              onPress={handleOnDropdown}>
              <Text style={{fontSize: 32, color: 'black', top: -5}}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerIconContainer, {marginLeft: 5}]}>
              <Image
                style={styles.headerIcon}
                source={require('../../../../media/image/icon_search.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headerIconContainer, {marginLeft: 5}]}>
              <Image
                style={styles.headerIcon}
                source={require('../../../../media/image/icon_chat.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* đường kẻ ngang*/}
        <Text style={styles.lineHr} />
        {/* Body */}
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          <View style={styles.avatar_content_image}>
            <TouchableOpacity>
              <Image
                style={[styles.avatar, {marginLeft: 5}]}
                source={require('../../../../media/image/avatar.jpg')}
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
                source={require('../../../../media/image/icon_image.png')}
              />
            </TouchableOpacity>
          </View>
          {/* anh-video-album-kyniem */}
          <View style={styles.pick_feelings}>
            <TouchableOpacity style={styles.boder_image}>
              <Image
                style={styles.avatar_icon_image}
                source={require('../../../../media/image/icon_image_pick.png')}
              />
              <Text style={{fontSize: 12, paddingLeft: 10}}>Ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boder_image}>
              <Image
                style={styles.avatar_icon_image}
                source={require('../../../../media/image/icon_video.png')}
              />
              <Text style={{fontSize: 12, paddingLeft: 10}}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boder_image}>
              <Image
                style={styles.avatar_icon_image}
                source={require('../../../../media/image/icon_album.png')}
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
                source={require('../../../../media/image/avatar.jpg')}
              />
              <View style={styles.view_addStory}>
                <Image
                  style={styles.add_story}
                  source={require('../../../../media/image/add_story.png')}
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
                  {console.log('>>>>>>>>>>>>>>>>>> 2511111', item.name)}
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
                          {Math.floor(
                            (new Date().getTime() -
                              new Date(item.time).getTime()) /
                              60000,
                          )}{' '}
                          phút trước
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.baiVietHeaderRight}>
                      <Image
                        style={styles.baiVietHeaderRightIcon}
                        source={require('../../../../media/image/icon_more.png')}
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
                        source={require('../../../../media/image/icon_delete.png')}
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
                  <View style={styles.baiVietImage}>
                    <Image
                      style={styles.baiVietImageImage}
                      source={{uri: item.image}}
                    />
                  </View>
                  <View style={styles.baiVietLikeComment}>
                    <View style={styles.baiVietLikeCommentLeft}>
                      <TouchableOpacity
                        onPress={() => handleLike(item._id)}
                        style={[
                          styles.baiVietLikeCommentLeftIcon,
                          {
                            flexDirection: 'row',
                            paddingLeft: 0,
                          },
                        ]}>
                        {item.isLiked ? (
                          <Image
                            style={styles.baiVietLikeCommentLeftIconImage}
                            source={require('../../../../media/image/icon_like_click.png')}
                          />
                        ) : (
                          <Image
                            style={styles.baiVietLikeCommentLeftIconImage}
                            source={require('../../../../media/image/icon_like.png')}
                          />
                        )}
                        <Text style={styles.baiVietLikeCommentRightText}>
                          {item.likedBy.length}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.baiVietLikeCommentLeftIcon}>
                      <Image
                        style={styles.baiVietLikeCommentRightIconImage}
                        source={require('../../../../media/image/icon_comment.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.baiVietLikeCommentRight}>
                      <Text style={styles.baiVietLikeCommentRightText}>
                        {item.comment} bình luận
                      </Text>
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

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => {
          setDropdownVisible(!isDropdownVisible);
        }}>
        <AddModal />
      </Modal>
    </>
  );
};

export default TrangChuScreen;
