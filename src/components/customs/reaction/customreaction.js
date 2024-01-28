/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

// css
import {styles} from '../style/reaction';

const CustomReaction = ({reactions, clone}) => {
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handlePress = reaction => {
    setSelectedReaction(reaction);
    console.log('Selected Reaction:', reaction.name);
    clone(reaction.name);
  };

  return (
    <View style={[{flexDirection: 'row'}, styles.cardContainer]}>
      {reactions.map(reaction => (
        <TouchableOpacity
          key={reaction.id}
          onPress={() => handlePress(reaction)}>
          <Text style={{fontSize: 20, marginRight: 10}}>
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
