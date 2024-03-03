import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import styles from '../styles/MDBirthdayStyles';

LocaleConfig.locales['en'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today'
};

LocaleConfig.defaultLocale = 'en';

const MyModal = ({ isVisible, onClose }) => {
  const data = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
    { id: '4', name: 'Item 4' },
    // Add more items as needed
  ];

  return (
    <Modal visible={isVisible} transparent animationType="slide" onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.dateButton}>Kiểm tra sinh nhật</Text>
          <Calendar
            onDayPress={(day) => {
              console.log('selected day', day);
            }}
            monthFormat={'MMMM yyyy'}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={1}
            hideDayNames={false}
            showWeekNumbers={true}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
          />
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.flatListItem}>
                <Text>{item.name}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            pagingEnabled={false}
            snapToInterval={50}
            snapToAlignment="start"
            decelerationRate="fast"
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              console.log('FlatList height:', height);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;
