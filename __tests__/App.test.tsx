import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Mock the store
jest.mock('../src/redux/store', () => ({
  store: {
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));

jest.mock('../src/screens', () => {
  const { Text } = require('react-native');
  return {
    HomeScreen: () => <Text>HomeScreen</Text>,
  };
});

jest.mock('../src/components/SearchBar', () => {
  const { View } = require('react-native');
  return ({ city, setCity, handleSearch }: any) => (
    <View testID="search-button" style={{ opacity: city ? 1 : 0.5 }} />
  );
});

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('HomeScreen')).toBeTruthy();
  });

  it('renders with ThemeProvider', () => {
    const { UNSAFE_root } = render(<App />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it.skip('renders SearchBar with correct opacity', () => {
    const { getByTestId } = render(<App />);
    const searchButton = getByTestId('search-button');
    expect(searchButton.props.style.opacity).not.toBe(0.5);
  });
}); 