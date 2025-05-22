import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { colors } from '../theme/colors';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  onTryAgain: () => void;
}

const { width } = Dimensions.get('window');

const ErrorModal: React.FC<ErrorModalProps> = ({ visible, message, onClose, onTryAgain }) => {
  const { isDarkMode } = useTheme();
  const styles = getStyles(isDarkMode);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      testID="error-modal"
    >
      <View style={styles.centeredView} testID="error-modal-overlay">
        <View style={styles.modalView} testID="error-modal-content">
          <View style={styles.iconContainer} testID="error-modal-icon-container">
            <Ionicons
              name="alert-circle"
              size={40}
              color={isDarkMode ? colors.orange : colors.primary}
              testID="error-modal-icon"
            />
          </View>
          <Text style={styles.modalTitle} testID="error-modal-title">Oops!</Text>
          <Text style={styles.modalText} testID="error-modal-message">{message}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onTryAgain}
            activeOpacity={0.7}
            testID="error-modal-button"
          >
            <Text style={styles.buttonText} testID="error-modal-button-text">Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.gradientBlack,
    },
    modalView: {
      width: width * 0.85,
      backgroundColor: isDarkMode ? colors.black : colors.white,
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderWidth: 1,
      borderColor: isDarkMode ? colors.orange : colors.primary,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDarkMode ? colors.gradientGray : colors.gradientBlack,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: isDarkMode ? colors.white : colors.black,
      marginBottom: 12,
    },
    modalText: {
      fontSize: 16,
      color: isDarkMode ? colors.seaShellGrey : colors.greyMsg,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 22,
    },
    button: {
      backgroundColor: isDarkMode ? colors.orange : colors.primary,
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 32,
      elevation: 2,
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

export default ErrorModal; 