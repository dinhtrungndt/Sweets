/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {Overlay, Text} from 'react-native-elements';

const BeautifulAlert = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Show Beautiful Alert" onPress={toggleOverlay} />

      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
        <View style={{padding: 20}}>
          <Text h4>This is a Beautiful Alert</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
          <Button title="Close" onPress={toggleOverlay} />
        </View>
      </Overlay>
    </View>
  );
};

export default BeautifulAlert;
