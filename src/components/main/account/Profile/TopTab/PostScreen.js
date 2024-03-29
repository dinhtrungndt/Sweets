import { Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../../../contexts/user/userContext'
import { getPostByUserId } from '../../../../../services/user/userService'

// styles
import { styles } from '../style/postScreen'

const PostScreen = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPostByUserId(user.user._id);
        console.log('Response:', res); // In ra để kiểm tra giá trị của res
        setPosts(res);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Text style={styles.text1}>Chi tiết</Text>
        <View style={styles.detailContainer}>
          <Image style={styles.imgIcon} source={require('../../../../../assets/icon_home_30.png')} />
          <Text style={styles.text2}>Sống tại</Text>
          <Text style={styles.text3}>Hà Nội</Text>
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

      <FlatList
        data={posts} // Dữ liệu là danh sách bài viết
        keyExtractor={(item) => item._id} // Khóa mỗi item là _id của bài viết
        renderItem={({ item }) => (
          <View>
            {/* Hiển thị mỗi bài viết, bạn có thể sử dụng component PostsScreen ở đây nếu cần */}
          </View>
        )}
      />

    </View>
  )
}

export default PostScreen