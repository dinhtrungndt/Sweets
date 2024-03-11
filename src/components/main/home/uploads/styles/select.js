/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22b6c0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  headerIcon: {
    width: 20,
    height: 20,
    marginTop: 3,
    resizeMode: 'cover',
  },
  textHeader: {
    fontSize: 18,
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  body_content: {
    flexDirection: 'row',
    padding: 13,
    alignItems: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  body_content_icon: {
    width: 25,
    height: 25,
    marginTop: 3,
    resizeMode: 'cover',
  },
  body_content_text: {
    fontSize: 16,
    marginLeft: 10,
    color: '#131313',
  },
  body_content_text2: {
    fontSize: 14,
    marginLeft: 10,
    color: '#676767',
  },
  radioContainer: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22b6c0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22b6c0',
  },
  body_content_icon2: {
    width: 18,
    height: 18,
    marginTop: 3,
    left: 5,
    resizeMode: 'cover',
  },
});
