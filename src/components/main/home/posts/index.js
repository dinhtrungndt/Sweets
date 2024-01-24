/* eslint-disable prettier/prettier */
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

// styles
import {styles} from '../styles/posts';

// data
import {postsData} from '../data/posts';

// library
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const PostsScreen = () => {
  const [like, setLike] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleLike = () => {
    setLike(!like);
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

  return (
    <View style={styles.T}>
      <FlatList
        data={postsData}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            {/* header */}
            <View style={styles.container_avatar_name}>
              <View style={styles.avatar_name}>
                <TouchableOpacity>
                  <Image source={{uri: item.avatar}} style={styles.avatar} />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity>
                    <Text style={styles.name}>{item.name}</Text>
                  </TouchableOpacity>
                  <View style={styles.container_object}>
                    <Text style={styles.time}>{formatTime(item.createAt)}</Text>
                    <Text style={{paddingLeft: 5, fontSize: 6}}>●</Text>
                    <TouchableOpacity>
                      <Image
                        style={styles.icon_object}
                        source={require('../../../../assets/icon_posts_world.png')}
                      />
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
                <Text style={styles.content}>{item.content.slice(0, 100)}</Text>
              )}
              {/* Toggle button */}
              {item.content.length > 100 && (
                <TouchableOpacity
                  style={styles.showMore}
                  onPress={handleShowMore}>
                  <Text style={{color: 'blue'}}>
                    {showMore ? 'Ẩn' : 'Xem thêm'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {item.image ? (
              <Image source={item.image} style={styles.posts} />
            ) : (
              <View style={{height: 0}} />
            )}
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
                <TouchableOpacity style={styles.container_share}>
                  <Text style={styles.text_comment}>25</Text>
                  <Text style={[styles.text_comment, {paddingLeft: 5}]}>
                    Chia sẻ
                  </Text>
                </TouchableOpacity>
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
      />
    </View>
  );
};

export default PostsScreen;
