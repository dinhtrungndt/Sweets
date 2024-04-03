/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {styles} from '../styles/story';
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';
import {deletePostsAccount} from '../../../../../services/home/homeService';
import DialogDeletePosts from 'react-native-dialog';

const {height, width} = Dimensions.get('window');

const PickStory = ({route}) => {
  const navigation = useNavigation();
  const {story} = route.params;

  const [current, setCurrent] = useState(0);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleDiaLogDeletePosts, setVisibleDiaLogDeletePosts] =
    useState(false);

  const handleVideoPress = () => {
    setIsPaused(!isPaused);
  };

  const showBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const progress = useRef(new Animated.Value(0)).current;
  const start = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({finish}) => {
      if (finish) {
        next();
      }
    });
  };

  const next = () => {
    if (current < (story.media ? story.media.length - 1 : 0)) {
      setCurrent(current + 1);
    } else {
      close();
    }
  };

  const previous = () => {
    if (current - 1 >= 0) {
      setCurrent(current - 1);
    } else {
      close();
    }
  };

  const close = () => {
    navigation.goBack();
  };

  const reportSuccess = () => {
    setBottomSheetVisible(false);
    Toast.show({
      type: 'success',
      text1: 'Báo cáo thành công',
      visibilityTime: 3000,
    });
  };

  const formatTime = createdAt => {
    const currentTime = moment();
    const postTime = moment(createdAt);
    const diffInSeconds = currentTime.diff(postTime, 'seconds');

    if (diffInSeconds < 1) {
      return 'Vừa đăng';
    } else if (diffInSeconds < 60) {
      return `${diffInSeconds} giây trước`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 24 * 3600) {
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else if (diffInSeconds < 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (24 * 3600))} ngày trước`;
    } else if (diffInSeconds < 12 * 30 * 24 * 3600) {
      return `${Math.floor(diffInSeconds / (30 * 24 * 3600))} tháng trước`;
    } else {
      return `${Math.floor(diffInSeconds / (12 * 30 * 24 * 3600))} năm trước`;
    }
  };

  const showDialog = () => {
    setVisibleDiaLogDeletePosts(true);
  };

  const handleCancel = () => {
    setVisibleDiaLogDeletePosts(false);
  };

  const handleDelete = async () => {
    await handleDeleteStory();
    setVisibleDiaLogDeletePosts(false);
  };
  // console.log('>>>. Xóa thành công', story.map(item => item._id).join());

  const handleDeleteStory = async () => {
    try {
      const _idDelete = story.map(item => item._id).join();
      const res = await deletePostsAccount(_idDelete);
      setVisibleDiaLogDeletePosts(false);
      navigation.replace('HomeScreen');
      // console.log('>>>. Xóa thành công', res);
    } catch (error) {
      console.log('>>>. Lỗi delete Posts', error);
    }
  };

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {story.media && story.media.map(item => item.url).join() !== '' ? (
        <>
          {story.media[current].type === 'image' ? (
            <Image
              source={{uri: story.media[current].url.join()}}
              onLoadEnd={() => {
                progress.setValue(0);
                start();
              }}
              style={{width: width, height: height}}
            />
          ) : (
            <TouchableOpacity onPress={handleVideoPress} style={{opacity: 1}}>
              <VideoPlayer
                video={{uri: story.media[current].url.join()}}
                videoWidth={1600}
                videoHeight={900}
                thumbnail={{uri: story.media[current].url.join()}}
                autoplay={true}
                hideControls={true}
                showOnStart={true}
                paused={isPaused}
                style={styles.video_story}
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View style={styles.container_content}>
          <Text style={styles.content}>
            {story.content ? story.content : story[current].content}
          </Text>
          {/* {story.content ? (
            <Text style={styles.content}>
              {story.content ? story.content : story[current].content}
            </Text>
          ) : (
            <>
              {story
                .flatMap(item => item.media.map(item => item.type))
                .join() === 'image' ? (
                <Image
                  source={{
                    uri: story
                      .flatMap(item => item.media.map(item => item.url))
                      .join(),
                  }}
                  onLoadEnd={() => {
                    progress.setValue(0);
                    start();
                  }}
                  style={{width: width, height: height}}
                />
              ) : (
                <TouchableOpacity
                  onPress={handleVideoPress}
                  style={{opacity: 1}}>
                  <VideoPlayer
                    video={{
                      uri: story
                        .flatMap(item => item.media.map(item => item.url))
                        .join(),
                    }}
                    videoWidth={1600}
                    videoHeight={900}
                    thumbnail={{
                      uri: story
                        .flatMap(item => item.media.map(item => item.url))
                        .join(),
                    }}
                    autoplay={true}
                    hideControls={true}
                    showOnStart={true}
                    paused={isPaused}
                    style={styles.video_story_me}
                  />
                </TouchableOpacity>
              )}
            </>
          )} */}
        </View>
      )}

      <View
        style={{
          width: width,
          position: 'absolute',
          top: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {story.media &&
          Array.isArray(story.media) &&
          story.media.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: 3,
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  marginLeft: 5,
                }}>
                <Animated.View
                  style={{
                    flex: current === index ? 1 : progress,
                    height: 3,
                    backgroundColor: 'rgba(255,255,255,1)',
                  }}
                />
              </View>
            );
          })}
      </View>
      <View
        style={{
          width: width,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 30,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {story.idUsers ? (
            <>
              <Image
                source={{uri: story.idUsers.avatar}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    left: 60,
                    fontWeight: 'bold',
                  }}>
                  {story.idUsers.name}
                </Text>
                <Text style={{color: '#fff', left: 60}}>
                  {formatTime(story.createAt)}
                </Text>
              </View>
            </>
          ) : (
            <>
              <Image
                source={{uri: story[current].idUsers.avatar}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    left: 60,
                    fontWeight: 'bold',
                  }}>
                  {story[current].idUsers.name}
                </Text>
                <Text style={{color: '#fff', left: 60}}>
                  {formatTime(story[current].createAt)}
                </Text>
              </View>
            </>
          )}
        </View>
        <TouchableOpacity onPress={showBottomSheet}>
          <Image
            source={require('../../../../../assets/icon_more_story.png')}
            style={{
              width: 20,
              height: 20,
              left: 100,
              top: 13,
              position: 'absolute',
            }}
          />
        </TouchableOpacity>

        {story.idUsers ? (
          <View
            style={{
              width: width,
              height: height,
              position: 'absolute',
              top: 0,
            }}>
            {bottomSheetVisible && (
              <TouchableWithoutFeedback
                onPress={() => {
                  setBottomSheetVisible(false);
                  reportSuccess();
                }}>
                <View
                  style={{
                    width: width,
                    height: height,
                    position: 'absolute',
                    top: 0,
                  }}>
                  <View
                    style={{
                      width: width,
                      height: 100,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      bottom: 15,
                      flexDirection: 'row',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 20,
                        marginLeft: 20,
                        marginTop: 20,
                      }}>
                      Báo cáo
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        ) : (
          <View
            style={{
              width: width,
              height: height,
              position: 'absolute',
              top: 0,
            }}>
            {bottomSheetVisible && (
              <TouchableOpacity onPress={showDialog}>
                <View
                  style={{
                    width: width,
                    height: height,
                    position: 'absolute',
                    top: 0,
                  }}>
                  <View
                    style={{
                      width: width,
                      height: 100,
                      backgroundColor: '#fff',
                      position: 'absolute',
                      bottom: 15,
                      flexDirection: 'row',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 20,
                        marginLeft: 20,
                        marginTop: 20,
                      }}>
                      Xóa story
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
        <TouchableOpacity
          style={{marginRight: 20, marginTop: 10}}
          onPress={close}>
          <Image
            source={require('../../../../../assets/icon_delete_white.png')}
            style={{
              width: 24,
              height: 24,
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: width,
          height: height,
          position: 'absolute',
          top: 100,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{width: '30%', height: '100%'}}
          onPress={previous}>
          <View />
        </TouchableOpacity>
        <TouchableOpacity style={{width: '30%', height: '100%'}} onPress={next}>
          <View />
        </TouchableOpacity>
      </View>
      {/* rep story */}
      <View
        style={{
          height: 50,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 60,
          borderWidth: 1,
          borderColor: '#666',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 33,
          borderRadius: 20,
        }}>
        <Image
          source={require('../../../../../assets/icon_comment.png')}
          style={{
            width: 25,
            height: 25,
            borderRadius: 20,
            marginLeft: 10,
          }}
        />
        <TextInput
          placeholder="Gửi tin nhắn..."
          style={{
            width: '80%',
            height: 48,
            backgroundColor: '#fff',
            paddingLeft: 10,
          }}
        />
      </View>
      <DialogDeletePosts.Container visible={visibleDiaLogDeletePosts}>
        <DialogDeletePosts.Title>Xóa story này ?</DialogDeletePosts.Title>
        <DialogDeletePosts.Description>
          Sau khi xóa bài story này bạn không thể khôi phục.
        </DialogDeletePosts.Description>
        <DialogDeletePosts.Button label="Hủy" onPress={handleCancel} />
        <DialogDeletePosts.Button label="Chấp nhận" onPress={handleDelete} />
      </DialogDeletePosts.Container>
    </View>
  );
};

export default PickStory;
