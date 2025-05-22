import React, { forwardRef, useImperativeHandle } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { colors } from '../theme/colors';

interface Props {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

export interface SearchBarRef {
  focus: () => void;
}

const SearchBar = forwardRef<SearchBarRef, Props>(({ city, setCity, handleSearch }, ref) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);
  const textColor = isDarkMode ? colors.white : colors.black;
  const inputRef = React.useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons 
          name="search" 
          size={20} 
          color={isDarkMode ? colors.seaShellGrey : colors.greyMsg} 
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          placeholder="Search for a city..."
          placeholderTextColor={isDarkMode ? colors.seaShellGrey : colors.greyMsg}
          value={city}
          onChangeText={setCity}
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
          autoCapitalize="words"
        />
        {city.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setCity('')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close-circle" size={20} color={textColor} />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity 
        style={[
          styles.searchButton,
          !city.trim() && styles.searchButtonDisabled
        ]} 
        onPress={handleSearch}
        disabled={!city.trim()}
        activeOpacity={0.7}
      >
        <Ionicons 
          name="search" 
          size={24} 
          color={colors.white} 
        />
      </TouchableOpacity>
    </View>
  );
});

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchContainer: {
      flex: 1,
      position: 'relative',
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {
      position: 'absolute',
      left: 16,
      zIndex: 1,
    },
    input: {
      height: 52,
      borderWidth: 1,
      borderColor: isDarkMode ? colors.primary : colors.primary,
      borderRadius: 26,
      paddingHorizontal: 48,
      color: isDarkMode ? colors.white : colors.black,
      backgroundColor: isDarkMode ? colors.black : colors.white,
      fontSize: 16,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    clearButton: {
      position: 'absolute',
      right: 16,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
    },
    searchButton: {
      width: 52,
      height: 52,
      backgroundColor: isDarkMode ? colors.orange : colors.primary,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    searchButtonDisabled: {
      opacity: 0.5,
    },
  });

export default SearchBar;
