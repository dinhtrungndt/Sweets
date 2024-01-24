/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  T: {
    width: '100%',
    height: '82.9%',
  },
  lineHr: {
    width: '100%',
    height: 1,
    backgroundColor: '#e4e6eb',
  },
  body: {
    marginBottom: 100,
    marginTop: 0,
  },
  avatar_content_image: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 0,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  avatar_icon_image: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  boder_image: {
    width: 90,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: '#EAEAEA',
    flexDirection: 'row',
  },
  story: {
    height: 200,
    marginTop: 10,
    marginLeft: 10,
  },
  storyItem: {
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    position: 'relative',
  },
  storyAvatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 10,
    zIndex: 2,
    position: 'absolute',
    top: 3,
    left: 3,
  },
  storyImage: {
    width: 130,
    height: 200,
    borderRadius: 10,
    zIndex: 1,
  },
  storyName: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
    marginTop: 10,
    color: 'white',
    zIndex: 2,
    position: 'absolute',
    bottom: 8,
    left: 10,
  },
  upStory_User: {
    width: 130,
    height: 200,
    borderRadius: 10,
    marginLeft: 20,
    backgroundColor: '#EAEAEA',
    marginTop: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 10,
  },
  avatar_upstory: {
    width: 130,
    height: 155,
    borderRadius: 10,
    zIndex: 1,
  },
  view_addStory: {
    borderRadius: 50,
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 2,
    width: 35,
    height: 35,
    zIndex: 2,
    bottom: 27,
    left: 50,
    position: 'absolute',
  },
  add_story: {
    width: 30,
    height: 30,
    borderRadius: 50,
    zIndex: 4,
  },
  text_addStory: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
    marginTop: 10,
    color: 'black',
    zIndex: 2,
    position: 'absolute',
    bottom: 8,
    left: 40,
  },
  baiViet: {
    margin: 16,
    marginTop: 10,
  },
  baiVietHeader: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  baiVietAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  baiVietName: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Roboto',
    marginLeft: 15,
    color: '#050505',
  },
  baiVietTime: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#606770',
    marginLeft: 15,
  },
  baiVietHeaderLeft: {
    width: 265,
    flexDirection: 'row',
    alignItems: 'center',
  },
  baiVietHeaderRight: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  baiVietHeaderRightIcon: {
    width: 26,
    height: 26,
    resizeMode: 'cover',
  },
  baiVietContent: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  baiVietContentText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#050505',
    fontWeight: '300',
  },
  baiVietImage: {
    marginTop: 10,
    height: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'gray',
    borderWidth: 1,
  },
  baiVietImageImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  baiVietLikeCommentShare: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  baiVietLike: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  baiVietLikeIcon: {
    width: 28,
    height: 28,
  },
  baiVietLikeText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: 3,
    marginTop: 3,
  },
  baiVietComments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  baiVietCommentsIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  baiVietCommentsText: {
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  baiVietShare: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  baiVietShareIcon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  baiVietShareText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: 5,
  },
  noStatus: {
    padding: 10,
  },
});
