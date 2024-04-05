import { Text, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../../../contexts/user/userContext'
// styles
import { styles } from '../style/imgScreen'
import { getMedia } from '../../../../../services/home/homeService';

const ImgScreen = () => {
  const { user } = useContext(UserContext);
  const [images, setImages] = useState([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const idUsers = user.user._id;
  //       const res = await getMedia(idUsers);
  //       setImages(res);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const renderImg = ({ item }) => {
    return (
      <View style={styles.imgFrame}>
        <Image
          style={styles.img}
          source={{ uri: item.url }}
        />
      </View>
    );
  };

  return (
    <View style={styles.body}>
      <Text style={styles.txt1}>Ảnh và video của tôi</Text>
      <FlatList
        data={images}
        renderItem={renderImg}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};

export default ImgScreen;
