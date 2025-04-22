import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { colors } from '../theme/colors';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Weather App</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons
          name={isDarkMode ? 'moon' : 'sunny'}
          size={24}
          color={styles.iconColor.color}
        />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    header: {
      paddingTop: 40,
      paddingBottom: 20,
      paddingHorizontal: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: isDarkMode ? colors.black : colors.white,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: isDarkMode ? colors.white : colors.black,
    },
    iconColor: {
      color: isDarkMode ? colors.white : colors.black,
    },
  });

export default Header;
