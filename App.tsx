import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { HomeScreen } from './src/screens';
import { ThemeProvider } from './src/theme/ThemeContext';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    </Provider>
  );
}
