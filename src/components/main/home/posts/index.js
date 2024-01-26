/* eslint-disable prettier/prettier */
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

// styles
import {styles} from '../styles/posts';

// data
import {postsData} from '../data/posts';
import {getMedia, getPosts} from '../../../../services/home/homeService';

// library
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import Video from 'react-native-video';
// import Carousel, {Pagination} from 'react-native-snap-carousel';

const PostsScreen = ({posts, media, share}) => {
  const [like, setLike] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderMediaItem = ({item}) => {
    if (item.type === 'image') {
      return (
        <Image key={item._id} source={{uri: item.url}} style={styles.posts} />
      );
    } else if (item.type === 'video') {
      return (
        <Video
          key={item._id}
          source={{uri: item.url}}
          style={styles.posts}
          controls
        />
      );
    }
    return null;
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

  const handleLike = () => {};

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
            {/* <Carousel
              data={media.filter(mediaItem => mediaItem.idPosts === item._id)}
              renderItem={renderMediaItem}
              sliderWidth={300}
              itemWidth={300}
              onSnapToItem={index => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={
                media.filter(mediaItem => mediaItem.idPosts === item._id).length
              }
              activeDotIndex={activeSlide}
              containerStyle={{marginTop: -15}}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.92)',
              }}
              inactiveDotStyle={
                // Optional: Customize inactive dot style
                {
                  // Define styles for inactive dots here
                }
              }
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            /> */}
            {/* feeling */}
            <View style={styles.container_feeling_commnet_share}>
              {/* feeling */}
              <TouchableOpacity style={styles.container_feeling}>
                <View style={styles.feeling}>
                  <Image
                    style={styles.icon_Like_Feeling}
                    source={require('../../../../assets/icon_like_feeling.png')}
                  />
                </View>
                <Text style={styles.text_feeling}>211</Text>
              </TouchableOpacity>
              {/* comment vs share */}
              <View style={styles.comment_share}>
                {/* comment */}
                <TouchableOpacity style={styles.container_comment}>
                  <Text style={styles.text_comment}>211</Text>
                  <Text style={[styles.text_comment, {paddingLeft: 5}]}>
                    bình luận
                  </Text>
                </TouchableOpacity>
                {/* share */}
                {console.log('>>>>>>>>>>>>> 2199999 ----- ', share)}
                {share && share.data ? (
                  <TouchableOpacity style={styles.container_share}>
                    <Text style={styles.text_share}>{share.data.length}</Text>
                    <Text style={[styles.text_share, {paddingLeft: 5}]}>
                      Chia sẻ
                    </Text>
                    {console.log('>>>>>>>> 180000', share)}
                  </TouchableOpacity>
                ) : (
                  <View style={{height: 0}} />
                )}
              </View>
            </View>

            {/* line */}
            <Text style={styles.linePosts} />
            {/* like comment share */}
            <View style={styles.container_like_comment_share}>
              {/* like */}
              <TouchableOpacity style={styles.like_post} onPress={handleLike}>
                <AntDesign
                  name={like ? 'like1' : 'like2'}
                  size={20}
                  color={like ? '#22b6c0' : '#666666'}
                />
                <Text
                  style={[
                    styles.text_like_post,
                    {color: like ? '#22b6c0' : '#666666'},
                  ]}>
                  Thích
                </Text>
              </TouchableOpacity>

              {/* comment */}
              <TouchableOpacity style={styles.like_post}>
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
