import React, { useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { colors } from '../theme/colors';

interface Props {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar = ({ city, setCity, handleSearch }: Props) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const darkModeText = isDarkMode ? colors.white : colors.black;

  return (
    <Animated.View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder='Enter City Name'
          placeholderTextColor={darkModeText}
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        {city.length > 0 && (
          <TouchableOpacity
            style={styles.clearIcon}
            onPress={() => setCity('')}
          >
            <Ionicons name='close-circle' size={20} color={isDarkMode? colors.white : colors.black} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Ionicons name='search' size={24} color={colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderRadius: 5,
    },
    inputWrapper: {
      flex: 0.9,
      position: 'relative',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.primary,
      padding: 10,
      borderRadius: 5,
      paddingRight: 30,
      color: isDarkMode ? colors.white : colors.black,
    },
    clearIcon: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: [{ translateY: -10 }],
    },
    button: {
      flex: 0.1,
      marginLeft: 10,
      backgroundColor: isDarkMode ? colors.orange : colors.primary,
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    crossIcon: {
      color: isDarkMode ? colors.white : colors.black,
    },
  });

export default SearchBar;
