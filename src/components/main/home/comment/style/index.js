/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    padding: 12,
  },
  lineHr: {
    width: '100%',
    height: 1,
    backgroundColor: '#e4e6eb',
  },
  icon_back: {
    width: 24,
    height: 24,
  },
  baiVietHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 0,
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
  // body
  // people who like
  container_peopleLike: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  icon_like: {
    width: 20,
    height: 20,
  },
  text_peopleLike: {
    fontSize: 14,
    fontFamily: 'Roboto',
    marginLeft: 10,
    color: '#000',
    fontWeight: '500',
  },

  // Sort comment
  text_sortComment: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#000',
    paddingLeft: 10,
    paddingTop: 8,
    fontWeight: '700',
  },

  // comment
  comment: {
    paddingTop: 10,
  },
  container_comment: {
    padding: 10,
  },
  container_comment_header: {
    flexDirection: 'row',
  },
  avatar_comment: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  container_comment_content: {
    marginLeft: 10,
    width: '80%',
  },
  comment_content: {
    backgroundColor: '#e4e6eb',
    borderRadius: 20,
    padding: 10,
  },
  name_comment: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#000',
    fontWeight: 'bold',
  },
  content_comment: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#000',
    fontWeight: '300',
  },
  comment_time_like: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  time_comment: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#606770',
    fontWeight: '300',
    paddingLeft: 10,
  },
  like_like_comment: {
    fontSize: 13,
    fontFamily: 'Roboto',
    color: '#606770',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  container_comment_body: {
    marginTop: 10,
    flexDirection: 'row',
  },
  childComment: {
    marginLeft: 20,
  },
  container_reply_comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
  },
  icon_comment: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input_comment: {
    width: '80%',
    height: 40,
    marginLeft: 10,
    paddingLeft: 15,
    borderRadius: 20,
    backgroundColor: '#e4e6eb',
  },
});
