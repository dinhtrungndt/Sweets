import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next'

// styles
import {styles} from '../style/HelpAndSupport';

const HelpAndSupport = props => {
  const {navigation} = props;
  const { t } = useTranslation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.btnBack}>
        <MaterialIcons
          style={styles.imgBack}
          name='arrow-back'
          color={'#FFFFFF'} 
          size={30}
        />
        <Text style={styles.txtBack}>{t('helpAndSupport')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpAndSupport;
