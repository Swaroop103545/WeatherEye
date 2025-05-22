import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../../src/components/SearchBar';

// Mock the theme context
jest.mock('../../src/theme/ThemeContext', () => ({
  useTheme: () => ({
    isDarkMode: false,
  }),
}));

describe('SearchBar Component', () => {
  const mockSetCity = jest.fn();
  const mockHandleSearch = jest.fn();
  const defaultProps = {
    city: '',
    setCity: mockSetCity,
    handleSearch: mockHandleSearch,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with empty city', () => {
    const { getByTestId, queryByTestId } = render(<SearchBar {...defaultProps} />);
    
    expect(getByTestId('search-bar-container')).toBeTruthy();
    expect(getByTestId('search-input-container')).toBeTruthy();
    expect(getByTestId('search-icon')).toBeTruthy();
    expect(getByTestId('search-input')).toBeTruthy();
    expect(getByTestId('search-button')).toBeTruthy();
    expect(queryByTestId('clear-button')).toBeNull();
  });

  it('shows clear button when city has text', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} city="London" />);
    expect(getByTestId('clear-button')).toBeTruthy();
  });

  it('calls setCity when input text changes', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} />);
    const input = getByTestId('search-input');
    
    fireEvent.changeText(input, 'New York');
    expect(mockSetCity).toHaveBeenCalledWith('New York');
  });

  it('calls handleSearch when search button is pressed', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} city="London" />);
    const searchButton = getByTestId('search-button');
    
    fireEvent.press(searchButton);
    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it('clears input when clear button is pressed', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} city="London" />);
    const clearButton = getByTestId('clear-button');
    
    fireEvent.press(clearButton);
    expect(mockSetCity).toHaveBeenCalledWith('');
  });

  it('search button is disabled when city is empty', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} />);
    const searchButton = getByTestId('search-button');
    expect(searchButton.props.style.opacity).toBe(0.5);
  });

  it('search button is enabled when city has text', () => {
    const { getByTestId } = render(<SearchBar {...defaultProps} city="London" />);
    const searchButton = getByTestId('search-button');
    expect(searchButton.props.style.opacity).not.toBe(0.5);
  });
}); 