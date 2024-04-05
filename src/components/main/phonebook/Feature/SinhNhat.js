import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import styles from '../styles/MDBirthdayStyles';

LocaleConfig.locales['en'] = {
  monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  dayNames: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay'
};

const SinhNhat = () => {
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [showAllBirthdays, setShowAllBirthdays] = useState(false);

  useEffect(() => {
    const fetchUpcomingBirthdays = async () => {
      try {
        const currentFriendsBirthdays = await AsyncStorage.getItem('currentFriendsBirthdays');
        console.log('log ngày sinh', currentFriendsBirthdays)
        if (currentFriendsBirthdays) {
          const parsedBirthdays = JSON.parse(currentFriendsBirthdays);
  
          const today = moment().startOf('day');
          const upcoming = parsedBirthdays.map(birthdayData => {
            const { name, birthday, avatar } = birthdayData;
            const [day, month] = birthday.split('/');
            const birthdayDate = moment().set({
              'date': parseInt(day),
              'month': parseInt(month) - 1
            });
  
            // Kiểm tra xem ngày sinh nhật có nằm trong năm hiện tại không
            if (birthdayDate.isSame(today, 'year')) {
              const daysUntilBirthday = birthdayDate.diff(today, 'days');
              return { name, daysUntilBirthday, avatar };
            } else {
              // Nếu sinh nhật nằm trong năm sau, trả về null
              return null;
            }
          });
  
          // Lọc bỏ các sinh nhật null và các sinh nhật đã qua
          const filteredBirthdays = upcoming.filter(birthdayData => birthdayData !== null && birthdayData.daysUntilBirthday >= 0);
  
          setUpcomingBirthdays(filteredBirthdays);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sinh nhật từ AsyncStorage:', error);
      }
    };
  
    fetchUpcomingBirthdays();
  }, []);
  
  

  const getMarkedDates = () => {
    const markedDates = {};
    upcomingBirthdays.forEach(birthdayData => {
      const { daysUntilBirthday } = birthdayData;
      const birthday = moment().add(daysUntilBirthday, 'days');
      const formattedBirthday = birthday.format('YYYY-MM-DD');
      markedDates[formattedBirthday] = { dotColor: 'red', marked: true };
    });

    const today = moment().format('YYYY-MM-DD');
    markedDates[today] = { selected: true, selectedColor: '#e74c3c', marked: true };

    return markedDates;
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapContent}>
        <TouchableOpacity style={styles.friendItem}>
          <Image source={require('../../../../assets/icon_back.png')} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.txtContent1}>Sinh nhật</Text>
        <TouchableOpacity style={styles.friendItem}>
          <Image source={require('../../../../assets/option.png')} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#77d6c0' }}>
          <View style={styles.wrapContent2}>
            <Image source={require('../../../../assets/people.png')} style={styles.avatar2} />
            <Image source={require('../../../../assets/happy-birthday.png')} style={styles.avatar2} />
            <Image source={require('../../../../assets/boy.png')} style={styles.avatar2} />
          </View>

          <Calendar
            monthFormat={'MMMM yyyy'}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            style={styles.Calendar}
            hideDayNames={false}
            showWeekNumbers={true}
            markedDates={getMarkedDates()}
            theme={{
              textSectionTitleColor: '#2ecc71',
              selectedDayBackgroundColor: '#3498db',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#e74c3c',
              todayBackgroundColor: '#CCE1FF',
              dayTextColor: 'blue',
              textDisabledColor: '#d9e1e8',
              dotColor: '#f39c12',
              selectedDotColor: '#ffffff',
              arrowColor: '#9b59b6',
              monthTextColor: '#f39c12',
            }}
          />

          <View style={styles.wrapInfoUser}>
            <Text style={styles.txtTitle}> Sinh nhật hôm nay</Text>
            <Image source={require('../../../../assets/box.png')} style={styles.avatar3} />
            <Text style={{alignSelf:'center',}}>Không có bạn bè sinh nhật hôm nay </Text>
          </View>
        </View>

        <View>
          <Text style={styles.txtTitle}> Sinh nhật sắp tới </Text>

          {showAllBirthdays ? (
            upcomingBirthdays.map((birthdayData, index) => (
              <View 
              style={{ flexDirection: 'row' ,margin:7}}
              key={index}>
                <Image source={{ uri: birthdayData.avatar }} style={{width: 60, height: 60, borderRadius: 30 }} />
                <Text style={styles.txtContentInfoUser2}>
                  {birthdayData.name} - Còn {birthdayData.daysUntilBirthday} ngày
                </Text>
              </View>
            ))
          ) : (
            upcomingBirthdays.slice(0, 1).map((birthdayData, index) => (
              <View key={index}
              style={{ flexDirection: 'row' ,margin:7}}
              >
                <Image source={{ uri: birthdayData.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                <Text style={styles.txtContentInfoUser2}>
                  {birthdayData.name} - Còn {birthdayData.daysUntilBirthday} ngày
                </Text>
              </View>
            ))
          )}
          {!showAllBirthdays && upcomingBirthdays.length > 1 && (
            <TouchableOpacity onPress={() => setShowAllBirthdays(true)}>
              <Text style={{ textAlign: 'center', color: 'blue', marginTop: 1 }}>Xem tất cả</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SinhNhat
