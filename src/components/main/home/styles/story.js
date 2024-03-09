/* eslint-disable prettier/prettier */
const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  T: {
    backgroundColor: '#fff',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#f2f2f2',
  },
  container_story: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  border_story: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#22b6c0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border_story_seen: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar_story: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  name_story: {
    fontSize: 12,
    marginTop: 5,
  },
  container_story_me: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  container_me: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  add_me: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border_me: {
    width: 65,
    height: 65,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar_me: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  iconAdd: {
    position: 'absolute',
    bottom: 0,
    top: 40,
    right: 0,
  },
  name_me: {
    fontSize: 12,
    marginTop: 5,
  },
});
