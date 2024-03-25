import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import { MyContext } from './UseContextTemp';
import { UserContext } from '../../contexts/user/userContext';

const InputYourName = ({navigation}) => {
  const { name, setName } = useContext(UserContext); // Sử dụng context đã được tạo từ useUserContext

  const [inputValue, setInputValue] = useState('');

  const handleButtonPress = () => {
    setName(inputValue); // Cập nhật giá trị của user bằng giá trị nhập vào từ input
    navigation.navigate('ChatScreenHome'); // Chuyển hướng sang màn hình ChatScreenHome
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập vào đây..."
        value={inputValue}
        onChangeText={text => setInputValue(text)}
      />
      <Button
        title="Gửi"
        onPress={handleButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default InputYourName;
