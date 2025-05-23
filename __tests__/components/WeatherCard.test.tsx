import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../../src/components/WeatherCard';

jest.mock('../../src/theme/ThemeContext', () => ({
  useTheme: () => ({
    isDarkMode: false,
  }),
}));

jest.mock('../../assets', () => ({
  precipitation: 'precipitation-icon',
  wind: 'wind-icon',
}));

jest.mock('../../src/utils/helpers', () => ({
  getWeatherIconUrl: (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`,
}));

describe('WeatherCard Component', () => {
  const mockProps = {
    city: 'London',
    description: 'Cloudy',
    time: '10:00 AM',
    temp: 20,
    icon: '04d',
    precipitation: 30,
    windSpeed: 15,
    forecast: [
      {
        date: 'Mon',
        temp: 22,
        icon: '01d',
        description: 'Sunny',
      },
      {
        date: 'Tue',
        temp: 21,
        icon: '02d',
        description: 'Partly Cloudy',
      },
    ],
  };

  it('renders correctly with all props', () => {
    const { getByTestId } = render(<WeatherCard {...mockProps} />);
    
    expect(getByTestId('weather-card-scroll')).toBeTruthy();
    expect(getByTestId('weather-card-gradient')).toBeTruthy();
    expect(getByTestId('weather-card-header')).toBeTruthy();
    expect(getByTestId('weather-card-city')).toHaveTextContent('London');
    expect(getByTestId('weather-card-description')).toHaveTextContent('10:00 AM, Cloudy');
  });

  it('displays correct temperature', () => {
    const { getByTestId } = render(<WeatherCard {...mockProps} />);
    
    expect(getByTestId('weather-card-temp')).toHaveTextContent('20°');
    expect(getByTestId('weather-card-temp-unit')).toHaveTextContent('C');
  });

  it('displays weather information correctly', () => {
    const { getByTestId } = render(<WeatherCard {...mockProps} />);
    
    expect(getByTestId('weather-card-precipitation-value')).toHaveTextContent('30%');
    expect(getByTestId('weather-card-wind-value')).toHaveTextContent('15 km/h');
  });

  it('renders forecast section when forecast data is provided', () => {
    const { getByTestId } = render(<WeatherCard {...mockProps} />);
    
    expect(getByTestId('weather-card-forecast')).toBeTruthy();
    expect(getByTestId('weather-card-forecast-title')).toHaveTextContent('7-Day Forecast');
    expect(getByTestId('weather-card-forecast-item-0')).toBeTruthy();
    expect(getByTestId('weather-card-forecast-date-0')).toHaveTextContent('Mon');
    expect(getByTestId('weather-card-forecast-temp-0')).toHaveTextContent('22°');
    expect(getByTestId('weather-card-forecast-description-0')).toHaveTextContent('Sunny');
  });

  it('does not render forecast section when forecast is empty', () => {
    const propsWithoutForecast = { ...mockProps, forecast: [] };
    const { queryByTestId } = render(<WeatherCard {...propsWithoutForecast} />);
    
    expect(queryByTestId('weather-card-forecast')).toBeNull();
  });

  it('renders weather icon with correct source', () => {
    const { getByTestId } = render(<WeatherCard {...mockProps} />);
    const weatherIcon = getByTestId('weather-card-icon');
    
    expect(weatherIcon.props.source.uri).toBe('https://openweathermap.org/img/wn/04d@2x.png');
  });
}); 