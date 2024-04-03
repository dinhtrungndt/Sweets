/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  loadMoreContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
  },
  loadMoreText: {
    fontWeight: 'bold',
  },
  contentreceiver: {
    backgroundColor: '#d9d9d9',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0,
  },
  back_user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name_user: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  back: {
    width: 23,
    height: 23,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
    marginLeft: 10,
  },
  account: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  call_video: {
    flexDirection: 'row',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#dedede',
    marginTop: 10,
  },
  sentMessage: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  sentContent: {
    color: '#fff',
  },

  receivedMessage: {
    maxWidth: '50%',
    width: 'auto',

    textAlign: 'left',
    padding: 10,
    borderRadius: 8,
    height: 'auto',
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    marginBottom: 5,
  },
  avatarChat: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  receivedContent: {
    flex: 1,
  },
  senderName: {
    fontWeight: 'bold',
    color: '#000',
  },
  receivedText: {
    color: '#000',
  },

  chat: {
    padding: 10,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  input_text: {
    width: '80%',
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 10,
  },
  send: {
    width: 40,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
