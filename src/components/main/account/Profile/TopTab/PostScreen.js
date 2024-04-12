import { Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../../../contexts/user/userContext'
import { getPostByUserId } from '../../../../../services/user/userService'
import moment from 'moment'
import Swiper from 'react-native-swiper';
import VideoPlayer from 'react-native-video-player';
// styles
import { styles } from '../style/postScreen'
import { getComments, getMedia, getReaction, getShare, likeByPost } from '../../../../../services/home/homeService'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useTranslation } from 'react-i18next'

const PostScreenAccount = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();

  // console.log(">>>>>>>>>>>. postssss", posts)

  const onGetPosts = async () => {
    try {
      const res = await getPostByUserId(user.user._id);
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
                return { ...reactionItem, type: 'Thích' };
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
        console.log('postsposts:', updatedPosts);

        setPosts(updatedPosts);
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', response.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  useEffect(() => {
    onGetPosts();
  }, []);

  const getTimeDifference = (createdAt) => {
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


  const renderPostItem = ({ item, index }) => (
    <View key={index} style={styles.postContainer}>
      <View style={styles.container_avatar_name}>
        <TouchableOpacity style={styles.container_avatar_name2}>
          <Image
            style={styles.avatar}
            source={
              user && user.user.avatar
                ? { uri: user.user.avatar }
                : require('../../../../../assets/account.png')
            }
          />
          <Text style={styles.name}>{item.idUsers.name}</Text>
          <Text style={styles.time}>{getTimeDifference(item.createAt)}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      {/* {item.image && <Image style={styles.postImage} source={{ uri: item.media }} />} */}
      {/* media */}
      {item.media.length > 0 ? (
        <View style={styles.container_media}>
          <Swiper
            style={styles.swiper}
            showsButtons={false}
            loop={false}
            paginationStyle={{ bottom: 10 }}
            activeDotColor="#22b6c0"
            onIndexChanged={index => setActiveSlide(index)}>
            {item.media?.map((media, index) => (
              <View key={media._id}>
                {media.type === 'image' ? (
                  <>
                    <Image
                      source={{ uri: media.url.join() }}
                      style={styles.posts}
                    />
                  </>
                ) : (
                  <VideoPlayer
                    video={{ uri: media.url[0] }}
                    videoWidth={1600}
                    videoHeight={900}
                    thumbnail={{ uri: media.url[0] }}
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
        <View style={{ height: 0 }} />
      )}

      <View style={styles.postAction}>
        <TouchableOpacity style={styles.postActionItem} onPress={() => handleLike(item._id)}>
          {item.reaction.find(reactionItem => reactionItem.idUsers._id === user.user._id && reactionItem.type === 'Thích') ? (
            <>
              <AntDesign name="like1" size={20} color="#22b6c0" />
              <Text style={[styles.text_like_post, { color: '#22b6c0' }]}>Thích</Text>
            </>
          ) : (
            <>
              <AntDesign name="like1" size={20} color="#666666" />
              <Text style={[styles.text_like_post, { color: '#666666' }]}>Thích</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.postActionItem}>
          <Image style={styles.postActionIcon} source={require('../../../../../assets/icon_comment.png')} />
          <Text style={styles.postActionText}>Bình luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postActionItem}>
          <Image style={styles.postActionIcon} source={require('../../../../../assets/icon_share.png')} />
          <Text style={styles.postActionText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const header = (
    <View style={styles.container}>
      <Text style={styles.text1}>Chi tiết</Text>
      <View style={styles.detailContainer}>
        <Image style={styles.imgIcon} source={require('../../../../../assets/icon_home_30.png')} />
        <Text style={styles.text2}>{t('liveIn')}</Text>
        <Text style={styles.text3}>Hồ Chí Minh</Text>
      </View>
      <View style={styles.detailContainer}>
        <Image style={styles.imgIcon} source={require('../../../../../assets/icon_location_64.png')} />
        <Text style={styles.text2}>{t('from')}</Text>
        <Text style={styles.text3}>Đăk Mil, Đăk Nông</Text>
      </View>
      <View style={styles.detailContainer}>
        <Image style={styles.imgIcon} source={require('../../../../../assets/icon_more.png')} />
        <Text style={styles.text2}>{t('viewIntro')}</Text>
      </View>
      <TouchableOpacity style={styles.BtnEditDetail}>
        <Text style={styles.text4}>{t('editPublicDetails')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList style={styles.body}
      data={['header', ...posts]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => item === 'header' ? header : renderPostItem({ item })}
    />
  )
}

export default PostScreenAccount

