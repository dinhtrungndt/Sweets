/* eslint-disable prettier/prettier */
const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  T: {
    height: '100%',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#f2f2f2',
  },
  container_avatar_name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
    marginBottom: 10,
  },
  avatar_name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  container_object: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 10,
  },
  icon_object: {
    width: 14,
    height: 14,
    marginLeft: 5,
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
  container_feeling_commnet_share: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
    marginTop: 14,
    marginBottom: 10,
    opacity: 2,
  },
  container_feeling: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    opacity: 0.8,
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
    backgroundColor: '#dedede',
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
    height: 5,
    backgroundColor: '#dedede',
  },
  container_media: {},
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
});
