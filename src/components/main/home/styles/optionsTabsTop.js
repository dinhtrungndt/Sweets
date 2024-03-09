/* eslint-disable prettier/prettier */
import {Text} from 'react-native';
import React from 'react';

export const optionsTabsTop = ({route}) => {
  const reactions = route.params;
  const reactionTypes = reactions.reactions.map(item => item.type);

  const emotionColors = {
    AllFeeling: '#095fe5',
    LikeFeeling: '#095fe5',
    LoveFeeling: '#f02849',
    HahaFeeling: '#f7cb0a',
    WowFeeling: '#f7cb0a',
    angryFeeling: '#ff0000',
  };

  return {
    tabBarLabel: ({focused}) => {
      const color = focused ? emotionColors[route.name] : '#000';
      const label = getTabLabel(route.name, reactionTypes);
      return <Text style={{color}}>{label}</Text>;
    },
    tabBarIndicatorStyle: {
      backgroundColor: emotionColors[route.name],
    },
    tabBarStyle: {
      backgroundColor: '#fff',
      height: 40,
      width: '100%',
      justifyContent: 'center',
    },
  };
};

const getTabLabel = (routeName, reactionTypes) => {
  switch (routeName) {
    case 'AllFeeling':
      return 'Tất cả';
    case 'LikeFeeling':
      return reactionTypes.includes('Thích')
        ? '👍 ' + countReactions('Thích', reactionTypes)
        : null;
    case 'LoveFeeling':
      return reactionTypes.includes('Yêu thích')
        ? '❤ ' + countReactions('Yêu thích', reactionTypes)
        : null;
    case 'HahaFeeling':
      return reactionTypes.includes('Haha')
        ? '😂 ' + countReactions('Haha', reactionTypes)
        : null;
    case 'WowFeeling':
      return reactionTypes.includes('Wow')
        ? '😮 ' + countReactions('Wow', reactionTypes)
        : null;
    case 'angryFeeling':
      return reactionTypes.includes('Tức giận')
        ? '😡 ' + countReactions('Tức giận', reactionTypes)
        : null;
    default:
      return null;
  }
};

const countReactions = (type, reactionTypes) => {
  return reactionTypes.filter(reactionType => reactionType === type).length;
};
