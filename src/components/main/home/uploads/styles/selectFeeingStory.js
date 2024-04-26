/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  T: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_taotin: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  typingFeeting: {
    width: 120,
    height: 180,
    margin: 20,
    marginRight: 7,
    backgroundColor: '#E94496',
    borderRadius: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingFeeting_in_VItext: {
    width: 50,
    height: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    position: 'absolute',
  },
  typingFeeting_in_text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    paddingTop: 80,
    position: 'absolute',
  },
  footer: {},
  rowPickImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  library_container: {
    flexDirection: 'row',
  },
  pickImage_container: {
    flexDirection: 'row',
    marginRight: 20,
    backgroundColor: '#e8e8e8',
    padding: 6,
    borderRadius: 5,
  },
  library_text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#616160',
    paddingLeft: 20,
  },
  loadingImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imageList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 5,
  },
  imageItem: {
    width: 110,
    height: 155,
    margin: 6,
    marginRight: 0,
    borderRadius: 4,
  },
  videoItem: {
    width: 125.5,
    height: 155,
    margin: 6,
    marginRight: 0,
    borderRadius: 4,
  },
  openCamera_container: {
    width: '100%',
    position: 'absolute',
    zIndex: 100,
    alignItems: 'center',
    bottom: 30,
  },
  openCamera: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#22b6c0',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  modalCloseButton: {
    position: 'absolute',
    padding: 16,
    zIndex: 1,
  },
  modalImage: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalImageVideo: {
    width: '100%',
    height: '97%',
  },
  seetingInUp: {
    position: 'absolute',
    width: '100%',
    bottom: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  seetingInUp_two: {
    flexDirection: 'row',
  },
  seetingInUpQRT: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seetingtext: {
    color: '#fff',
    textAlign: 'center',
  },
  seetingSave: {
    paddingLeft: 20,
  },
  btnShare: {
    width: 75,
    height: 38,
    backgroundColor: '#22b6c0',
    borderRadius: 5,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnShareText: {
    fontSize: 16,
    color: '#fff',
  },
});
