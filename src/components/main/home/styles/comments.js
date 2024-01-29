/* eslint-disable prettier/prettier */
const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    padding: 12,
    paddingTop: 5,
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
  container_time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    fontSize: 14,
    color: '#000',
    margin: 16,
    marginTop: 0,
    marginBottom: 10,
  },
  showMore: {
    margin: 16,
    marginTop: 0,
    marginBottom: 10,
  },
  posts: {
    width: '100%',
    height: 350,
  },
  like_comment_share: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  byLike: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarByLike: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  nameByLike: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 5,
  },
  container_feeling_commnet_share: {},
  container_feeling: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    opacity: 0.8,
    margin: 16,
    marginTop: 10,
    marginBottom: 0,
  },
  feeling: {
    width: 20,
    height: 20,
    position: 'relative',
    backgroundColor: '#22b6c0',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon_Like_Feeling: {
    width: 12,
    height: 12,
  },
  text_feeling: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 5,
  },
  comment_share: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  container_comment: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comment: {
    width: 20,
    height: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_share: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  text_share: {
    fontSize: 14,
    color: '#666666',
  },
  linePosts: {
    width: '100%',
    height: 1,
    backgroundColor: '#ededed',
  },
  container_like_comment_share: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 18,
    marginTop: 12,
    marginBottom: 12,
  },
  like_post: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_like_post: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 5,
    fontWeight: '500',
  },
  linePostsEnd: {
    width: '100%',
    height: 1,
    backgroundColor: '#ededed',
    marginTop: 8,
  },
  container_media: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  swiper: {
    height: 400,
  },
  imageCountContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  imageCountText: {
    color: '#FFF',
    fontSize: 12,
  },
  container_reaction: {
    position: 'absolute',
    bottom: 37,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  background_bottomSheet: {
    backgroundColor: '#fff',
  },
  container_bottomSheet: {
    padding: 16,
    paddingTop: 10,
  },
  container_phuhop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 10,
  },
  text_phuhop: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    paddingRight: 8,
  },
});
