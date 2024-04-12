import { Text, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { getPostByUserId } from '../../../../../services/user/userService';
import { getMedia } from '../../../../../services/home/homeService';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';
import VideoPlayer from 'react-native-video-player';
// styles
import { styles } from '../style/imgOtherScreen'

const ImgOtherScreen = ({ navigation, route }) => {
  const { account } = route.params;
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const onGetPosts = async () => {
      try {
        const res = await getPostByUserId(account.idUsers._id);
        console.log('>>>>>>>>> res', res);
        const postsWithMedia = await Promise.all(
          res.map(async post => {
            const mediaResponse = await getMedia(post._id);
            const media = mediaResponse;
            return {
              ...post,
              media,
            };
          }),
        );
        setPosts(postsWithMedia);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    onGetPosts();
  }, [account.idUsers._id]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.containner}>
        {item.media.length > 0 ? (
            <Swiper
              showsButtons={false}
              loop={false}
              paginationStyle={{ bottom: 10 }}
              activeDotColor="#22b6c0">
              {item.media.map((media, index) => (
                <View key={index}>
                  {media.type === 'image' ? (
                    <Image source={{ uri: media.url[0] }} style={styles.posts} />
                  ) : (
                    <VideoPlayer
                      video={{ uri: media.url[0] }}
                      videoWidth={1600}
                      videoHeight={900}
                      thumbnail={{ uri: media.url[0] }}
                      style={styles.posts}
                    />
                  )}
                </View>
              ))}
            </Swiper>
        ) : (
          <View style={{ height: 0 }} />
        )}
      </View>
    )
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.txt1}>{t('myPhotosAndVideos')}</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />
    </View>
  )
}

export default ImgOtherScreen