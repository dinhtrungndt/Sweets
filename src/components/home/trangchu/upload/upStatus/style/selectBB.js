import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  iconBack: {
    width: 15,
    height: 15,
    marginRight: 10,
    marginTop: 15,
  },
  lineHr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },
  body: {
    width: '80%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 20,
    marginLeft: 35,
  },
  body_content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  body_content_icon: {
    width: 37,
    height: 37,
    borderRadius: 20,
    marginRight: 10,
  },
  body_content_text: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  radioContainer: {
    width: 22,
    height: 22,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#256FEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#256FEF',
  },
});
