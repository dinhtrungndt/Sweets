/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import BottomSheet from 'react-native-simple-bottom-sheet';

const BottomSheetLayout = () => {
  const panelRef = useRef(null);

  return (
    <>
      <View style={{flex: 1}}>
        <Text>Your content</Text>
        <TouchableOpacity onPress={() => panelRef.current.togglePanel()}>
          <Text>Toggle</Text>
        </TouchableOpacity>
        <BottomSheet ref={ref => (panelRef.current = ref)}>
          <Text style={{paddingVertical: 20}}>Some random content</Text>
        </BottomSheet>
      </View>
    </>
  );
};

export default BottomSheetLayout;

const styles = StyleSheet.create({});
