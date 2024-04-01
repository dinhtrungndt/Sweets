/* eslint-disable prettier/prettier */
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../../../../../../../contexts/user/userContext';

const HahaFeeling = ({route}) => {
  const reactions = route.params.reactions;
  const hahaReactions = reactions.filter(item => item.type === 'Haha');
  const {user} = useContext(UserContext);

  const getAvatar = avatar => {
    if (avatar === 'default') {
      return require('../../../../../../../assets/account.png');
    }
    return {uri: avatar};
  };

  const getIcon = type => {
    switch (type) {
      case 'Thích':
        return '👍';
      case 'Yêu thích':
        return '❤';
      case 'Haha':
        return '😂';
      case 'Wow':
        return '😮';
      case 'Buồn':
        return '😔';
      case 'Tức giận':
        return '😡';
      default:
        return '';
    }
  };

  return (
    <View style={styles.T}>
      <FlatList
        data={hahaReactions}
        renderItem={({item}) => (
          <View style={styles.container_reaction}>
            <Text style={styles.typeIcon}>{getIcon(item.type)}</Text>
            <Image
              style={styles.avatar}
              source={getAvatar(item.idUsers.avatar)}
            />
            {item.idUsers._id === user.user._id ? (
              <Text style={styles.name_reaction_id}>Bạn</Text>
            ) : (
              <Text style={styles.name}>{item.idUsers.name}</Text>
            )}
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

export default HahaFeeling;

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
  name_reaction_id: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});
