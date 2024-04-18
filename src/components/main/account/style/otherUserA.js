const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: '#bcbcbc',
  },
  profileFrame: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#FFFFFF',
  },
  imgCover: {
    width: '100%',
    height: 210,
    position: 'absolute',
  },
  imgAvatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    position: 'absolute',
    top: 150,
    alignSelf: 'center',
  },
  textName: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 270,
    color: '#000000',
    textAlign: 'center',
  },
  containerAdd: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    // backgroundColor: '#000000',
    flexWrap: 'wrap',
  },
  btnAddFriend: {
    width: '50%',
    height: 40,
    backgroundColor: '#22b6c0',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 15,
    marginTop: 30,
    flexDirection: 'row',
  },
  imgAddFriend: {
    width: 21,
    height: 21,
    alignSelf: 'center',
  },
  textIntroduce: {
    fontSize: 16,
    color: '#FFFFFF',
    alignSelf: 'center',
    marginLeft: 6,
  },
  btnMess: {
    width: '40%',
    height: 40,
    backgroundColor: '#ccd3d7',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 12,
    marginTop: 30,
    flexDirection: 'row',
  },
  imgEdit: {
    width: 21,
    height: 21,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  txtEdit: {
    fontSize: 16,
    color: '#000000',
    alignSelf: 'center',
    marginLeft: 6,
  },
  editFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    padding: 16,
  },
  btnBack: {
    position: 'absolute',
    padding: 10,
  },
  imgBack: {
    width: 24,
    height: 24,
  },
  btnMore: {
    position: 'absolute',
    padding: 10,
    left: 330,
  },
  imgMore: {
    width: 24,
    height: 24,
    color: '#fff',
    paddingTop: 5,
  },
  bodyLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLoading: {
    width: 100,
    height: 100,
  },
});
