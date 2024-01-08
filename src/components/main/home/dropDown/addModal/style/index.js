/* eslint-disable prettier/prettier */
import {Image, StyleSheet} from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    width: '45%',
    position: 'absolute',
    top: 65,
    right: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: '#f5f3f4',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    paddingBottom: 5,
  },
  modalItem: {
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    right: 0,
    marginBottom: 15,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    paddingLeft: 20,
  },
});
