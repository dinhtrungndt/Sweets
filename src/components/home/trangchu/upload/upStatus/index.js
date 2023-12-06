import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../style/upStatusCss';

const UpStatus = props => {
  const {navigation} = props;

  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);
  const [inputText, setInputText] = useState('');

  const showBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const hideBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const handleInputChange = text => {
    setInputText(text);
  };

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.headerIcon}
            source={require('../../../../../../media/image/icon_delete.png')}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Tạo bài viết</Text>
        <TouchableOpacity
          style={[
            styles.upHeaderButton,
            {backgroundColor: inputText ? '#7ec1a5' : '#CBCBCB'},
          ]}>
          <Text style={styles.textHeaderUp}>Đăng</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.lineHr} />
      {/* body */}
      <View style={styles.body}>
        {/* chedo_congkhai */}
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.body_avatar}
            source={require('../../../../../../media/image/avatar.jpg')}
          />
          <View style={styles.body_content}>
            {/* name */}
            <Text style={styles.body_name}>Nguyễn Văn A</Text>
            <View style={{flexDirection: 'row'}}>
              {/* congkhai */}
              <TouchableOpacity
                style={styles.body_chedo}
                onPress={() => navigation.navigate('SelectScreenUp')}>
                <Image
                  style={styles.body_chedo_icon}
                  source={require('../../../../../../media/image/icon_all_friend.png')}
                />
                <Text style={styles.body_chedo_text}>Tất cả bạn bè</Text>
                <Image
                  style={styles.body_chedo_icon_down}
                  source={require('../../../../../../media/image/upstory_down_icon.png')}
                />
              </TouchableOpacity>
              {/* album */}
              <TouchableOpacity
                style={[styles.body_chedo, {marginLeft: 15, width: 95}]}>
                <Text style={[styles.body_chedo_text, {paddingLeft: 5}]}>
                  +
                </Text>
                <Text style={[styles.body_chedo_text, {paddingLeft: 3}]}>
                  Album
                </Text>
                <Image
                  style={styles.body_chedo_icon_down}
                  source={require('../../../../../../media/image/upstory_down_icon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Content */}
        <View style={{height: 570}}>
          <TextInput
            style={styles.body_content_input}
            placeholder="Bạn đang nghĩ gì?"
            multiline={true}
            onChangeText={handleInputChange}
          />
        </View>
        {/* bottom sheet */}
        <View style={styles.pick_feelings}>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../../media/image/icon_image.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Ảnh/video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../../media/image/user_tag_25px.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Gắn thẻ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../../media/image/icon_feeling.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Cảm xúc</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={showBottomSheet}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../../../media/image/icon_more.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet */}
        {bottomSheetVisible && (
          <View style={styles.bottomSheet}>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../../media/image/icon_image.png')}
              />
              <Text style={styles.bottomSheetText}>Ảnh/video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../../media/image/user_tag_25px.png')}
              />
              <Text style={styles.bottomSheetText}>Gắn thẻ người khác</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../../media/image/icon_feeling.png')}
              />
              <Text style={styles.bottomSheetText}>Cảm xúc/hoạt động</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../../media/image/icon_checkin.png')}
              />
              <Text style={styles.bottomSheetText}>Check in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../../media/image/icon_live.png')}
              />
              <Text style={styles.bottomSheetText}>Video trực tiếp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem}>
              <Image
                style={styles.bottomSheetIcon}
                source={require('../../../../../../media/image/icon_text.png')}
              />
              <Text style={styles.bottomSheetText}>Màu nền</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideBottomSheet}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#0962c9',
                  fontFamily: 'Roboto',
                  fontWeight: '700',
                  marginLeft: 5,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default UpStatus;
