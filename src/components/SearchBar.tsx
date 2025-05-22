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
    <View style={styles.container} testID="search-bar-container">
      <View style={styles.searchContainer} testID="search-input-container">
        <Ionicons 
          name="search" 
          size={20} 
          color={isDarkMode ? colors.seaShellGrey : colors.greyMsg} 
          style={styles.searchIcon}
          testID="search-icon"
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
          testID="search-input"
        />
        {city.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setCity('')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            testID="clear-button"
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
        testID="search-button"
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
      backgroundColor: isDarkMode ? colors.gradientGray : colors.seaShellGrey,
      borderRadius: 32,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginHorizontal: 8,
      marginVertical: 8,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    searchIcon: {
      position: 'absolute',
      left: 16,
      zIndex: 1,
    },
    input: {
      flex: 1,
      height: 44,
      borderWidth: 0,
      borderRadius: 22,
      paddingHorizontal: 40,
      color: isDarkMode ? colors.white : colors.black,
      backgroundColor: 'transparent',
      fontSize: 16,
    },
    clearButton: {
      position: 'absolute',
      right: 16,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 4,
    },
    searchButton: {
      width: 44,
      height: 44,
      backgroundColor: isDarkMode ? colors.orange : colors.primary,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    searchButtonDisabled: {
      opacity: 0.5,
    },
  });

export default SearchBar;
