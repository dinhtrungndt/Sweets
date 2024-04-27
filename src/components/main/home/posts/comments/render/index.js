import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// styles
import {styles} from '../../../styles/comments';

const RenderComment = ({
  comment,
  handleLikeComments,
  showDialogDelete,
  reloadComments,
  setParentUserName,
  setCommentContent,
  setParentId,
}) => {
  // console.log('RenderComment', comment);
  const renderChildComments = childComments => {
    return childComments.map((childComment, index) => (
      <View
        key={index}
        style={{
          borderLeftWidth: 2,
          borderColor: '#c6c6c6',
          borderBottomLeftRadius: 50,
        }}>
        <RenderComment
          comment={childComment}
          showDialogDelete={showDialogDelete}
        />
      </View>
    ));
  };

  return (
    <View>
      {/* Bình luận cha */}
      <View style={styles.container_comment}>
        <Pressable
          onLongPress={() => showDialogDelete(item._id)}
          style={styles.container_comment_header}>
          <Image
            style={styles.avatar_comment}
            source={{uri: item.idUsers?.avatar}}
          />
          <View style={styles.container_comment_content}>
            <View
              style={
                item?.content !== ''
                  ? styles.comment_content
                  : {backgroundColor: '#fff'}
              }>
              <Text style={styles.name_comment}>{item.idUsers?.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#1b9e9a',
                      paddingRight: 5,
                    }}>
                    {item.parentUserName}
                  </Text>
                </TouchableOpacity>
                {item?.content && (
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#000',
                        width: '70%',
                      }}>
                      {item.content}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {item?.image && item?.image.length > 0 && (
              <View style={styles.container_image_camera}>
                {item.image.map((image, imageIndex) => {
                  if (isImage(image)) {
                    return (
                      <TouchableOpacity
                        key={imageIndex}
                        onPress={() => handleShowMoreImage(image)}>
                        <Image
                          source={{uri: image}}
                          style={styles.content_image}
                        />
                      </TouchableOpacity>
                    );
                  } else if (isVideo(image)) {
                    return (
                      <TouchableOpacity
                        key={imageIndex}
                        onPress={() => handleShowMoreImage(image)}>
                        <VideoPlayer
                          video={{uri: image}}
                          videoWidth={1600}
                          videoHeight={900}
                          thumbnail={require('../../../../../../assets/play_96px.png')}
                          style={styles.content_video}
                        />
                      </TouchableOpacity>
                    );
                  } else {
                    return null;
                  }
                })}
              </View>
            )}
            <View style={styles.comment_time_like}>
              <Text style={styles.time_comment}>
                {formatTime(item.createAt)}
              </Text>
              <TouchableOpacity
                style={styles.like_like_comment}
                onPress={() => handleLikeComments(item._id)}
                onLongPress={() => handleReaction.current.handleLongPress()}>
                {isUserReacted(item.reaction, user.user._id) ? (
                  <Text style={[styles.like_like_comment, {color: '#22b6c0'}]}>
                    Thích
                  </Text>
                ) : (
                  <Text style={styles.like_like_comment}>Thích</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.like_like_comment}
                onPress={() => {
                  setParentId(item._id), setParentUserName(item.idUsers.name);
                }}>
                <Text style={styles.like_like_comment}>Phản hồi</Text>
              </TouchableOpacity>
              {item.reaction && item.reaction.length > 0 && (
                <View style={styles.like_like_comment}>
                  <Text style={styles.like_like_comment}>
                    {item.reaction.length} lượt thích
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </View>

      {/* Bình luận con */}
      {comment.idParent !== null && (
        <View style={{paddingLeft: 15}}>
          <View
            style={{
              borderLeftWidth: 2,
              borderColor: '#c6c6c6',
              borderBottomLeftRadius: 50,
            }}
            key={subIndex}>
            <Pressable
              onLongPress={() => {
                showDialogDelete(subItem._id), setParentId(subItem._id);
              }}
              style={[styles.container_comment_body, styles.childComment]}>
              <Image
                style={[styles.avatar_comment, {width: 30, height: 30}]}
                source={
                  subItem.idUsers?.avatar === '' ||
                  subItem.idUsers?.avatar === null ||
                  subItem.idUsers?.avatar === undefined ||
                  subItem.idUsers?.avatar === 'default' ||
                  subItem.idUsers?.avatar === 'null'
                    ? require('../../../../../../assets/account.png')
                    : {uri: subItem.idUsers?.avatar}
                }
              />
              <View style={styles.container_comment_content}>
                <View
                  style={
                    subItem?.content !== ''
                      ? styles.comment_content
                      : {backgroundColor: '#fff'}
                  }>
                  <Text style={styles.name_comment}>
                    {subItem.idUsers?.name}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    {subItem.idUsers.name !== user.user.name ? (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('OtherUserA', {
                            account: subItem,
                          })
                        }>
                        <Text
                          style={{
                            color: '#1b9e9a',
                            paddingRight: 5,
                          }}>
                          {subItem.parentUserName}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Profile', {
                            account: subItem,
                          })
                        }>
                        <Text
                          style={{
                            color: '#1b9e9a',
                            paddingRight: 5,
                          }}>
                          {subItem.parentUserName}
                        </Text>
                      </TouchableOpacity>
                    )}
                    {subItem?.content && (
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#000',
                            width: '70%',
                          }}>
                          {subItem.content}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {subItem?.image && subItem?.image.length > 0 && (
                  <View style={styles.container_image_camera}>
                    {subItem.image.map((image, imageIndex) => {
                      if (isImage(image)) {
                        return (
                          <TouchableOpacity
                            key={imageIndex}
                            onPress={() => handleShowMoreImage(image)}>
                            <Image
                              source={{uri: image}}
                              style={styles.content_image}
                            />
                          </TouchableOpacity>
                        );
                      } else if (isVideo(image)) {
                        return (
                          <TouchableOpacity
                            key={imageIndex}
                            onPress={() => handleShowMoreImage(image)}>
                            <VideoPlayer
                              video={{uri: image}}
                              videoWidth={1600}
                              videoHeight={900}
                              thumbnail={require('../../../../../../assets/play_96px.png')}
                              style={styles.content_video}
                            />
                          </TouchableOpacity>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </View>
                )}
                <View style={styles.comment_time_like}>
                  <Text style={styles.time_comment}>
                    {formatTime(subItem.createAt)}
                  </Text>
                  <TouchableOpacity
                    style={styles.like_like_comment}
                    onPress={() => handleLikeComments(subItem._id)}
                    onLongPress={() =>
                      handleReaction.current.handleLongPress()
                    }>
                    {isUserReacted(subItem.reaction, user.user._id) ? (
                      <Text
                        style={[styles.like_like_comment, {color: '#22b6c0'}]}>
                        Thích
                      </Text>
                    ) : (
                      <Text style={styles.like_like_comment}>Thích</Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.like_like_comment}
                    onPress={() => {
                      setParentId(subItem._id);
                      setParentUserName(subItem.idUsers.name);
                    }}>
                    <Text style={styles.like_like_comment}>Phản hồi</Text>
                  </TouchableOpacity>
                  {subItem.reaction && subItem.reaction.length > 0 && (
                    <View style={styles.like_like_comment}>
                      <Text style={styles.like_like_comment}>
                        {subItem.reaction.length} lượt thích
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      )}

      {/* Bình luận cháu */}
      {comment.childComments && comment.childComments.length > 0 && (
        <View style={{paddingLeft: 30}}>
          {renderChildComments(comment.childComments)}
        </View>
      )}
    </View>
  );
};

export default RenderComment;
