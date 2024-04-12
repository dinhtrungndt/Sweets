/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

// styleCss
import {styles} from '../../styles/selectBB';
import {DataChonBB} from '../select/data/selectBB';
import Octicons from 'react-native-vector-icons/Octicons';
import {UserContext} from '../../../../../../contexts/user/userContext';
import {getListFriend} from '../../../../../../services/home/addsService';

const TabFriendUpLoad = ({navigation, cancel, getSelectTag}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {user} = useContext(UserContext);
  const [listFriend, setListFriend] = useState([]);
  const [loading, setLoading] = useState(false);

  const onGetListFriend = async () => {
    setLoading(true);
    const res = await getListFriend(user.id);
    // console.log('res', res);
    setListFriend(res);
    setLoading(false);
  };

  const handleOptionSelect = option => {
    const isSelected = selectedOptions.includes(option);
    if (isSelected) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([option]);
    }
  };

  const logSelectedUser = () => {
    if (selectedOptions.length > 0) {
      const selectedUser = listFriend.find(
        item => item.id === selectedOptions[0],
      );
      //   console.log('Người dùng đã chọn:', selectedUser);
      getSelectTag({selectedUser: selectedUser});
    } else {
      // console.log('Chưa chọn người dùng nào');
    }
  };

  const groupedData = {};
  listFriend.forEach(item => {
    const firstLetter = item.name[0].toUpperCase();
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = [];
    }
    groupedData[firstLetter].push(item);
  });

  Object.keys(groupedData).forEach(key => {
    groupedData[key] = groupedData[key].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  });

  useEffect(() => {
    onGetListFriend();
  }, []);

  useEffect(() => {
    logSelectedUser();
  }, [selectedOptions]);

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={cancel}>
            <Octicons name="x" size={25} color="#000" style={{marginTop: 5}} />
          </TouchableOpacity>
          <View style={{paddingLeft: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000'}}>
              Chọn bạn
            </Text>
            <Text>Đã chọn: {selectedOptions.length ? 1 : 0}/1</Text>
          </View>
        </View>
        <TouchableOpacity onPress={cancel}>
          <Image
            source={require('../../../../../../assets/yes_chonban_icon.png')}
            style={[styles.iconBack, {width: 27, height: 27, marginTop: 0}]}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.lineHr} />
      {/* body */}
      <View style={styles.body}>
        <Image
          style={{width: 20, height: 20, marginLeft: 15}}
          source={require('../../../../../../assets/icon_search_selectBB.png')}
        />
        <TextInput
          type="text"
          placeholder="Tìm kiếm"
          style={{paddingLeft: 15, width: '80%', height: 40, fontSize: 16}}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="small" color="#22b6c0" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.keys(groupedData).map(key => (
            <View key={key}>
              <Text style={styles.body_content_text}>{key}</Text>
              {groupedData[key].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOptionSelect(item.id)}>
                  <View style={[styles.body_content]}>
                    <View style={[styles.radioContainer]}>
                      {selectedOptions.includes(item.id) && (
                        <View style={styles.radioSelected} />
                      )}
                    </View>
                    <Image
                      style={styles.body_content_icon}
                      source={{uri: item.avatar}}
                    />
                    <Text style={styles.body_content_text}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TabFriendUpLoad;
