import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Keyboard } from 'react-native';
import { Header, SearchBar, WeatherCard, ErrorModal } from '../components';
import { useWeather } from '../hooks/useWeather';
import { formatWeatherTime } from '../utils/helpers';
import { useTheme } from '../theme/ThemeContext';
import { colors } from '../theme/colors';
import type { SearchBarRef } from '../components/SearchBar';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { data, forecast, loading, error, fetchWeather, lastSuccessfulCity } = useWeather();
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  const searchBarRef = useRef<SearchBarRef>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setShowError(true);
      if (lastSuccessfulCity) {
        fetchWeather(lastSuccessfulCity);
      }
    }
  }, [error, lastSuccessfulCity]);

  const handleSearch = async () => {
    if (!city.trim()) {
      setErrorMessage('Please enter a city name');
      setShowError(true);
      return;
    }

    try {
      Keyboard.dismiss();
      await fetchWeather(city);
    } catch (err: any) {
      console.error('Search Error:', err);
      setErrorMessage(err.message || 'Failed to fetch weather data');
      setShowError(true);
    }
  };

  const handleTryAgain = () => {
    setShowError(false);
    searchBarRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <SearchBar 
          ref={searchBarRef}
          city={city} 
          setCity={setCity} 
          handleSearch={handleSearch} 
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={isDarkMode ? colors.orange : colors.primary} />
          </View>
        )}
        {!loading && data && (
          <WeatherCard
            city={data.name}
            time={formatWeatherTime(data.dt)}
            description={data.weather[0].description}
            temp={data.main.temp}
            icon={data.weather[0].icon}
            precipitation={data.clouds.all}
            windSpeed={data.wind.speed}
            forecast={forecast || []}
          />
        )}
        <ErrorModal
          visible={showError}
          message={errorMessage}
          onClose={() => setShowError(false)}
          onTryAgain={handleTryAgain}
        />
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
      padding: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default HomeScreen;
