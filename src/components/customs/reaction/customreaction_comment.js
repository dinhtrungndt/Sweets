/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

// css
import {styles} from '../style/reaction';
import {likeByPost} from '../../../services/home/homeService';
import {UserContext} from '../../../contexts/user/userContext';
import * as Animatable from 'react-native-animatable';

const Customreaction_Comment = ({reactions, clone, posts, reloadPosts}) => {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reaction, setReaction] = useState('');
  const [post, setPost] = useState(posts);
  const {user} = useContext(UserContext);

  const handlePress = reaction => {
    setSelectedReaction(reaction);
    setReaction(reaction.name);
    clone();
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
        reloadPosts();
      } else {
        console.error('Lỗi khi thay đổi trạng thái like:', response.message);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu API:', error);
    }
  };

  return (
    <Animatable.View
      animation="bounceIn"
      delay={reaction.id * 100}
      key={reaction.id}
      style={{flexDirection: 'row'}}>
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
    </Animatable.View>
  );
};

export default Customreaction_Comment;
