import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styles from '../styles/MDBirthdayStyles'; // Đảm bảo bạn import styles từ file của bạn

LocaleConfig.locales['en'] = {
  monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  dayNames: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay'
};

const SinhNhat = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapContent}>
        <TouchableOpacity style={styles.friendItem}>
          <Image source={require('../../../../assets/icon_back.png')} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.txtContent1}>Sinh nhật</Text>
        <TouchableOpacity style={styles.friendItem} >
          <Image source={require('../../../../assets/option.png')} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#DBEAFF' }}>
          <View style={styles.wrapContent2}>
            <Image source={require('../../../../assets/people.png')} style={styles.avatar2} />
            <Image source={require('../../../../assets/happy-birthday.png')} style={styles.avatar2} />
            <Image source={require('../../../../assets/boy.png')} style={styles.avatar2} />
          </View>

          <Calendar
  onDayPress={(day) => {
    console.log('selected day', day);
  }}
  monthFormat={'MMMM yyyy'}
  hideExtraDays={true}
  disableMonthChange={true}
  firstDay={1}
  style={styles.Calendar}
  hideDayNames={false}
  showWeekNumbers={true}
  onPressArrowLeft={(subtractMonth) => subtractMonth()}
  onPressArrowRight={(addMonth) => addMonth()}
  theme={{
    textSectionTitleColor: '#2ecc71', // Màu xanh lá cây
    selectedDayBackgroundColor: '#3498db', // Màu xanh dương
    selectedDayTextColor: '#ffffff', // Màu trắng
    todayTextColor: '#e74c3c', // Màu đỏ
    todayBackgroundColor:'#CCE1FF',
    dayTextColor: 'blue', // Màu xanh dương nhạt
    textDisabledColor: '#d9e1e8', // Màu xám
    dotColor: '#f39c12', // Màu vàng
    selectedDotColor: '#ffffff', // Màu trắng
    arrowColor: '#9b59b6', // Màu tím
    monthTextColor: '#f39c12', // Màu vàng
  }}
/>



          <View style={styles.wrapInfoUser}>
            <Text style={styles.txtTitle}> Sinh nhật hôm nay</Text>
            <Image source={require('../../../../assets/happy-birthday.png')} style={styles.avatar2} />
            <Text style={styles.txtContentInfoUser}> Thông tin người sinh nhật </Text>
            
          </View>
        </View>

        <View>
        <Text style={styles.txtTitle}> Sinh nhật sắp tới </Text>
           
            <Text style={styles.txtContentInfoUser}> Thông tin người sinh nhật </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SinhNhat;
