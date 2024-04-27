/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext, useState, useEffect} from 'react';
import {UserContext} from '../../../../contexts/user/userContext';
import {updateProfile} from '../../../../services/user/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
// styles
import {styles} from '../style/editprofile';

// library
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import {set} from 'date-fns';

const EditProfile = ({navigation, route}) => {
  // const {user, setUser} = useContext(UserContext);
  const {user} = route?.params;
  const [loading, setLoading] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const {t} = useTranslation();
  const [isGender, setIsGender] = useState(user ? user.user.gender : '');
  const [editedName, setEditedName] = useState(user ? user.user.name : '');
  const [editedNgaysinh, setEditedNgaysinh] = useState(
    user && user.user && user.user.date !== 'null'
      ? user.user.date
      : 'Chưa cập nhật',
  );

  const handleEdit = () => {
    setModalVisibleEdit(true);
  };

  const onConfirmDate = date => {
    setModalVisibleDate(false);

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    setEditedNgaysinh(formattedDate);
  };

  const handleCheckboxChange = selectedGender => {
    setIsGender(selectedGender);
  };

  useEffect(() => {
    setEditedName(user ? user.user.name : '');
    setIsGender(user ? user.user.gender : '');
    setEditedNgaysinh(
      user && user.user && user.user.date !== 'null'
        ? user.user.date
        : 'Chưa cập nhật',
    );
  }, [user]);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      const response = await updateProfile(
        user.user._id,
        editedName,
        isGender,
        editedNgaysinh,
      );
      if (response.status === 1) {
        console.log('updateProfile susccess: ', response);
        // setUser(response);
        setModalVisibleEdit(false);
      }
    } catch (error) {
      console.log('updateProfile err: ', error);
    }
    setLoading(false);
  }, [editedName, isGender, editedNgaysinh]);

  return (
    <View>
      <View style={styles.profileFrame}>
        <TouchableOpacity>
          <Image
            style={styles.imgCover}
            source={
              user && user.user.coverImage
                ? {uri: user.user.coverImage}
                : require('../../../../assets/diana.jpg')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.imgAvatar}
            source={
              user && user.user.avatar
                ? {uri: user.user.avatar}
                : require('../../../../assets/diana.jpg')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnBack}>
          <MaterialIcons name="arrow-back" color={'#000000'} size={30} />
        </TouchableOpacity>
        <View style={styles.editFrame}>
          <Text style={styles.txt1}>{t('personalInformation')}</Text>
          <View style={styles.Frame}>
            <Text style={styles.txtTtcn}>{t('fullName')}:</Text>
            <Text style={styles.txtTtcn1}>{editedName}</Text>
          </View>
          <View style={styles.Frame}>
            <Text style={styles.txtTtcn}>{t('gender')}:</Text>
            <Text style={styles.txtTtcn1}>{isGender}</Text>
          </View>
          <View style={styles.Frame}>
            <Text style={styles.txtTtcn}>{t('dateOfBirth')}:</Text>
            <Text style={styles.txtTtcn1}>{editedNgaysinh}</Text>
          </View>
          <TouchableOpacity onPress={handleEdit} style={styles.btnEdit}>
            <Text style={styles.txtEdit}>{t('edit')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal chỉnh sửa */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleEdit}
        onRequestClose={() => {
          setModalVisibleEdit(!modalVisibleEdit);
        }}>
        <View style={styles.modalContainerEdit}>
          <View style={styles.FrameEditIfm}>
            <TouchableOpacity
              onPress={() => setModalVisibleEdit(!modalVisibleEdit)}
              style={styles.btnCancelEdit}>
              <MaterialIcons
                name="arrow-back"
                size={30}
                color={'#FFFFFF'}
                style={styles.imgAvt}
              />
              <Text style={styles.txtCancelEdit}>
                {t('editPersonalInformation')}
              </Text>
            </TouchableOpacity>
            <View>
              <TextInput
                style={styles.txtInputName}
                value={editedName}
                onChangeText={text => setEditedName(text)}
              />
              <Image
                style={styles.imgEdit}
                source={require('../../../../assets/icon_edit.png')}
              />
            </View>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.txtInputDate}
                onPress={() => setModalVisibleDate(true)}>
                <Image
                  style={styles.imgEdit}
                  source={require('../../../../assets/Date.png')}
                />
                <TextInput
                  value={editedNgaysinh}
                  editable={false}
                  placeholder="YYYY-MM-DD"
                  style={styles.dateInput}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={modalVisibleDate}
                date={set(new Date(), {year: 2000}, editedNgaysinh)}
                onConfirm={onConfirmDate}
                onCancel={() => {
                  setModalVisibleDate(false);
                }}
              />
            </View>
            <View style={styles.CheckboxFrame}>
              <CheckBox
                style={styles.CheckBox}
                value={isGender === 'Nữ'}
                onValueChange={() => handleCheckboxChange('Nữ')}
                tintColors={{true: '#22b6c0', false: '#b0b4ba'}}
              />
              <Text style={styles.txtCheckbox}>{t('female')}</Text>
              <CheckBox
                style={styles.CheckBox}
                value={isGender === 'Nam'}
                onValueChange={() => handleCheckboxChange('Nam')}
                tintColors={{true: '#22b6c0', false: '#b0b4ba'}}
              />
              <Text style={styles.txtCheckbox}>{t('male')}</Text>
              <CheckBox
                style={styles.CheckBox}
                value={isGender === 'Khác'}
                onValueChange={() => handleCheckboxChange('Khác')}
                tintColors={{true: '#22b6c0', false: '#b0b4ba'}}
              />
              <Text style={styles.txtCheckbox}>{t('other')}</Text>
            </View>
            <TouchableOpacity onPress={handleSave} style={styles.btnSave}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.txtSave}>{t('update')}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
