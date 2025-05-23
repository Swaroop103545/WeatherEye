jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    NativeModules: {
      ...RN.NativeModules,
      StatusBarManager: {
        getHeight: jest.fn(),
        setStyle: jest.fn(),
        setHidden: jest.fn(),
        setNetworkActivityIndicatorVisible: jest.fn(),
      },
      SettingsManager: {
        settings: {
          AppleLocale: 'en_US',
          AppleLanguages: ['en'],
        },
      },
    },
    Platform: { OS: 'ios', select: jest.fn(dict => dict.ios) },
    StatusBar: 'StatusBar',
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  FontAwesome: 'FontAwesome',
}));

jest.mock('expo-constants', () => ({
  Constants: {
    manifest: {
      extra: {
        OPEN_WEATHER_API_KEY: 'test-api-key',
        OPEN_WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
      },
    },
  },
}));

jest.mock('react-native/Libraries/Settings/Settings', () => ({
  get: jest.fn(),
  set: jest.fn(),
  watchKeys: jest.fn(),
  clearWatch: jest.fn(),
}));