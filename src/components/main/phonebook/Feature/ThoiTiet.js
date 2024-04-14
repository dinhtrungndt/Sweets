import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Image,
  Alert, TouchableOpacity
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AxiosInstance from '../../../../helper/AxiosWeather';
import { format, getDay, parseISO } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
const ThoiTiet = (props) => {
  const { navigation } = props;
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    // Kiểm tra và yêu cầu quyền truy cập vị trí khi thành phần được tạo
    checkLocationPermission();
  }, []);


  useEffect(() => {
    // Kiểm tra và yêu cầu quyền truy cập vị trí khi thành phần được tạo
    checkLocationPermission();
    // Cập nhật ngày giờ hiện tại mỗi giây
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Hủy bỏ interval khi component bị hủy
  }, []);

  const checkLocationPermission = async () => {
    try {
      const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        // Quyền đã được cấp, lấy vị trí
        fetchLocation();
      } else {
        // Quyền chưa được cấp, yêu cầu quyền
        const permissionResult = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (permissionResult === RESULTS.GRANTED) {
          fetchLocation();
        } else {
          console.warn('Quyền truy cập vị trí bị từ chối.');
          Alert.alert('Lỗi', 'Có lỗi xảy ra khi truy cập định vị của bạn.');
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra quyền truy cập vị trí:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi truy cập định vị của bạn.');
      setLoading(false);
    }
  };

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchWeatherData(latitude, longitude);
      },
      error => {
        console.error('Lỗi khi lấy vị trí:', error);
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi lấy dữ liệu thời tiết.Hãy bật định vị của bạn.');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      // Sử dụng AxiosInstance để thực hiện HTTP request để lấy dữ liệu thời tiết
      const response = await AxiosInstance().get(
        `weather?lat=${lat}&lon=${lon}&lang=vi&appid=b0e86008293e7c25b2deb2caa5a36b0c`,
      );

      //console.log('Weather Data:', response);

      // Xử lý dữ liệu thời tiết ở đây (setWeatherData(response.data))
      setWeatherData(response);
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu thời tiết:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi lấy dữ liệu thời tiết. Vui lòng kiểm tra lại định vị của bạn.');
      setLoading(false);
    }
  };

  const isDayTime = () => {
    // (phần kiểm tra thời gian ngày/đêm ở đây)
    // ...
  };

  const getBackgroundColor = () => {
    return isDayTime() ? '#87CEEB' : '#2E2E2E';
  };

  const getTemperatureColor = () => {
    return isDayTime() ? 'black' : 'white';
  };


  return (
    <ImageBackground
      source={require('../../../../assets/bg1.png')}
      style={styles.background}>
      <View style={styles.container}>

        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <>
            {/* <Text style={styles.locationText}>
              {location && `Vị trí hiện tại: ${location.latitude}, ${location.longitude}`}
            </Text> */}
            {/* Hiển thị dữ liệu thời tiết ở đây */}
            {weatherData && (
              <View>
                <View style={{ flexDirection: 'row', padding: 4 }}>

                  <TouchableOpacity style={styles.friendItem2} onPress={() => navigation.navigate('PhoneBookScreen')}>
                    <Image source={require('../../../../assets/icon_back.png')} style={styles.avatar} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.friendItem} onPress={() => navigation.navigate('ThoiTiet2')}>
                    <Text style={{ fontSize: 15, color: 'black', padding: 1 }}>Xem thêm</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.weatherContainer}>





                  <View style={styles.header}>
                    <Text style={styles.cityText}>
                      {weatherData.name}, {weatherData.sys.country}
                    </Text>
                    <Text style={styles.dateTimeText}>
                      {format(currentDateTime, "eeee, d MMMM HH:mm")}
                    </Text>
                  </View>
                 
                </View>



             
                <View style={styles.weatherInfo}>
                    <Image
                      source={{
                        uri: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
                      }}
                      style={styles.weatherIcon}
                    />
                    <Text style={styles.temperatureText}>
                       {(weatherData.main.temp - 273.15).toFixed(2)} °
                    </Text>
                  </View>

                  <View style={styles.weatherInfo2}>
                 

                  
                 <View style={{ flexDirection: 'row', margin: 15 }}>


                   <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                     <Image source={require('../../../../assets/wind.png')} style={styles.weatherIcon2} />
                     <Text style={styles.txtInfo}>{weatherData.wind.speed}km</Text>
                   </View>
                   <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                     <Image source={require('../../../../assets/water.png')} style={styles.weatherIco2} />
                     <Text style={styles.txtInfo}>{weatherData.main.humidity}%</Text>
                   </View>

                 </View>

                 <View style={{ flexDirection: 'row', margin: 15 }}>
                   <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                     <Image source={require('../../../../assets/clock.png')} style={styles.weatherIcon2} />
                     <Text style={styles.txtInfo}>{weatherData.timezone}</Text>
                   </View>
                   <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
                     <Image source={require('../../../../assets/cluold.png')} style={styles.weatherIco2} />
                     <Text style={styles.txtInfo}>{weatherData.clouds.all}</Text>
                   </View>
                 </View>
                 {/* Thêm các thông tin khác của thời tiết nếu cần */}
               </View>


              </View>

            )}
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  dateTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cce1ff',
    marginBottom: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  locationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 20,
  },


  weatherContainer: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  weatherInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cityText: {
    fontSize: 37,
    fontWeight: 'bold',
    color: 'yellow',
    fontFamily: 'Arial, sans-serif',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  
  dateTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cce1ff',
    alignSelf:'center'
  },
  weatherIcon: {
    width: 250,
    height: 250,
    marginRight: 10,
  },
  temperatureText: {
    fontSize: 90,
   
    color: 'white',
  },

  wrapContent1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#22b6c0',

  },

  friendItem2: {
    padding: 6,
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 3
  },
  friendItem: {
    padding: 6,
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginLeft: 10
  },
  avatar: {
    width: 15,
    height: 15,
  },

  txtContent1: {
    fontSize: 19,
    fontWeight: 'bold',

    marginRight: 116

  },
  txtInfo:{
    color:'white',
    marginHorizontal:10,
    fontSize:17
},
weatherInfo2: {
     
  alignItems: 'center',
  width:'90%'

 

},
});

export default ThoiTiet;
