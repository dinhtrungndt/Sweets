import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {styles} from '../../../styles/posts';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-swiper';
import VideoPlayer from 'react-native-video-player';

const IShare = ({
  shareData,
  user,
  formatTime,
  changeIdObject,
  showMore,
  handleModalEditPostsGuest,
  handleModalEditPostsAccount,
  handleShowMore,
  setActiveSlide,
  showLengthMedia,
  navigation,
}) => {
  return (
    <View style={styles.T}>
      <FlatList
        data={shareData}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View key={item._id}>
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
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('OtherUserA', {
                              account: item,
                            })
                          }>
                          <Text style={styles.name}>{item.idUsers?.name}</Text>
                        </TouchableOpacity>
                        {item.taggedFriends === null ||
                        item.taggedFriends === undefined ? (
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
                      {item.location === null || item.location === undefined ? (
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
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Profile', {
                              account: item,
                            })
                          }>
                          <Text style={styles.name}>{item.idUsers?.name}</Text>
                        </TouchableOpacity>
                        {item.taggedFriends === null ||
                        item.taggedFriends === undefined ? (
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
                      {item.location === null ||
                      item.taggedFriends === undefined ? (
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
                      <Text style={styles.time}>
                        {formatTime(item.createAt)}
                      </Text>
                    </TouchableOpacity>
                    <Text style={{paddingLeft: 5, fontSize: 6}}>●</Text>
                    <TouchableOpacity>
                      {item.idObject ? changeIdObject(item.idObject) : null}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {item.idUsers._id !== user.user._id ? (
                <TouchableOpacity
                  onPress={() => handleModalEditPostsGuest(item)}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={18}
                    color="#666666"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleModalEditPostsAccount(item)}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={18}
                    color="#666666"
                  />
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
                    {item?.color?.map(color => color.colors)[0] !==
                    undefined ? (
                      <Text
                        style={[
                          styles.content,
                          {
                            backgroundColor: item.color.map(
                              color => color.colors,
                            )[0],
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
                    {item?.color?.map(color => color.colors)[0] !==
                    undefined ? (
                      <Text
                        style={[
                          styles.content,
                          {
                            backgroundColor: item.color.map(
                              color => color.colors,
                            )[0],
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
                  <TouchableOpacity
                    style={styles.showMore}
                    onPress={handleShowMore}>
                    <Text style={{color: 'blue'}}>
                      {showMore ? 'Ẩn' : 'Xem thêm'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            {/* share */}
            <View style={styles.share_container}>
              {/* header in share */}
              <View style={styles.container_avatar_name}>
                <View style={styles.avatar_name}>
                  {item.idPosts.idUsers._id !== user.user._id ? (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('OtherUserA', {
                          account: item,
                        })
                      }>
                      <Image
                        source={{uri: item.idPosts.idUsers?.avatar}}
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
                        source={{uri: item.idPosts.idUsers?.avatar}}
                        style={styles.avatar}
                      />
                    </TouchableOpacity>
                  )}
                  <View>
                    {item.idPosts.idUsers._id !== user.user._id ? (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('OtherUserA', {
                                account: item,
                              })
                            }>
                            <Text style={styles.name}>
                              {item.idPosts.idUsers?.name}
                            </Text>
                          </TouchableOpacity>
                          {item.idPosts.taggedFriends === null ||
                          item.idPosts.taggedFriends === undefined ? (
                            <View />
                          ) : (
                            <>
                              {item.idPosts.taggedFriends._id ===
                              user.user._id ? (
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
                                        accountzzz: item.idPosts.taggedFriends,
                                      })
                                    }>
                                    <Text
                                      style={[
                                        styles.name,
                                        {
                                          color: '#22b6c0',
                                          marginLeft: 5,
                                        },
                                      ]}>
                                      {item.idPosts.taggedFriends.name}
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
                                        accountzzz: item.idPosts.taggedFriends,
                                      })
                                    }>
                                    <Text
                                      style={[
                                        styles.name,
                                        {
                                          color: '#22b6c0',
                                          marginLeft: 5,
                                        },
                                      ]}>
                                      {item.idPosts.taggedFriends.name}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              )}
                            </>
                          )}
                        </View>
                        {item.location === null ||
                        item.location === undefined ? (
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
                                {item.idPosts.location}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </>
                    ) : (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Profile', {
                                account: item,
                              })
                            }>
                            <Text style={styles.name}>
                              {item.idPosts.idUsers?.name}
                            </Text>
                          </TouchableOpacity>
                          {item.idPosts.taggedFriends === null ||
                          item.idPosts.taggedFriends === undefined ? (
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
                                    accountzzz: item.idPosts.taggedFriends,
                                  })
                                }>
                                <Text
                                  style={[
                                    styles.name,
                                    {color: '#22b6c0', marginLeft: 5},
                                  ]}>
                                  {item.idPosts.taggedFriends.name}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                        {item.location === null ||
                        item.taggedFriends === undefined ? (
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
                                {item.idPosts.location}
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
                        <Text style={styles.time}>
                          {formatTime(item.idPosts.createAt)}
                        </Text>
                      </TouchableOpacity>
                      <Text style={{paddingLeft: 5, fontSize: 6}}>●</Text>
                      <TouchableOpacity>
                        {item.idPosts.idObject
                          ? changeIdObject(item.idPosts.idObject)
                          : null}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {/* content in share */}
              {item.idPosts.content === '' ? (
                <></>
              ) : (
                <View style={styles.baiVietContent}>
                  {showMore ? (
                    <>
                      {item.idPosts?.color?.map(color => color.colors)[0] !==
                      undefined ? (
                        <Text
                          style={[
                            styles.content,
                            {
                              backgroundColor: item.color.map(
                                color => color.colors,
                              )[0],
                              borderRadius: 16,
                              padding: 16,
                            },
                          ]}>
                          {item.idPosts.content}
                        </Text>
                      ) : (
                        <Text style={styles.content}>
                          {item.idPosts.content}
                        </Text>
                      )}
                    </>
                  ) : (
                    <>
                      {item.idPosts?.color?.map(color => color.colors)[0] !==
                      undefined ? (
                        <Text
                          style={[
                            styles.content,
                            {
                              backgroundColor: item.color.map(
                                color => color.colors,
                              )[0],
                              borderRadius: 16,
                              padding: 16,
                            },
                          ]}>
                          {item.idPosts.content?.slice(0, 100)}
                        </Text>
                      ) : (
                        <Text style={styles.content}>
                          {item.idPosts.content?.slice(0, 100)}
                        </Text>
                      )}
                    </>
                  )}
                  {/* Toggle button */}
                  {item.idPosts.content &&
                    item.idPosts.content.length > 100 && (
                      <TouchableOpacity
                        style={styles.showMore}
                        onPress={handleShowMore}>
                        <Text style={{color: 'blue'}}>
                          {showMore ? 'Ẩn' : 'Xem thêm'}
                        </Text>
                      </TouchableOpacity>
                    )}
                </View>
              )}

              {/* media in share */}
              {item?.idPosts?.media?.length > 0 ? (
                <View style={styles.container_media}>
                  <Swiper
                    style={styles.swiper}
                    showsButtons={false}
                    loop={false}
                    paginationStyle={{bottom: 10}}
                    activeDotColor="#22b6c0"
                    onIndexChanged={index => setActiveSlide(index)}>
                    {item?.idPosts.media?.map((media, index) => (
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
                            thumbnail={require('../../../../../../assets/play_96px.png')}
                            // autoplay={true}
                            style={styles.posts}
                          />
                        )}
                        {showLengthMedia ? (
                          <View style={styles.imageCountContainer}>
                            <Text style={styles.imageCountText}>
                              {index + 1}/{item?.idPosts.media.length}
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
            </View>
            {/* line */}
            <Text style={[styles.linePostsEnd, {marginTop: 10}]} />
          </View>
        )}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={3000}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default IShare;
