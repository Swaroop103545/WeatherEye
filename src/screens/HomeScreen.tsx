import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { Header, SearchBar, WeatherCard } from '../components';
import { useWeather } from '../hooks/useWeather';
import { formatWeatherTime } from '../utils/helpers';
import { useTheme } from '../theme/ThemeContext';
import { colors } from '../theme/colors';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const { data, loading, fetchWeather } = useWeather();
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  const handleSearch = async () => {
    if (city.trim()) {
      try {
        await fetchWeather(city);
      } catch (err) {
        console.error("Error home:", err);
        Alert.alert('City not found', 'Please enter a valid city name', [
          { text: 'OK' },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
        {loading && <ActivityIndicator />}
        {data && (
          <WeatherCard
            city={data.name}
            time={formatWeatherTime(data.dt)}
            description={data.weather[0].description}
            temp={data.main.temp}
            icon={data.weather[0].icon}
            precipitation={data.clouds.all}
            windSpeed={data.wind.speed}
          />
        )}
      </View>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.black : colors.white,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      marginTop: 20,
      gap: 20,
      backgroundColor: isDarkMode ? colors.black : colors.white,
    },
  });

export default HomeScreen;
