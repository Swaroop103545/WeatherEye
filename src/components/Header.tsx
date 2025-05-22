import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { colors } from '../theme/colors';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? colors.black : colors.white}
      />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons
            name="partly-sunny"
            size={28}
            color={isDarkMode ? colors.orange : colors.primary}
            style={styles.logo}
          />
          <Text style={styles.title}>WeatherEye</Text>
        </View>
        <TouchableOpacity 
          style={styles.themeButton}
          onPress={toggleTheme}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={24}
            color={isDarkMode ? colors.orange : colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? colors.black : colors.white,
      paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      marginRight: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: isDarkMode ? colors.white : colors.black,
    },
    themeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default Header;
