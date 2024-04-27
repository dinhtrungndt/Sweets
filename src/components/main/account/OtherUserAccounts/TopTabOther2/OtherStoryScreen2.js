import { View, Text, Image, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { getPostByUserId } from '../../../../../services/user/userService'
import moment from 'moment'
import VideoPlayer from 'react-native-video-player';
import { getComments, getMedia, getReaction, getShare, likeByPost } from '../../../../../services/home/homeService'
import { useTranslation } from 'react-i18next'
// styles
import { styles } from '../style/otherStoryScreen'

const OtherStoryScreen2 = ({ navigation, route }) => {
  const { account } = route.params;
  const [story, setStory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const onGetStory = async () => {
      try {
        const res = await getPostByUserId(account._id);
        const storyPosts = res.filter(post => post.idTypePosts.name === 'Story');
        const postsWithMedia = await Promise.all(
          storyPosts.map(async post => {
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
        setStory(postsWithMedia);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    onGetStory();
  }, [account?._id]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.containner}>
        {item.media.length === 0 && (
          <View style={styles.containerText}>
            <Text style={styles.txtContent}>{item.content}</Text>
          </View>
        )}
        {item.media.map((media, index) => (
          <TouchableOpacity key={index} onPress={() => { setSelectedImage(media.url[0]); setModalVisible(true); }}>
            {media.type === 'image' ? (
              <Image source={{ uri: media.url[0] }} style={styles.posts} />
            ) : (
              <VideoPlayer
                video={{ uri: media.url[0] }}
                videoWidth={Dimensions.get('window').width / 3}
                videoHeight={(Dimensions.get('window').width / 3) * (9 / 16)}
                thumbnail={{ uri: media.url[0] }}
                style={styles.posts}
              />
            )}
            {item.content !== "upload" && (
              <View style={styles.containerText}>
                <Text style={styles.txtContent}>{item.content}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    )
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={story}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.containnerModal}>
          <Image source={{ uri: selectedImage }} style={styles.imgModal} resizeMode="contain" />
          <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={() => setModalVisible(false)}>
            <Text style={styles.txtModal}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default OtherStoryScreen2