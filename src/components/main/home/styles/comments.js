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
    paddingBottom: 0,
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
    marginTop: 10,
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
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon_Like_Feeling: {
    width: 20,
    height: 20,
  },
  text_feeling: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 5,
  },
  feelingIcon: {
    width: 25,
    height: 25,
  },
  comment_share: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  container_share: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  text_share: {
    fontSize: 14,
    color: '#212121',
  },
  text_peopleLike: {
    fontSize: 16,
    paddingLeft: 5,
    color: '#000',
    fontWeight: '600',
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
