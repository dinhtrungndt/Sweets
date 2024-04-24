/* eslint-disable prettier/prettier */
import {
  FlatList,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

// styles
import {styles} from '../../styles/posts';

// library
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import CustomReaction from '../../../../customs/reaction/customreaction';
import VideoPlayer from 'react-native-video-player';
import {UserContext} from '../../../../../contexts/user/userContext';
import {
  deletePostsAccount,
  getBackgroundColor,
  getComments,
  getMedia,
  getPosts,
  getPostsBirthday,
  getReaction,
  getShare,
  getShareDetailObject,
  likeByPost,
} from '../../../../../services/home/homeService';
import Share from 'react-native-share';
import {useLinkTo} from '@react-navigation/native';

const CreateAtPosts = ({
  item,
  navigation,
  handleModalEditPostsAccount,
  handleModalEditPostsGuest,
  handleShareModal,
  handleReaction,
  isUserReacted,
  reactions,
  getFeelingIcon,
  ColorTextLikePost,
  getUniqueReactions,
  handleLike,
  changeIdObject,
  formatTime,
  showMore,
  handleShowMore,
  activeSlide,
  setActiveSlide,
  showLengthMedia,
  setShowLengthMedia,
  selectedPostId,
  reaction,
}) => {
  const {user} = useContext(UserContext);

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.container_avatar_name}>
        <View style={styles.avatar_name}>
          {item.idUsers._id !== user.user._id ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OtherUserA', {
                  account: item,
                })
              }>
              <Image
                source={{uri: item.idUsers?.avatar}}
                style={styles.avatar}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Profile', {
                  account: item,
                })
              }>
              <Image
                source={{uri: item.idUsers?.avatar}}
                style={styles.avatar}
              />
            </TouchableOpacity>
          )}
          <View>
            {item.idUsers._id !== user.user._id ? (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('OtherUserA', {
                        account: item,
                      })
                    }>
                    <Text style={styles.name}>{item.idUsers?.name}</Text>
                  </TouchableOpacity>
                  {item.taggedFriends === null ? (
                    <View />
                  ) : (
                    <>
                      {item.taggedFriends._id === user.user._id ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '50%',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                            }}>
                            {' '}
                            cùng với
                          </Text>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                            onPress={() =>
                              navigation.navigate('Profile', {
                                accountzzz: item.taggedFriends,
                              })
                            }>
                            <Text
                              style={[
                                styles.name,
                                {color: '#22b6c0', marginLeft: 5},
                              ]}>
                              {item.taggedFriends.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '50%',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                            }}>
                            {' '}
                            cùng với
                          </Text>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                            onPress={() =>
                              navigation.navigate('OtherUserA2', {
                                accountzzz: item.taggedFriends,
                              })
                            }>
                            <Text
                              style={[
                                styles.name,
                                {color: '#22b6c0', marginLeft: 5},
                              ]}>
                              {item.taggedFriends.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  )}
                </View>
                {item.location === null ? (
                  <View />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 6,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                      }}>
                      {' '}
                      đang ở tại
                    </Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          styles.name,
                          {color: '#22b6c0', marginLeft: 5},
                        ]}>
                        {item.location}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Profile', {
                        account: item,
                      })
                    }>
                    <Text style={styles.name}>{item.idUsers?.name}</Text>
                  </TouchableOpacity>
                  {item.taggedFriends === null ? (
                    <View />
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '50%',
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                        }}>
                        {' '}
                        cùng với
                      </Text>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          navigation.navigate('OtherUserA2', {
                            accountzzz: item.taggedFriends,
                          })
                        }>
                        <Text
                          style={[
                            styles.name,
                            {color: '#22b6c0', marginLeft: 5},
                          ]}>
                          {item.taggedFriends.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                {item.location === null ? (
                  <View />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 6,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                      }}>
                      {' '}
                      đang ở tại
                    </Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          styles.name,
                          {color: '#22b6c0', marginLeft: 5},
                        ]}>
                        {item.location}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
            <View style={styles.container_object}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CommentsScreen', {
                    postId: item,
                  })
                }>
                <Text style={styles.time}>{formatTime(item.createAt)}</Text>
              </TouchableOpacity>
              <Text style={{paddingLeft: 5, fontSize: 6}}>●</Text>
              <TouchableOpacity>
                {item.idObject ? changeIdObject(item.idObject) : null}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {item.idUsers._id !== user.user._id ? (
          <TouchableOpacity onPress={() => handleModalEditPostsGuest(item)}>
            <Entypo name="dots-three-horizontal" size={18} color="#666666" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleModalEditPostsAccount(item)}>
            <Entypo name="dots-three-horizontal" size={18} color="#666666" />
          </TouchableOpacity>
        )}
      </View>
      {/* content */}
      {item.content === '' ? (
        <></>
      ) : (
        <View style={styles.baiVietContent}>
          {showMore ? (
            <>
              {item?.color?.map(color => color.colors)[0] !== undefined ? (
                <Text
                  style={[
                    styles.content,
                    {
                      backgroundColor: item.color.map(color => color.colors)[0],
                      borderRadius: 16,
                      padding: 16,
                    },
                  ]}>
                  {item.content}
                </Text>
              ) : (
                <Text style={styles.content}>{item.content}</Text>
              )}
            </>
          ) : (
            <>
              {item?.color?.map(color => color.colors)[0] !== undefined ? (
                <Text
                  style={[
                    styles.content,
                    {
                      backgroundColor: item.color.map(color => color.colors)[0],
                      borderRadius: 16,
                      padding: 16,
                    },
                  ]}>
                  {item.content?.slice(0, 100)}
                </Text>
              ) : (
                <Text style={styles.content}>
                  {item.content?.slice(0, 100)}
                </Text>
              )}
            </>
          )}
          {/* Toggle button */}
          {item.content && item.content.length > 100 && (
            <TouchableOpacity style={styles.showMore} onPress={handleShowMore}>
              <Text style={{color: 'blue'}}>
                {showMore ? 'Ẩn' : 'Xem thêm'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* media */}
      {item.media.length > 0 ? (
        <View style={styles.container_media}>
          <Swiper
            style={styles.swiper}
            showsButtons={false}
            loop={false}
            paginationStyle={{bottom: 10}}
            activeDotColor="#22b6c0"
            onIndexChanged={index => setActiveSlide(index)}>
            {item.media?.map((media, index) => (
              <View key={media._id}>
                {media.type === 'image' ? (
                  <>
                    <Image
                      source={{uri: media.url.join()}}
                      style={styles.posts}
                    />
                  </>
                ) : (
                  <VideoPlayer
                    video={{uri: media.url[0]}}
                    videoWidth={1600}
                    videoHeight={900}
                    thumbnail={require('../../../../../assets/play_96px.png')}
                    // autoplay={true}
                    style={styles.posts}
                  />
                )}
                {showLengthMedia ? (
                  <View style={styles.imageCountContainer}>
                    <Text style={styles.imageCountText}>
                      {index + 1}/{item.media.length}
                    </Text>
                  </View>
                ) : null}
              </View>
            ))}
          </Swiper>
        </View>
      ) : (
        <View style={{height: 0}} />
      )}

      {/* feeling */}
      {item.reaction.length > 0 ||
      item.comment.length > 0 ||
      item.share.length > 0 ? (
        <View style={styles.container_feeling_commnet_share}>
          {/* feeling */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CommentsScreen', {
                postId: item,
              })
            }
            style={styles.container_feeling}>
            {getUniqueReactions(item.reaction).map((reaction, index) => (
              <View
                key={index}
                style={[
                  styles.feeling,
                  {
                    marginLeft: index === 0,
                  },
                ]}>
                {index < 2 && (
                  <Image
                    style={[
                      reaction.type === 'Haha' ||
                      reaction.type === 'Wow' ||
                      reaction.type === 'Buồn' ||
                      reaction.type === 'Tức giận'
                        ? {width: 22, height: 22}
                        : styles.icon_Like_Feeling,
                      ,
                    ]}
                    source={getFeelingIcon(reaction.type)}
                  />
                )}
              </View>
            ))}

            {item.reaction.length === 0 ? (
              <Text />
            ) : (
              <>
                {item.reaction.length <= 2 ? (
                  <Text style={styles.text_feeling}>
                    {item.reaction.length}
                  </Text>
                ) : (
                  <Text style={styles.text_feeling2}>
                    {item.reaction.length}
                  </Text>
                )}
              </>
            )}
          </TouchableOpacity>

          {/* comment vs share */}
          <View style={styles.comment_share}>
            {/* comment */}
            {item.comment.length > 0 ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CommentsScreen', {
                    postId: item,
                  })
                }
                style={styles.container_comment}>
                <Text style={styles.text_comment}>{item.comment.length}</Text>
                <Text style={[styles.text_comment, {paddingLeft: 5}]}>
                  Bình luận
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{height: 0}} />
            )}
            {/* share */}
            {item.share.length > 0 ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CommentsScreen', {
                    postId: item,
                  })
                }
                style={styles.container_share}>
                <Text style={styles.text_share}>{item.share.length}</Text>
                <Text style={[styles.text_share, {paddingLeft: 5}]}>
                  Chia sẻ
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{height: 0}} />
            )}
          </View>
        </View>
      ) : (
        <View style={{height: 0}} />
      )}

      {/* line */}
      <Text style={styles.linePosts} />
      {/* like comment share 2 */}
      <View style={styles.container_like_comment_share}>
        {/* like */}
        <TouchableOpacity
          style={styles.like_post}
          onPress={() => handleLike(item._id)}
          onLongPress={() => handleReaction.current.handleLongPress(item._id)}>
          {isUserReacted(item.reaction, user.user._id) ? (
            <>
              {item.reaction
                .filter(reaction => reaction.idUsers._id === user.user._id)
                .map(reaction => (
                  <Image
                    key={reaction.type}
                    source={getFeelingIcon(reaction.type)}
                    style={styles.feelingIcon}
                  />
                ))}
              <Text
                style={[
                  styles.text_like_post,
                  {
                    color: ColorTextLikePost(
                      item.reaction.find(
                        reaction => reaction.idUsers._id === user.user._id,
                      ).type,
                    ),
                  },
                ]}>
                {item.reaction
                  .filter(reaction => reaction.idUsers._id === user.user._id)
                  .map(reaction => reaction.type)}
              </Text>
            </>
          ) : (
            <>
              <AntDesign name="like2" size={20} color="#666666" />
              <Text style={[styles.text_like_post, {color: '#666666'}]}>
                Thích
              </Text>
            </>
          )}
        </TouchableOpacity>

        {selectedPostId === item._id && reaction && (
          <View style={styles.container_reaction}>
            <CustomReaction
              reactions={reactions}
              clone={handleReaction.current.handlePressOut}
              posts={item}
              reloadPosts={reloadPosts}
            />
          </View>
        )}

        {/* comment */}
        <TouchableOpacity
          style={styles.like_post}
          onPress={() =>
            navigation.navigate('CommentsScreen', {
              postId: item,
            })
          }>
          <MaterialCommunityIcons
            name="comment-outline"
            size={20}
            color="#666666"
          />
          <Text style={styles.text_like_post}>Bình luận</Text>
        </TouchableOpacity>
        {/* share */}
        <TouchableOpacity
          style={styles.like_post}
          onPress={() => handleShareModal(item)}>
          <MaterialCommunityIcons name="share-outline" size={23} color="#666" />
          <Text style={styles.text_like_post}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
      {/* line */}
      <Text style={styles.linePostsEnd} />
    </View>
  );
};

export default CreateAtPosts;
