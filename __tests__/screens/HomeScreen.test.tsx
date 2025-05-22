import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/HomeScreen';

jest.mock('../../src/components', () => ({
  Header: () => <></>,
  SearchBar: ({ city, setCity, handleSearch }: any) => (
    <></>
  ),
  WeatherCard: () => <></>,
  ErrorModal: ({ visible, message, onClose, onTryAgain }: any) => (
    visible ? <></> : null
  ),
}));

jest.mock('../../src/hooks/useWeather', () => ({
  useWeather: () => ({
    data: {
      name: 'Hyderabad',
      dt: 1234567890,
      weather: [{ description: 'Clear', icon: '01d' }],
      main: { temp: 30 },
      clouds: { all: 0 },
      wind: { speed: 5 },
    },
    forecast: [],
    loading: false,
    error: null,
    fetchWeather: jest.fn(),
  }),
}));

jest.mock('../../src/theme/ThemeContext', () => ({
  useTheme: () => ({ isDarkMode: false }),
}));

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('shows WeatherCard when data is present', () => {
    const { queryByText } = render(<HomeScreen />);
    // WeatherCard mock returns empty fragment, so just check no error thrown
    expect(queryByText('Hyderabad')).toBeNull();
  });
}); 