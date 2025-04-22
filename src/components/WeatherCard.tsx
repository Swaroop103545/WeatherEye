import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../theme/colors';
import Images from '../../assets';
import { useTheme } from '../theme/ThemeContext';
import { getWeatherIconUrl } from '../utils/helpers';

type WeatherCardProps = {
  city: string;
  description: string;
  time: string;
  temp: number;
  icon: string;
  precipitation: number;
  windSpeed: number;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  description,
  time,
  temp,
  icon,
  precipitation,
  windSpeed,
}) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.description}>{`${time}, ${description}`}</Text>

      <View style={styles.row}>
        <Text style={styles.temp}>{Math.round(temp)}°C</Text>
        <Image
          source={{ uri: getWeatherIconUrl(icon) }}
          style={styles.weatherIcon}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.subInfo}>
          <Image source={Images.precipitation} style={styles.subIcon} />
          <Text style={styles.subText}>{precipitation}% Precipitation</Text>
        </View>

        <View style={styles.subInfo}>
          <Image source={Images.wind} style={styles.subIcon} />
          <Text style={styles.subText}>{windSpeed} km/h Winds</Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: isDarkMode ? colors.black : colors.white,
      borderRadius: 16,
      padding: 20,
      shadowColor: colors.black,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 4,
      borderColor: isDarkMode ? colors.primary : colors.white,
      borderWidth: 1,
    },
    city: {
      fontSize: 24,
      fontWeight: '400',
      color: isDarkMode ? colors.white : colors.black,
    },
    description: {
      fontSize: 14,
      color: isDarkMode ? colors.seaShellGrey : colors.greyMsg,
      fontWeight: '200',
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    temp: {
      fontSize: 60,
      fontWeight: '400',
      color: isDarkMode ? colors.white : colors.black,
    },
    weatherIcon: {
      width: 80,
      height: 80,
    },
    subInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    subIcon: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
    subText: {
      fontSize: 14,
      color: isDarkMode ? colors.white : colors.black,
    },
  });

export default WeatherCard;
