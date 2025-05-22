import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import Images from '../../assets';
import { useTheme } from '../theme/ThemeContext';
import { getWeatherIconUrl } from '../utils/helpers';
import { LinearGradient } from 'expo-linear-gradient';

type WeatherCardProps = {
  city: string;
  description: string;
  time: string;
  temp: number;
  icon: string;
  precipitation: number;
  windSpeed: number;
  forecast?: Array<{
    date: string;
    temp: number;
    icon: string;
    description: string;
  }>;
};

const { width } = Dimensions.get('window');

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  description,
  time,
  temp,
  icon,
  precipitation,
  windSpeed,
  forecast = [],
}) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} testID="weather-card-scroll">
      <LinearGradient
        colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#ffffff', '#f5f5f5']}
        style={styles.card}
        testID="weather-card-gradient"
      >
        <View style={styles.header} testID="weather-card-header">
          <Text style={styles.city} testID="weather-card-city">{city}</Text>
          <Text style={styles.description} testID="weather-card-description">{`${time}, ${description}`}</Text>
        </View>

        <View style={styles.mainWeather} testID="weather-card-main">
          <View style={styles.tempContainer} testID="weather-card-temp-container">
            <Text style={styles.temp} testID="weather-card-temp">{Math.round(temp)}°</Text>
            <Text style={styles.tempUnit} testID="weather-card-temp-unit">C</Text>
          </View>
          <Image
            source={{ uri: getWeatherIconUrl(icon) }}
            style={styles.weatherIcon}
            resizeMode="contain"
            testID="weather-card-icon"
          />
        </View>

        <View style={styles.weatherInfo} testID="weather-card-info">
          <View style={styles.infoItem} testID="weather-card-precipitation">
            <Image source={Images.precipitation} style={styles.subIcon} />
            <View>
              <Text style={styles.infoValue} testID="weather-card-precipitation-value">{precipitation}%</Text>
              <Text style={styles.infoLabel}>Precipitation</Text>
            </View>
          </View>

          <View style={styles.infoItem} testID="weather-card-wind">
            <Image source={Images.wind} style={styles.subIcon} />
            <View>
              <Text style={styles.infoValue} testID="weather-card-wind-value">{windSpeed} km/h</Text>
              <Text style={styles.infoLabel}>Wind Speed</Text>
            </View>
          </View>
        </View>

        {forecast.length > 0 && (
          <View style={styles.forecastContainer} testID="weather-card-forecast">
            <Text style={styles.forecastTitle} testID="weather-card-forecast-title">7-Day Forecast</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.forecastScroll}
              testID="weather-card-forecast-scroll"
            >
              {forecast.map((day, index) => (
                <View key={index} style={styles.forecastItem} testID={`weather-card-forecast-item-${index}`}>
                  <Text style={styles.forecastDate} testID={`weather-card-forecast-date-${index}`}>{day.date}</Text>
                  <Image
                    source={{ uri: getWeatherIconUrl(day.icon) }}
                    style={styles.forecastIcon}
                    resizeMode="contain"
                    testID={`weather-card-forecast-icon-${index}`}
                  />
                  <Text style={styles.forecastTemp} testID={`weather-card-forecast-temp-${index}`}>{Math.round(day.temp)}°</Text>
                  <Text style={styles.forecastDescription} numberOfLines={1} testID={`weather-card-forecast-description-${index}`}>
                    {day.description}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </LinearGradient>
    </ScrollView>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    card: {
      borderRadius: 24,
      padding: 20,
      margin: 16,
      shadowColor: colors.black,
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 12,
      elevation: 8,
    },
    header: {
      marginBottom: 20,
    },
    city: {
      fontSize: 32,
      fontWeight: '700',
      color: isDarkMode ? colors.white : colors.black,
      marginBottom: 4,
    },
    description: {
      fontSize: 16,
      color: isDarkMode ? colors.seaShellGrey : colors.greyMsg,
      fontWeight: '400',
    },
    mainWeather: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    tempContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    temp: {
      fontSize: 72,
      fontWeight: '700',
      color: isDarkMode ? colors.white : colors.black,
    },
    tempUnit: {
      fontSize: 24,
      fontWeight: '600',
      color: isDarkMode ? colors.white : colors.black,
      marginTop: 16,
    },
    weatherIcon: {
      width: 100,
      height: 100,
    },
    weatherInfo: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: isDarkMode ? colors.gradientGray : colors.gradientBlack,
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    subIcon: {
      width: 32,
      height: 32,
      marginRight: 12,
    },
    infoValue: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? colors.white : colors.black,
    },
    infoLabel: {
      fontSize: 14,
      color: isDarkMode ? colors.seaShellGrey : colors.greyMsg,
    },
    forecastContainer: {
      marginTop: 8,
    },
    forecastTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDarkMode ? colors.white : colors.black,
      marginBottom: 16,
    },
    forecastScroll: {
      flexDirection: 'row',
    },
    forecastItem: {
      alignItems: 'center',
      marginRight: 20,
      width: width * 0.2,
    },
    forecastDate: {
      fontSize: 14,
      fontWeight: '500',
      color: isDarkMode ? colors.white : colors.black,
      marginBottom: 8,
    },
    forecastIcon: {
      width: 40,
      height: 40,
      marginBottom: 8,
    },
    forecastTemp: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? colors.white : colors.black,
      marginBottom: 4,
    },
    forecastDescription: {
      fontSize: 12,
      color: isDarkMode ? colors.seaShellGrey : colors.greyMsg,
      textAlign: 'center',
    },
  });

export default WeatherCard;
