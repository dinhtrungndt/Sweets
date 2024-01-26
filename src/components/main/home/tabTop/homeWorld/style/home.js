/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  T: {
    width: '100%',
    height: '67.9%',
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
  noMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
