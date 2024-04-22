import { Text, View, Image, TouchableOpacity, Switch, Modal, ActivityIndicator } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../../contexts/user/userContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { EventRegister } from 'react-native-event-listeners';
import themContext from '../../../../themes/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// styles
import { styles } from '../style/SettingsAndPrivacy';
// languages
import { useTranslation } from 'react-i18next';
// import i18n from '../../../../translations/i18';
import CheckBox from '@react-native-community/checkbox';

const SettingsAndPrivacy = props => {
  const { navigation } = props;
  const { user } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(false);
  const [modalVisibleLanguage, setModalVisibleLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languageChecked, setLanguageChecked] = useState(false); // New state to control language checkbox
  const theme = useContext(themContext);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedDarkModeState = await AsyncStorage.getItem('darkMode');
        if (savedDarkModeState !== null) {
          setDarkMode(JSON.parse(savedDarkModeState));
        }

        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (savedLanguage !== null) {
          setSelectedLanguage(savedLanguage);
          i18n.changeLanguage(savedLanguage);
          setLanguageChecked(true);
        }
      } catch (error) {
        console.log('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
      } catch (error) {
        console.log('Error saving selected language:', error);
      }
    };

    if (languageChecked) {
      saveSettings();
    }
  }, [selectedLanguage, languageChecked]);

  const saveDarkModeState = async (value) => {
    setDarkMode(value);
    EventRegister.emit('changeTheme', value);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    } catch (error) {
      console.log('Error saving dark mode state:', error);
    }
  };

  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    saveDarkModeState(newDarkModeState);
  };

  const handleLanguage = () => {
    setModalVisibleLanguage(true);
  };

  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    setModalVisibleLanguage(false);
    setLanguageChecked(true);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.btnBack}>
        <MaterialIcons
          style={styles.imgBack}
          name="arrow-back"
          color={'#FFFFFF'}
          size={30}
        />
        <Text style={styles.txtBack}>{t('settingsAndprivacy')}</Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity>
          <View style={styles.detailContainer}>
            <MaterialCommunityIcons
              style={styles.imgIcon}
              name="theme-light-dark"
              size={30}
              color={'#000000'}
            />
            <Text style={styles.text2}>{t('interface')}</Text>
            <Switch
              style={styles.btnDark}
              value={darkMode}
              onValueChange={toggleDarkMode}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLanguage}>
          <View style={styles.detailContainer}>
            <MaterialIcons
              style={styles.imgIcon}
              name="language"
              size={30}
              color={'#000000'}
            />
            <Text style={styles.text2}>{t('language')}</Text>
          </View>
        </TouchableOpacity>

        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisibleLanguage}
          onRequestClose={() => {
            setModalVisibleLanguage(false);
          }}>
          <View style={styles.modalContainerLanguage}>
            <TouchableOpacity
              onPress={() => { setModalVisibleLanguage(false) }}
              style={styles.btnBack}>
              <MaterialIcons
                style={styles.imgBack}
                name="arrow-back"
                size={30}
              />
              <Text style={styles.txtBack}>{t('language')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeLanguage('vn')}>
              <View style={styles.detailContainer}>
                <Image source={require('../../../../assets/icon_vietnam_48.png')} style={styles.imgLanguage} />
                <Text style={styles.text2}>{t('Vietnamese')}</Text>
                <CheckBox
                  style={styles.checkbox}
                  value={selectedLanguage === 'vn'}
                  onValueChange={() => changeLanguage('vn')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => changeLanguage('en')}>
              <View style={styles.detailContainer}>
              <Image source={require('../../../../assets/icon_english_48.png')} style={styles.imgLanguage} />
                <Text style={styles.text2}>{t('English')}</Text>
                <CheckBox
                  style={styles.checkbox}
                  value={selectedLanguage === 'en'}
                  onValueChange={() => changeLanguage('en')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default SettingsAndPrivacy;
