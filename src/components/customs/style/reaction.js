/* eslint-disable prettier/prettier */
const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
    backgroundColor: '#FFF',
  },
  postImageContainer: {
    alignItems: 'center',
    zIndex: -1,
  },
  postImage: {
    width: '100%',
    height: 200,
    zIndex: -1,
    resizeMode: 'center',
  },
  line: {
    borderWidth: 0.3,
    borderColor: '#c9cdd0',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginHorizontal: 20,
  },
});
