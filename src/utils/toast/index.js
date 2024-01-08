/* eslint-disable prettier/prettier */
import React, {forwardRef, useImperativeHandle} from 'react';
import Toast from 'react-native-toast-message';

const ToastComponent = forwardRef((props, ref) => {
  const toastRef = React.useRef();

  useImperativeHandle(ref, () => ({
    showMessage: options => {
      toastRef.current.showMessage(options);
    },
    // You can add more functions here if needed
  }));

  return <Toast ref={toastRef} {...props} />;
});

export default ToastComponent;
