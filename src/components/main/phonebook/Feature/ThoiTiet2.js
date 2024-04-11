import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, Image, ImageBackground, Animated, } from 'react-native';
import AxiosInstance from '../../../../helper/AxiosinstanceText';
import styles from '../styles/ThoiTiet2Styles';
import WeatherImages from './WeatherImage';
const ThoiTiet2 = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [cities, setCities] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [isTextInputVisible, setIsTextInputVisible] = useState(true);
    const translateX = useState(new Animated.Value(isTextInputVisible ? 0 : 100))[0];
    useEffect(() => {
        if (searchQuery !== '') {
            setIsTextInputVisible(true);
            fetchCities();
        } else {
            setIsTextInputVisible(false);
            setCities([]);
        }
    }, [searchQuery]);
    const fetchCities = async () => {
        try {
            const response = await AxiosInstance().get(
                `/search.json?q=${searchQuery}&key=594cc383eccf486bb74111416240704`
            );
            setCities(response);
            console.log('responseS', response)
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };
    const toggleTextInputVisibility = () => {
        setIsTextInputVisible(!isTextInputVisible);
        Animated.timing(translateX, {
            toValue: isTextInputVisible ? 100 : 0,
            duration: 200, // Adjust duration for desired animation speed
        },
        setWeatherData('')
        ).start();
    };
    const fetchWeather = async (country) => {
        try {
            const response = await AxiosInstance().get(
                `/current.json?key=594cc383eccf486bb74111416240704&q=${country}&aqi=no`
            );
            setWeatherData(response);
            console.log('rresponseresponse', response)
            setSearchQuery('')
            setCities([])
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    const renderWeatherInfo = () => {
        if (!weatherData) {
            return null;
        }

        return (
            <View style={styles.weatherInfo}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'white' }}>{weatherData.location.name}, </Text>
                    <Text style={styles.locationText}>{weatherData.location.country}</Text>
                </View>

                <Image source={WeatherImages[weatherData.current.condition.text]} style={styles.weatherIcon} />
                <Text style={styles.temperatureText}>{weatherData.current.temp_c}°</Text>

                <Text style={styles.conditionText}>{weatherData.current.condition.text}</Text>

                <View style={{ flexDirection: 'row',margin:5 }}>


                    <View style={{ flexDirection: 'row',marginHorizontal:20 }}>
                        <Image source={require('../../../../assets/wind.png')} style={styles.weatherIcon2} />
                        <Text style={styles.txtInfo}>{weatherData.current.wind_kph}km</Text>
                    </View>
                    <View style={{ flexDirection: 'row' ,marginHorizontal:20}}>
                        <Image source={require('../../../../assets/water.png')} style={styles.weatherIco2} />
                        <Text style={styles.txtInfo}>{weatherData.current.humidity}%</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row' ,margin:5}}>
                    <View style={{ flexDirection: 'row' ,marginHorizontal:20}}>
                        <Image source={require('../../../../assets/wind.png')} style={styles.weatherIcon2} />
                        <Text style={styles.txtInfo}>{weatherData.location.localtime}p</Text>
                    </View>
                    <View style={{ flexDirection: 'row',marginHorizontal:20 }}>
                        <Image source={require('../../../../assets/F.png')} style={styles.weatherIco2} />
                        <Text style={styles.txtInfo}>{weatherData.current.temp_f}F</Text>
                    </View>
                </View>
                {/* Thêm các thông tin khác của thời tiết nếu cần */}
            </View>
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => fetchWeather(item.country)}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../../../assets/location.png')} style={{ marginHorizontal: 10 }} />
                <Text style={styles.cityName}>{item.name}, {item.country}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../../assets/bg1.png')} style={styles.background}>


                <TouchableOpacity style={styles.toggleButton} onPress={toggleTextInputVisibility}>
                    {isTextInputVisible ? (
                        <Image source={require('../../../../assets/hint.png')} style={styles.imageStyle} />
                    ) : (
                        <Image source={require('../../../../assets/seen.png')} style={styles.imageStyle} />
                    )}
                </TouchableOpacity>
                <Animated.View style={{ transform: [{ translateX }] }}>
                    {isTextInputVisible && (
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập tên thành phố..."
                            placeholderTextColor="gray"
                            onChangeText={(text) => setSearchQuery(text)}
                            value={searchQuery}
                        />
                    )}
                </Animated.View>


                <FlatList
                    style={{ width: '90%', display: isTextInputVisible ? 'flex' : 'none' }}
                    data={cities}
                    renderItem={renderItem}

                    keyExtractor={(item) => item.id.toString()}
                />
                {renderWeatherInfo()}
            </ImageBackground>
        </View>
    );
};



export default ThoiTiet2;
