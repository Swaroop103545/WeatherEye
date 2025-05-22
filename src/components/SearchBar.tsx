import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
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
  const textColor = isDarkMode ? colors.white : colors.black;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder='Enter City Name'
          placeholderTextColor={textColor}
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />
        {city.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setCity('')}
          >
            <Ionicons name='close-circle' size={20} color={textColor} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity 
        style={styles.searchButton} 
        onPress={handleSearch}
        activeOpacity={0.7}
      >
        <Ionicons name='search' size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    searchContainer: {
      flex: 1,
      position: 'relative',
    },
    input: {
      height: 48,
      borderWidth: 1,
      borderColor: isDarkMode ? colors.primary : colors.primary,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingRight: 40,
      color: isDarkMode ? colors.white : colors.black,
      backgroundColor: isDarkMode ? colors.black : colors.white,
      fontSize: 16,
    },
    clearButton: {
      position: 'absolute',
      right: 12,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
    },
    searchButton: {
      width: 48,
      height: 48,
      backgroundColor: isDarkMode ? colors.orange : colors.primary,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  });

export default SearchBar;
