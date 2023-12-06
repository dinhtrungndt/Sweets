import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextComponent,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

// Data
import {dataStory} from './data';
import {BaiVietData} from './data/baiviet';

// StyleCss
import styles from './style/home';

const TrangChuScreen = props => {
  const {navigation} = props;

  // Chữ nhiều hơn 150 kí tự thì ẩn đi và hiện chữ xem thêm
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={styles.T}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.textHeader}>𝓢𝔀𝓮𝓮𝓽𝓼</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.headerIconContainer}>
            <Text style={{fontSize: 32, color: 'black', top: -5}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerIconContainer, {marginLeft: 5}]}>
            <Image
              style={styles.headerIcon}
              source={require('../../../../media/image/icon_search.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerIconContainer, {marginLeft: 5}]}>
            <Image
              style={styles.headerIcon}
              source={require('../../../../media/image/icon_chat.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* đường kẻ ngang*/}
      <Text style={styles.lineHr} />
      {/* Body */}
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.avatar_content_image}>
          <TouchableOpacity>
            <Image
              style={[styles.avatar, {marginLeft: 5}]}
              source={require('../../../../media/image/avatar.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 290,
              height: 40,
              justifyContent: 'center',
              borderRadius: 50,
            }}
            onPress={() => navigation.navigate('UpStatus')}>
            <Text style={{marginLeft: 10, fontSize: 16}}>
              Bạn đang nghĩ gì?
            </Text>
          </TouchableOpacity>
          <View style={{flex: 1}} />
          <TouchableOpacity>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../media/image/icon_image.png')}
            />
          </TouchableOpacity>
        </View>
        {/* anh-video-album-kyniem */}
        <View style={styles.pick_feelings}>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../media/image/icon_image_pick.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../media/image/icon_video.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.boder_image}>
            <Image
              style={styles.avatar_icon_image}
              source={require('../../../../media/image/icon_album.png')}
            />
            <Text style={{fontSize: 12, paddingLeft: 10}}>Album</Text>
          </TouchableOpacity>
        </View>
        {/* đường kẻ ngang*/}
        <Text style={[styles.lineHr, {marginTop: 10, height: 5}]} />
        {/* Story */}
        <ScrollView
          style={{
            height: 227,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {/* UpStory User */}
          <TouchableOpacity style={styles.upStory_User}>
            <Image
              style={styles.avatar_upstory}
              source={require('../../../../media/image/avatar.jpg')}
            />
            <View style={styles.view_addStory}>
              <Image
                style={styles.add_story}
                source={require('../../../../media/image/add_story.png')}
              />
            </View>
            <Text style={styles.text_addStory}>Tạo tin</Text>
          </TouchableOpacity>
          {/* Story */}
          <View style={[styles.story, {flexDirection: 'row'}]}>
            {dataStory.map((item, index) => (
              <View key={index} style={styles.storyItem}>
                <Image style={styles.storyAvatar} source={item.avatar} />
                <Image style={styles.storyImage} source={item.image} />
                <Text style={styles.storyName}>{item.name}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        {/* BaiViet */}
        <View>
          <Text style={[styles.lineHr, {marginTop: 20, height: 5}]} />
          {BaiVietData.map((item, index) => (
            <View key={index} style={styles.baiViet}>
              <View
                style={[
                  styles.baiVietHeader,
                  {paddingTop: index === 0 ? 15 : 0},
                ]}>
                <View style={styles.baiVietHeaderLeft}>
                  <Image style={styles.baiVietAvatar} source={item.avatar} />
                  <View style={styles.baiVietNameTime}>
                    <Text style={styles.baiVietName}>{item.name}</Text>
                    <Text style={styles.baiVietTime}>{item.time}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.baiVietHeaderRight}>
                  <Image
                    style={styles.baiVietHeaderRightIcon}
                    source={require('../../../../media/image/icon_more.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={[
                      styles.baiVietHeaderRightIcon,
                      {
                        left: 15,
                        width: 14,
                        height: 14,
                      },
                    ]}
                    source={require('../../../../media/image/icon_delete.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.baiVietContent}>
                {showMore ? (
                  <Text style={styles.baiVietContentText}>{item.content}</Text>
                ) : (
                  <Text style={styles.baiVietContentText}>
                    {item.content.slice(0, 100)}
                  </Text>
                )}
                {/* Toggle button */}
                {item.content.length > 100 && (
                  <TouchableOpacity onPress={handleShowMore}>
                    <Text style={{color: 'blue'}}>
                      {showMore ? 'Ẩn' : 'Xem thêm'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.baiVietImage}>
                <Image style={styles.baiVietImageImage} source={item.image} />
              </View>
              <View style={styles.baiVietLikeComment}>
                <View style={styles.baiVietLikeCommentLeft}>
                  <TouchableOpacity
                    style={[
                      styles.baiVietLikeCommentLeftIcon,
                      {
                        flexDirection: 'row',
                        paddingLeft: 0,
                      },
                    ]}>
                    <Image
                      style={styles.baiVietLikeCommentLeftIconImage}
                      source={require('../../../../media/image/icon_like.png')}
                    />
                    <Text style={styles.baiVietLikeCommentRightText}>
                      {item.like}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.baiVietLikeCommentLeftIcon}>
                  <Image
                    style={styles.baiVietLikeCommentRightIconImage}
                    source={require('../../../../media/image/icon_comment.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.baiVietLikeCommentRight}>
                  <Text style={styles.baiVietLikeCommentRightText}>
                    {item.comment} bình luận
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.lineHr, {marginTop: 10, height: 5}]} />
            </View>
          ))}
        </View>
        {/* đường kẻ ngang*/}
      </ScrollView>
    </View>
  );
};

export default TrangChuScreen;
