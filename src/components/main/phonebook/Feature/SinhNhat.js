import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
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

const SinhNhat = (props) => {
  const { navigation } = props;
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [showAllBirthdays, setShowAllBirthdays] = useState(false);
  const [birthdaysByMonth, setBirthdaysByMonth] = useState({});
  const [allBirthdays, setallBirthdays] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBirthdayName, setSelectedBirthdayName] = useState('');
  const [modalData, setModalData] = useState(null);
  //const allBirthdays = [];
  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
  useEffect(() => {
    const fetchUpcomingBirthdays = async () => {
      try {
        const currentFriendsBirthdays = await AsyncStorage.getItem('currentFriendsBirthdays');
        console.log('currentFriendsBirthdaysss', currentFriendsBirthdays)

        if (currentFriendsBirthdays) {
          const parsedBirthdays = JSON.parse(currentFriendsBirthdays);
          const today = moment().startOf('day');

          const birthdaysGroupedByMonth = parsedBirthdays.reduce((acc, birthdayData) => {
            const { name, birthday, avatar,id } = birthdayData;

            if (birthday && typeof birthday === 'string') {
              const [day, month] = birthday.split('/');
              const birthdayDate = moment().set({
                'date': parseInt(day),
                'month': parseInt(month) - 1
              });

              if (!isNaN(birthdayDate)) {
                if (birthdayDate.isSame(today, 'year')) {
                  setallBirthdays([...allBirthdays, birthdayDate]);

                  const daysUntilBirthday = birthdayDate.diff(today, 'days');
                  const monthKey = birthdayDate.format('MM');
                  acc[monthKey] = acc[monthKey] || [];
                  // Kiểm tra xem ngày sinh nhật có trùng với ngày hiện tại không
                  if (birthdayDate.isSame(today, 'day')) {
                    // Nếu trùng, thêm vào mảng upcomingBirthdays
                    setUpcomingBirthdays(prevState => [
                      ...prevState,
                      { name, daysUntilBirthday, avatar,id }

                    ]);
                    //console.log('uupcomingBirthdays5', name, daysUntilBirthday, avatarmingBirthdays)
                  }
                  acc[monthKey].push({ name, daysUntilBirthday, avatar,id });
                }
              }


            }

            console.log('allBirthdays', allBirthdays)
            return acc;
          }, {});

          // Sắp xếp theo thứ tự tháng tăng dần
          const sortedBirthdaysByMonth = Object.entries(birthdaysGroupedByMonth).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          setBirthdaysByMonth(sortedBirthdaysByMonth.reduce((acc, [monthKey, birthdays]) => {
            acc[monthKey] = birthdays;
            return acc;
          }, {}));
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sinh nhật từ AsyncStorage:', error);
      }
    };

    fetchUpcomingBirthdays();
  }, []);

  const getFormattedDate = (isoDateString) => {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getUTCFullYear();
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = dateObject.getUTCDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const getMarkedDates = () => {
    const markedDates = {};
    console.log('allBirthdays',allBirthdays)
    allBirthdays.forEach(birthdayData => {
      const formattedBirthday = moment(birthdayData).format('YYYY-MM-DD');
      markedDates[formattedBirthday] = { dotColor: 'red', marked: true, birthdayName: birthdayData.name };
    });

    const today = moment().format('YYYY-MM-DD');
    markedDates[today] = { selected: true, selectedColor: '#e74c3c', marked: true };

    return markedDates;
  };
  const handleDayPress = async (day) => {
    const currentFriendsBirthdays = await AsyncStorage.getItem('currentFriendsBirthdays');
    const parsedBirthdays = JSON.parse(currentFriendsBirthdays);
    console.log('currentFriendsBirthdaysssssssd2',parsedBirthdays)
    console.log('ffff')
    
    if (parsedBirthdays) {
      console.log('ffff2')
      let isBirthdayFound = false; // Biến để kiểm tra xem có sinh nhật nào trong ngày được chọn không
      
      parsedBirthdays.forEach((item) => {
        const formattedBirthday = moment(item.birthday, 'DD/MM/YYYY').format('MM-DD');
        if (formattedBirthday === moment(day.dateString).format('MM-DD')) {
          setSelectedBirthdayName(item.name); // Cập nhật tên của người được chọn
          setIsModalOpen(true); // Mở modal
          setModalData(item); // Thiết lập modalData với dữ liệu của sinh nhật cụ thể được chọn
          console.log('mod222', modalData);
          isBirthdayFound = true;
        }
      });
      
      if (!isBirthdayFound) {
        // Nếu không tìm thấy sinh nhật nào trong ngày được chọn, hiển thị thông báo
        console.log('mod',modalData)
        Alert.alert('Không có sinh nhật trong ngày này');
      }
    }
  };
  
  const handleGiftNavigation = (birthdayData) => {
    console.log('.......',birthdayData)
    // Chuyển đến màn hình "Gift" và truyền thông tin của item được nhấn
    navigation.navigate('Gift', { birthdayData: birthdayData });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.wrapContent}>
        <TouchableOpacity style={styles.friendItem} onPress={() => navigation.navigate('PhoneBookScreen')}>
          <Image source={require('../../../../assets/icon_back.png')} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.txtContent1}>Sinh nhật</Text>
        <TouchableOpacity style={styles.friendItem} onPress={() => navigation.navigate('ListSinhNhat')}>
          <Image source={require('../../../../assets/option.png')} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: '#F0F8FF' }}>
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
            onDayPress={handleDayPress}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.txtTitle}>Sinh nhật hôm nay</Text>
              <Text style={styles.txtTitle1}>Tổng {upcomingBirthdays.length} (Ngày sinh nhật)</Text>
            </View>


            {upcomingBirthdays.length > 0 ? (
              <View>
                {upcomingBirthdays.map((birthdayData, index) => (
                  <View key={index} style={{ flexDirection: 'row', margin: 7, alignItems: 'center' }}>
                    <Image source={{ uri: birthdayData.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.txtContentInfoUser3}>
                        {birthdayData.name}
                      </Text>
                      <TextInput
                        style={styles.inputWish}
                        placeholder="Nhập lời chúc..."
                        placeholderTextColor="#a8a8a8"
                        multiline={true}
                        numberOfLines={2}
                        onChangeText={(text) => handleWishChange(text, index)}
                      />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                  
                      <TouchableOpacity style={{ alignSelf: 'center' }}  onPress={() => handleGiftNavigation(birthdayData)}>
                        <Image source={require('../../../../assets/icon_edit.png')} style={{ width: 30, height: 30, borderRadius: 15 }} />
                      </TouchableOpacity>
                     
                      <TouchableOpacity style={{ width: 75, height: 35, backgroundColor: '#22b6c0', borderRadius: 10 }}>
                        <Text style={{ color: 'white', alignSelf: 'center', fontWeight: 'bold', marginVertical: 5 }}>Đăng</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={{ alignSelf: 'center' }}>Không có bạn bè sinh nhật hôm nay</Text>
            )}

          </View>
        </View>

        <View>
          <Text style={styles.txtTitle}> Sinh nhật sắp tới </Text>

          {Object.entries(birthdaysByMonth).map(([monthKey, birthdays]) => (
            <View key={monthKey}>
              <View style={styles.wrapDay}>
                <Text style={{ fontWeight: 'bold', marginLeft: 10, color: 'white' }}>
                  {monthNames[parseInt(monthKey) - 1]}
                </Text>
                <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'white' }}>
                  Tổng: {birthdays.length}
                </Text>
              </View>
              {showAllBirthdays ? (
                birthdays.map((birthdayData, index) => (
                  <View
                    style={{ flexDirection: 'row', margin: 7, justifyContent: 'space-between' }}
                    key={index}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image source={{ uri: birthdayData.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                      <Text style={styles.txtContentInfoUser2}>
                        {birthdayData.name}
                      </Text>
                    </View>
                    <Text style={styles.imvCheck}>
                      {birthdayData.daysUntilBirthday === 0 ? 'Hôm nay' : `còn ${birthdayData.daysUntilBirthday} ngày`}
                    </Text>
                  </View>
                ))
              ) : (
                birthdays.slice(0, 1).map((birthdayData, index) => (
                  <View key={index}
                    style={{ flexDirection: 'row', margin: 7 }}
                  >
                    <Image source={{ uri: birthdayData.avatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
                    <Text style={styles.txtContentInfoUser2}>
                      {birthdayData.name} - {birthdayData.daysUntilBirthday === 0 ? 'Hôm nay' : `Còn ${birthdayData.daysUntilBirthday} ngày`}
                    </Text>
                  </View>
                ))
              )}
            </View>
          ))}

          {!showAllBirthdays && Object.values(birthdaysByMonth).flat().length > 1 && (
            <TouchableOpacity onPress={() => setShowAllBirthdays(true)}>
              <Text style={{ textAlign: 'center', color: 'blue', marginTop: 1 }}>Xem tất cả</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Modal
  visible={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  transparent={true}
  animationType="slide"
  onBackdropPress={() => setIsModalOpen(false)} // Đóng modal khi click ra ngoài
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      {modalData && (
        <>
          <Image source={{ uri: modalData.avatar }} style={styles.avatars} />
          <Text style={styles.modalText}>Sinh nhật của {modalData.name}</Text>
          <TouchableOpacity onPress={() => setIsModalOpen(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
</Modal>

    </View>
  );
};

export default SinhNhat;
