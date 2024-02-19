/* eslint-disable prettier/prettier */
import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

// css
import {styles} from '../../styles/feeling';

// toptab
import FeelingTop from './tabTop';

const FeelingComponent = ({reactions}) => {
  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <FeelingTop reactions={reactions} />
      </View>
    </View>
  );
};

export default FeelingComponent;
