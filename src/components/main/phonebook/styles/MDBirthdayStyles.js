import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.02)', // Màu nền xám, tăng độ trong suốt
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 1,
    right: 16,
    padding: 8,
    backgroundColor: '#3498db', // Màu chủ đạo
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Màu chủ đạo cho văn bản nút đóng
  },
  dateButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#3498db', // Màu chủ đạo cho văn bản ngày
  },
  flatListItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 5,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db', // Màu chủ đạo
  },
  dayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50', // Màu chủ đạo
  },
  todayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c', // Màu chủ đạo
  },
  selectedDayContainer: {
    backgroundColor: '#3498db', // Màu chủ đạo cho ngày được chọn
    borderRadius: 5,
    padding: 8,
  },
  selectedDayText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff', // Màu chủ đạo cho văn bản ngày được chọn
  },
});

export default styles;
