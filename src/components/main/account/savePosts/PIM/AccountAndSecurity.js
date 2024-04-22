import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {UserContext} from '../../../../contexts/user/userContext';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next';
// styles
import {styles} from '../style/AccountAndSecurity';

const AccountAndSecurity = props => {
  const {navigation} = props;
  const {user} = useContext(UserContext);
  const { t, i18n } = useTranslation();

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
        <Text style={styles.txtBack}>{t('accountAndSecurity')}</Text>
      </TouchableOpacity>
      <View style={styles.bodyAccount}>
        <Text style={styles.txtAccount}>{t('account')}</Text>
        <TouchableOpacity style={styles.userFrame}>
          <Image
            style={styles.imgAvatar}
            source={
              user && user.user.avatar
                ? {uri: user.user.avatar}
                : require('../../../../assets/diana.jpg')
            }
          />
          <Text style={styles.txtUser}>{t('personalInformation')}</Text>
          <Text style={styles.txtName}>{user.user.name}</Text>
          <Image
            style={styles.imgNext}
            source={require('../../../../assets/icon_next.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.emailFrame}>
          <Image
            style={styles.imgEmail}
            source={require('../../../../assets/account_bottomTab.png')}
          />
          <Text style={styles.txtEmail}>Email</Text>
          <Text style={styles.txtEmail2}>{user.user.email}</Text>
          <Image
            style={styles.imgNext2}
            source={require('../../../../assets/icon_next.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.qrFrame}>
          <Image
            style={styles.imgEmail}
            source={require('../../../../assets/qr-scan2.png')}
          />
          <Text style={styles.txtQr}>{t('myQRcode')}</Text>
          <Image
            style={styles.imgNext2}
            source={require('../../../../assets/icon_next.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bodySecurity}>
        <Text style={styles.txtAccount}>{t('security')}</Text>
        {/* <TouchableOpacity style={styles.qrFrame}>
          <Image
            style={styles.imgEmail}
            source={require('../../../../assets/icon_lock.png')}
          />
          <Text style={styles.txtEmail}>Xác thực 2 yếu tố</Text>
          <Image
            style={styles.imgNext2}
            source={require('../../../../assets/icon_next.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.qrFrame}>
          <Image
            style={styles.imgEmail}
            source={require('../../../../assets/icon_lock.png')}
          />
          <Text style={styles.txtQr}>Thiết bị đăng nhập</Text>
          <Image
            style={styles.imgNext2}
            source={require('../../../../assets/icon_next.png')}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} style={styles.qrFrame}>
          <Image
            style={styles.imgEmail}
            source={require('../../../../assets/icon_lock.png')}
          />
          <Text style={styles.txtEmail}>{t('changepassword')}</Text>
          <Image
            style={styles.imgNext}
            source={require('../../../../assets/icon_next.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountAndSecurity;
