/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

// css
import {styles} from '../style/reaction';
import {likeByPost} from '../../../services/home/homeService';
import {UserContext} from '../../../contexts/user/userContext';

const CustomReaction = ({reactions, clone, posts}) => {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reaction, setReaction] = useState('');
  const [post, setPost] = useState(posts);
  const {user} = useContext(UserContext);

  const handlePress = reaction => {
    setSelectedReaction(reaction);
    setReaction(reaction.name);
  };

  // console.log(
  //   '??>>>>>>>>>>>>>>>>>>.:',
  //   post.reaction.map(item => item.idUsers._id),
  // );
  // console.log('??>>>>>>>>>>>>>>>>>>. đã chọn :', reaction);

  const handleSelectReaction = async (idPosts, reactionType) => {
    try {
      const idUsers = user.id;
      const type = reactionType;
      const response = await likeByPost(idUsers, idPosts, type);
      if (response.status === 1) {
        let updatedPosts = [];
        if (Array.isArray(posts)) {
          updatedPosts = posts.map(post => {
            if (post._id === idPosts) {
              const updatedReaction = post.reaction.map(reactionItem => {
                if (reactionItem.idUsers[0]._id.join() === user.id) {
                  return {...reactionItem, type: reactionType};
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
        } else {
          updatedPosts = [posts];
        }
        setPost(updatedPosts);
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', response.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  return (
    <View style={[{flexDirection: 'row'}, styles.cardContainer]}>
      {reactions.map(reaction => (
        <TouchableOpacity
          key={reaction.id}
          onPress={() => {
            handlePress(reaction);
            handleSelectReaction(posts._id, reaction.name);
          }}>
          <Text style={{fontSize: 30, marginRight: 10, color: '#000'}}>
            {selectedReaction && selectedReaction.id === reaction.id
              ? reaction.emoji
              : reaction.emoji}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomReaction;
