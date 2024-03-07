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

const {height, width} = Dimensions.get('window');
const PickStory = ({route}) => {
  const navigation = useNavigation();
  const {story} = route.params;

  const [current, setCurrent] = useState(0);
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
    if (current < story.media.length - 1) {
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

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      {story.media.map(item => item.url).join() !== '' ? (
        <Image
          source={{uri: story.media.map(item => item.url)[current]}}
          onLoadEnd={() => {
            progress.setValue(0);
            start();
          }}
          style={{width: width, height: height}}
        />
      ) : (
        <View style={styles.container_content}>
          <Text style={styles.content}>{story.content}</Text>
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
        {story.media.map((item, index) => {
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
          <Image
            source={{uri: story.idUsers.avatar}}
            style={{width: 40, height: 40, borderRadius: 20, marginLeft: 10}}
          />
          <Text style={{color: '#fff', marginLeft: 10, fontWeight: 'bold'}}>
            {story.idUsers.name}
          </Text>
          <Text style={{color: '#fff', marginLeft: 10}}>{story.time}</Text>
        </View>
        <TouchableOpacity onPress={showBottomSheet}>
          <Image
            source={require('../../../../../assets/icon_more_story.png')}
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
    </View>
  );
};

export default PickStory;
