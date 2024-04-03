import { Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../../../contexts/user/userContext'
import { getPostByUserId } from '../../../../../services/user/userService'
import mockPosts from '../data/mockPosts'
// styles
import { styles } from '../style/postOtherScreen'

const PostOtherScreen = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const idUsers = user.user._id;
  //       const res = await getPostByUserId(idUsers);
  //       setPosts(res);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const renderPostItem = ({ item, index }) => (
    <View key={index} style={styles.postContainer}>
      <View style={styles.container_avatar_name}>
        <TouchableOpacity style={styles.container_avatar_name2}>
          <Image style={styles.avatar} source={require('../../../../../assets/avatar.png')} />
          <Text style={styles.name}>{item.idUsers.name}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <Image style={styles.postImage} source={{ uri: item.image }} />
      <View style={styles.postAction}>
        <TouchableOpacity style={styles.postActionItem}>
          <Image style={styles.postActionIcon} source={require('../../../../../assets/icon_like.png')} />
          <Text style={styles.postActionText}>Thích</Text>
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
        <Text style={styles.text2}>Sống tại</Text>
        <Text style={styles.text3}>Hồ Chí Minh</Text>
      </View>
      <View style={styles.detailContainer}>
        <Image style={styles.imgIcon} source={require('../../../../../assets/icon_location.png')} />
        <Text style={styles.text2}>Đến từ</Text>
        <Text style={styles.text3}>Đăk Mil, Đăk Nông</Text>
      </View>
      <View style={styles.detailContainer}>
        <Image style={styles.imgIcon} source={require('../../../../../assets/icon_more.png')} />
        <Text style={styles.text2}>Xem thông tin giới thiệu bản thân</Text>
      </View>
      <TouchableOpacity style={styles.BtnEditDetail}>
        <Text style={styles.text4}>Chỉnh sửa chi tiết công khai</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={['header', ...posts]} // Dữ liệu bao gồm cả header và danh sách bài viết
      keyExtractor={(item, index) => index.toString()} // Khóa mỗi item là index của nó
      renderItem={({ item }) => item === 'header' ? header : renderPostItem({ item })} // Render header hoặc item bài viết
    />
  )
}

export default PostOtherScreen
