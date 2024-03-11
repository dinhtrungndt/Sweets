/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

// styleCss
import {styles} from '../../styles/selectBB';
import {DataChonBB} from './data/selectBB';

const SelectBB = props => {
  const {navigation} = props;
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Group and sort the data alphabetically
  const groupedData = {};
  DataChonBB.forEach(item => {
    const firstLetter = item.name[0].toUpperCase();
    if (!groupedData[firstLetter]) {
      groupedData[firstLetter] = [];
    }
    groupedData[firstLetter].push(item);
  });

  // Sort each group
  Object.keys(groupedData).forEach(key => {
    groupedData[key] = groupedData[key].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  });

  return (
    <View style={styles.T}>
      {/* header */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../../../../assets/icon_delete.png')}
              style={styles.iconBack}
            />
          </TouchableOpacity>
          <View style={{paddingLeft: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000'}}>
              Chọn bạn
            </Text>
            <Text>Đã chọn: {selectedOptions.length}/100</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
          style={{paddingLeft: 15}}
        />
      </View>

      {/* Display grouped and sorted data */}
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
                    source={item.avatar}
                  />
                  <Text style={styles.body_content_text}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SelectBB;
