import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

// styles
import {styles} from '../style/HelpAndSupport';

const HelpAndSupport = props => {
  const {navigation} = props;

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.btnBack}>
        <Image
          style={styles.imgBack}
          source={require('../../../../assets/icon_back.png')}
        />
        <Text style={styles.txtBack}>Trợ giúp và hỗ trợ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpAndSupport;
