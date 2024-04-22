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
import React, {useRef, useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {styles} from '../styles/story';
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';
import {deletePostsAccount} from '../../../../../services/home/homeService';
import DialogDeletePosts from 'react-native-dialog';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {UserContext} from '../../../../../contexts/user/userContext';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');

const PickStory = ({route}) => {
  const navigation = useNavigation();
  const {story} = route.params;
  const {user} = useContext(UserContext);
  const [current, setCurrent] = useState(0);
  const [storys, setStorys] = useState(story);
  const hashIdStory = storys?.map(item => item?.idUsers);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleDiaLogDeletePosts, setVisibleDiaLogDeletePosts] =
    useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');

  // console.log('>>>>> storysstorys', storys);

  const handleFocus = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const handleVideoPress = () => {
    setIsPaused(!isPaused);
  };

  const showBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const progress = useRef(new Animated.Value(0)).current;
  const start = () => {
    if (isTyping) {
      return;
    }

    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        // next();
      }
    });
  };

  const next = () => {
    if (isTyping) {
      return;
    }
    if (current != storys.length - 1) {
      let tempData = storys;
      tempData[current].finished = 1;
      setStorys(tempData);
      progress.setValue(0);
      setCurrent(current + 1);
    } else {
      close();
    }
  };

  const previous = () => {
    if (isTyping) {
      return;
    }
    if (current - 1 >= 0) {
      let tempData = storys;
      tempData[current].finished = 0;
      setStorys(tempData);
      progress.setValue(0);
      setCurrent(current - 1);
    } else {
      close();
    }
  };

  const close = () => {
    if (isTyping) {
      return;
    }
    progress.setValue(0);
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
  // console.log('>>>. Xóa thành công', storys[current]._id);

  const handleDeleteStory = async () => {
    try {
      const _idDelete = storys[current]._id;
      const res = await deletePostsAccount(_idDelete);
      setVisibleDiaLogDeletePosts(false);
      navigation.replace('HomeScreen');
      // console.log('>>>. Xóa thành công', res);
    } catch (error) {
      console.log('>>>. Lỗi delete Posts', error);
    }
  };

  const handleSendMess = (item, message) => {
    setIsTyping(false);
    const itemWithReceiver = {
      ...item,
      receiverv2: item._id,
    };
    // thông báo thành công và gửi 2 tham số qua ChatScreenIn không chuyển màn hình
    navigation.navigate('ChatScreenIn', {
      receiver: itemWithReceiver,
      message: message,
    });
    Toast.show({
      type: 'success',
      text1: 'Gửi tin nhắn thành công',
      visibilityTime: 3000,
    });
    setMessage('');
  };

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      {/* {console.log('storys[current]storys[current]', storys)} */}

      <View style={styles.container_content}>
        {storys[current] && storys[current].media.length === 0 ? (
          <Text style={styles.content}>{storys[current].content}</Text>
        ) : storys[current] &&
          storys[current].media.some(item => item.type === 'image') ? (
          <Image
            source={{
              uri: storys[current].media
                .find(item => item.type === 'image')
                .url.join(),
            }}
            onLoadEnd={() => {
              progress.setValue(0);
              start();
            }}
            style={[
              {width: width, height: height},
              {borderRadius: 10, height: height + 15},
            ]}
          />
        ) : storys[current] &&
          storys[current].media.some(item => item.type === 'video') ? (
          <TouchableOpacity onPress={handleVideoPress}>
            <Video
              source={{
                uri: storys[current].media
                  .find(item => item.type === 'video')
                  .url.join(),
              }}
              onBuffer={this.onBuffer}
              onError={this.videoError}
              resizeMode="contain"
              rate={1}
              volume={1}
              isMuted={false}
              muted={false}
              ignoreSilentSwitch={null}
              repeat={true}
              paused={isPaused}
              controls={false}
              style={{
                width: width,
                height: height,
                borderRadius: 10,
              }}
              progressive={true}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          width: width,
          position: 'absolute',
          top: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {storys &&
          storys.map &&
          storys.map(currentStory => (
            <View
              key={currentStory._id}
              style={{
                flex: 1,
                height: 3,
                backgroundColor: 'rgba(255,255,255,0.5)',
                marginLeft: 5,
              }}>
              <Animated.View
                style={{
                  flex:
                    current == currentStory._id
                      ? storys[currentStory._id].finished
                      : progress,
                  height: 3,
                  backgroundColor: 'rgba(255,255,255,1)',
                }}
              />
            </View>
          ))}
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
          {storys.idUsers ? (
            <>
              <Image
                source={{uri: storys.idUsers.avatar}}
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
                  {storys.idUsers.name}
                </Text>
                <Text style={{color: '#fff', left: 60}}>
                  {formatTime(storys.createAt)}
                </Text>
              </View>
            </>
          ) : (
            <>
              <Image
                source={{uri: storys[current].idUsers.avatar}}
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
                  {storys[current].idUsers.name}
                </Text>
                <Text style={{color: '#fff', left: 60}}>
                  {formatTime(storys[current].createAt)}
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

        {/* {console.log(
          '>>>>>> sososo ',
          hashIdStory.map(user => user._id),
        )} */}
        {hashIdStory.map(user => user._id)[0] !== user.user._id ? (
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
                    position: 'absolute',
                    bottom: 0,
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
          onPress={() => {
            previous();
          }}>
          <View />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '30%', height: '100%'}}
          onPress={() => {
            next();
          }}>
          <View />
        </TouchableOpacity>
      </View>
      {/* rep story */}
      {hashIdStory.map(user => user._id)[0] !== user.user._id ? (
        <TouchableOpacity
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
          {/* {console.log('>>>>>> sososo ', hashIdStory)} */}
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
              width: '75%',
              height: 48,
              backgroundColor: '#fff',
              paddingLeft: 10,
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={text => setMessage(text)}
            value={message}
            onSubmitEditing={
              message !== ''
                ? () => {
                    handleSendMess(hashIdStory[0], message);
                  }
                : null
            }
          />
          <TouchableOpacity
            onPress={
              message !== ''
                ? () => {
                    handleSendMess(hashIdStory[0], message);
                  }
                : null
            }>
            <Ionicons
              style={styles.icon_mess_send}
              name="send"
              size={23}
              color="#22b6c0"
              top={5}
              left={5}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ) : null}

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
