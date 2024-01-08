/* eslint-disable prettier/prettier */
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import AddModal from '../../trangchu/dropDown/addModal';
import {UserContext} from '../../../user/userContext';

const HeaderScreens = props => {
  const {navigation} = props;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleOnDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.textHeader}>𝓢𝔀𝓮𝓮𝓽𝓼</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.headerIconContainer}
            onPress={handleOnDropdown}>
            <Text style={{fontSize: 32, color: 'black', top: -5}}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SearchScreens')}
            style={[styles.headerIconContainer, {marginLeft: 5}]}>
            <Image
              style={styles.headerIcon}
              source={require('../../../../../media/image/icon_search.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerIconContainer, {marginLeft: 5}]}>
            <Image
              style={styles.headerIcon}
              source={require('../../../../../media/image/icon_chat.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* đường kẻ ngang*/}
      <Text style={styles.lineHr} />
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => {
          setDropdownVisible(!isDropdownVisible);
        }}>
        <AddModal />
      </Modal>
    </>
  );
};

export default HeaderScreens;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 38,
    color: '#000000',
    fontFamily: 'Roboto',
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#e4e6eb',
    backgroundColor: '#e4e6eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,
    flexDirection: 'row',
  },
  headerIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  lineHr: {
    width: '100%',
    height: 1,
    backgroundColor: '#e4e6eb',
  },
});
