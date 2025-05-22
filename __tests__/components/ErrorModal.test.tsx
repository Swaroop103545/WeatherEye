import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorModal from '../../src/components/ErrorModal';

// Mock the theme context
jest.mock('../../src/theme/ThemeContext', () => ({
  useTheme: () => ({
    isDarkMode: false,
  }),
}));

describe('ErrorModal Component', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    visible: true,
    message: 'Something went wrong',
    onClose: mockOnClose,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByTestId } = render(<ErrorModal {...defaultProps} />);
    
    expect(getByTestId('error-modal')).toBeTruthy();
    expect(getByTestId('error-modal-overlay')).toBeTruthy();
    expect(getByTestId('error-modal-content')).toBeTruthy();
    expect(getByTestId('error-modal-icon-container')).toBeTruthy();
    expect(getByTestId('error-modal-icon')).toBeTruthy();
    expect(getByTestId('error-modal-title')).toHaveTextContent('Oops!');
    expect(getByTestId('error-modal-message')).toHaveTextContent('Something went wrong');
    expect(getByTestId('error-modal-button')).toBeTruthy();
    expect(getByTestId('error-modal-button-text')).toHaveTextContent('Try Again');
  });

  it('calls onClose when button is pressed', () => {
    const { getByTestId } = render(<ErrorModal {...defaultProps} />);
    const button = getByTestId('error-modal-button');
    
    fireEvent.press(button);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when modal is requested to close', () => {
    const { getByTestId } = render(<ErrorModal {...defaultProps} />);
    const modal = getByTestId('error-modal');
    
    modal.props.onRequestClose();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when not visible', () => {
    const { queryByTestId } = render(<ErrorModal {...defaultProps} visible={false} />);
    
    expect(queryByTestId('error-modal')).toBeNull();
  });

  it('displays correct error message', () => {
    const customMessage = 'Custom error message';
    const { getByTestId } = render(<ErrorModal {...defaultProps} message={customMessage} />);
    
    expect(getByTestId('error-modal-message')).toHaveTextContent(customMessage);
  });
}); 