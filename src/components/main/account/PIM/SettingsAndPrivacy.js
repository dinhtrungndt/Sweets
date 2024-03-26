import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../../../../contexts/user/userContext';

// styles
import {styles} from '../style/SettingsAndPrivacy';

const SettingsAndPrivacy = props => {
  const {navigation} = props;
  const {user} = useContext(UserContext);

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.btnBack}>
        <Image
          style={styles.imgBack}
          source={require('../../../../assets/icon_back.png')}
        />
        <Text style={styles.txtBack}>Cài đặt & quyền riêng tư</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsAndPrivacy;
