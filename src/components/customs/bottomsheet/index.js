/* eslint-disable prettier/prettier */
import {Button, Text, View} from 'react-native';
import React, {useMemo, useRef} from 'react';

// css
import {styles} from '../style/bottomsheet';

// library
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetComponent = () => {
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const bottomSheetRef = useRef(null);

  const handleClone = () => bottomSheetRef.current?.close();
  const handleOnpen = () => bottomSheetRef.current?.open();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.T}>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={styles.background_bottomSheet}
          enablePanDownToClose={true}>
          <View style={styles.content_container}>
            <Text>Content</Text>
            <Button title="Fechar" onPress={() => {}} />
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default BottomSheetComponent;
