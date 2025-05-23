import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../../src/components/Header';
import { View } from 'react-native';

const mockToggleTheme = jest.fn();
let mockIsDarkMode = false;
jest.mock('../../src/theme/ThemeContext', () => ({
  useTheme: () => ({
    isDarkMode: mockIsDarkMode,
    toggleTheme: mockToggleTheme,
  }),
}));

jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => ({
  __esModule: true,
  default: (props: any) => <View {...props} />,
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsDarkMode = false;
  });

  it('renders correctly in light mode', () => {
    const { getByTestId } = render(<Header />);
    
    expect(getByTestId('header-container')).toBeTruthy();
    expect(getByTestId('header-content')).toBeTruthy();
    expect(getByTestId('header-title-container')).toBeTruthy();
    expect(getByTestId('header-logo')).toBeTruthy();
    expect(getByTestId('header-title')).toHaveTextContent('WeatherEye');
    expect(getByTestId('header-theme-button')).toBeTruthy();
    expect(getByTestId('header-theme-icon')).toBeTruthy();
  });

  it('calls toggleTheme when theme button is pressed', () => {
    const { getByTestId } = render(<Header />);
    const themeButton = getByTestId('header-theme-button');
    
    fireEvent.press(themeButton);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('shows sun icon in light mode', () => {
    const { getByTestId } = render(<Header />);
    const themeIcon = getByTestId('header-theme-icon');
    
    expect(themeIcon.props.name).toBe('sunny');
  });

  it('shows moon icon in dark mode', () => {
    mockIsDarkMode = true;
    const { getByTestId } = render(<Header />);
    const themeIcon = getByTestId('header-theme-icon');
    
    expect(themeIcon.props.name).toBe('moon');
  });

  it('renders with correct status bar style in light mode', () => {
    const { getByTestId } = render(<Header />);
    const statusBar = getByTestId('header-status-bar');
    
    expect(statusBar.props.barStyle).toBe('dark-content');
  });

  it('renders with correct status bar style in dark mode', () => {
    mockIsDarkMode = true;
    const { getByTestId } = render(<Header />);
    const statusBar = getByTestId('header-status-bar');
    
    expect(statusBar.props.barStyle).toBe('light-content');
  });
}); 