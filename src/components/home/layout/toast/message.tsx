/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import Toast, {IToast} from './Toast';

const MessageNotifi = () => {
  const toastRef = useRef<IToast>(null);

  return (
    <View>
      <Toast ref={toastRef} onHide={handleHide} />
    </View>
  );
  function show() {
    toastRef.current?.hide(() => {
      toastRef.current?.show('Posting...', 'info', 400);
    });
  }

  function hide() {
    toastRef.current?.hide();
  }

  function showSuccess() {
    toastRef.current?.hide(() => {
      toastRef.current?.show('Posted', 'success', 400);
    });
  }

  function showError() {
    toastRef.current?.hide(() => {
      toastRef.current?.show('Ops, something is wrong!', 'error', 400);
    });
  }

  function handleHide() {
    console.log('toast is hidden');
  }
};

export default MessageNotifi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01113b',
  },
  infoButton: {
    backgroundColor: '#0077ed',
    borderRadius: 10,
    width: '80%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  successButton: {
    backgroundColor: '#1f8503',
    borderRadius: 10,
    width: '80%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorButton: {
    backgroundColor: '#f00a1d',
    borderRadius: 10,
    width: '80%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  hideButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    width: '80%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});
