/* eslint-disable prettier/prettier */
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoveFeeling = ({route}) => {
  const reactions = route.params.reactions;
  const loveReactions = reactions.filter(item => item.type === 'Love');

  const getAvatar = avatar => {
    if (avatar === 'default') {
      return require('../../../../../../../assets/account.png');
    }
    return {uri: avatar};
  };

  const getIcon = type => {
    switch (type) {
      case 'Like':
        return '👍';
      case 'Love':
        return '❤';
      case 'Haha':
        return '😂';
      case 'Wow':
        return '😮';
      default:
        return '';
    }
  };

  return (
    <View style={styles.T}>
      <FlatList
        data={loveReactions}
        renderItem={({item}) => (
          <View style={styles.container_reaction}>
            <Text style={styles.typeIcon}>{getIcon(item.type)}</Text>
            <Image
              style={styles.avatar}
              source={getAvatar(item.idUsers.avatar)}
            />
            <Text style={styles.name}>{item.idUsers.name}</Text>
          </View>
        )}
        keyExtractor={item => item._id}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={3000}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default LoveFeeling;

const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
  },
  container_reaction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 20,
  },
  name: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  typeIcon: {
    position: 'absolute',
    left: 25,
    top: 19,
    fontSize: 16,
    color: '#000',
    zIndex: 1,
  },
});
