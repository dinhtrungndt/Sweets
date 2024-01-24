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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logoHeader: {
    width: 100,
    height: 23,
    padding: 0,
  },
  towEnd_Noti_Search: {
    flexDirection: 'row',
  },
  lengthNoti: {
    position: 'absolute',
    top: -5,
    right: 0,
    left: 19,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff0000',
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  container_noti: {
    paddingLeft: 5,
  },
});
