const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#22b6c0',
    backgroundColor: 'white',
    position: 'absolute',
    top: 65,
    left: 60
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
  wrapContent1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#22b6c0',
    width: '100%',
    height: 50,
    padding: 10,
  },
  friendItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtContent1: {
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  wrapQr: {
    backgroundColor: '#CCE1FF',
    width: 300,
    height: 300,
    marginTop: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  txtName: {
    marginTop: 15,
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
  },
  txt1: {
    marginTop: 6,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});