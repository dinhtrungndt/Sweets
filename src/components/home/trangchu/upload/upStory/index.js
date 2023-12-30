/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
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

const {height, width} = Dimensions.get('window');

const UpStory = () => {
  const navigation = useNavigation();
  const [current, setCurrent] = useState(0);
  const [content, setContent] = useState([
    {
      id: 1,
      content: require('../../../../../../media/image/test.png'),
      type: 'image',
      time: '3 giờ trước',
      finish: 0,
    },
    {
      id: 2,
      content: require('../../../../../../media/image/account_bottomTab.png'),
      type: 'image',
      time: '2 giờ trước',
      finish: 0,
    },
    {
      id: 3,
      content: require('../../../../../../media/image/chat_bottomTab.png'),
      type: 'image',
      time: '3 giờ trước',
      finish: 0,
    },
    {
      id: 4,
      content: require('../../../../../../media/image/icon_album.png'),
      type: 'image',
      time: '3 giờ trước',
      finish: 0,
    },
    {
      id: 5,
      content: require('../../../../../../media/image/icon_chat.png'),
      type: 'image',
      time: '3 giờ trước',
      finish: 0,
    },
    {
      id: 6,
      content: require('../../../../../../media/image/icon_all_friend.png'),
      type: 'image',
      time: '3 giờ trước',
      finish: 0,
    },
    {
      id: 7,
      content: require('../../../../../../media/image/icon_account_tich.png'),
      type: 'image',
      time: '3 giờ trước',
      finish: 0,
    },
    {
      id: 8,
      content: require('../../../../../../media/image/upstory_world_icon.png'),
      type: 'image',
      time: '3 giờ trước',
      finish: 0,
    },
    {
      id: 9,
      content: require('../../../../../../media/image/icon_add.png'),
      type: 'image',
      time: '3 giờ trước',
      finish: 0,
    },
  ]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

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
    if (current != content.length - 1) {
      let tempData = content;
      tempData[current].finish = 1;
      setContent(tempData);
      progress.setValue(0);
      setCurrent(current + 1);
    } else {
      close();
    }
  };

  const previous = () => {
    if (current - 1 >= 0) {
      let tempData = content;
      tempData[current].finish = 0;
      setContent(tempData);
      progress.setValue(0);
      setCurrent(current - 1);
    } else {
      close();
    }
  };

  const close = () => {
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

  useEffect(() => {
    start();
  }, [current]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <Image
        source={content[current].content}
        onLoadEnd={() => {
          progress.setValue(0);
          start();
        }}
        style={{width: width, height: height}}
      />
      <View
        style={{
          width: width,
          position: 'absolute',
          top: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {content.map((item, index) => {
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
                  flex: current == index ? content[index].finish : progress,
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
          <Image
            source={require('../../../../../../media/image/avatar.jpg')}
            style={{width: 40, height: 40, borderRadius: 20, marginLeft: 10}}
          />
          <Text style={{color: '#fff', marginLeft: 10, fontWeight: 'bold'}}>
            Nguyễn Văn A
          </Text>
          <Text style={{color: '#fff', marginLeft: 10}}>
            {content[current].time}
          </Text>
        </View>
        <TouchableOpacity onPress={showBottomSheet}>
          <Image
            source={require('../../../../../../media/image/icon_more_story.png')}
            style={{width: 20, height: 20, marginLeft: 60, marginTop: 13}}
          />
        </TouchableOpacity>
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
                    bottom: 80,
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
        <TouchableOpacity
          style={{marginRight: 20, marginTop: 10}}
          onPress={() => {
            close();
          }}>
          <Image
            source={require('../../../../../../media/image/icon_delete_white.png')}
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
      <View
        style={{
          height: 50,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 90,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 33,
          borderRadius: 20,
        }}>
        <Image
          source={require('../../../../../../media/image/icon_comment.png')}
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
            height: 50,
            backgroundColor: '#fff',
            paddingLeft: 10,
          }}
        />
      </View>
    </View>
  );
};

export default UpStory;

const styles = StyleSheet.create({});
