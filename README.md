# WeatherApp

WeatherApp is a React Native application that provides real-time weather information for cities around the world. It uses the OpenWeatherMap API to fetch weather data and supports both light and dark themes.

## Features

- 🔍 **Search Weather**: Search for weather information by city name.
- 📡 **Real-Time Data**: Displays current temperature, weather conditions, wind speed, and precipitation.
- 🌙 **Dark Mode**: Toggle between light and dark themes.
- 🧠 **Redux State Management**: Uses Redux for global state management with persistence.

## Project Structure

```
WeatherApp/
├── src/
│   ├── api/             # API service for fetching weather data
│   ├── components/      # Reusable UI components
│   ├── config/          # Configuration files (e.g., API keys)
│   ├── hooks/           # Custom React hooks
│   ├── redux/           # Redux store, slices, and types
│   ├── screens/         # Application screens
│   ├── styles/          # Global styles
│   ├── theme/           # Theme context and color palette
│   └── utils/           # Utility functions
├── assets/              # Images and icons
├── App.tsx              # Entry point of the app
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/WeatherApp.git
   cd WeatherApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your OpenWeather API key to `src/config/appConfig.ts`:
   ```ts
   export const OPEN_WEATHER_API_KEY = "your_api_key_here";
   ```

## Running the App

Start the development server:

```bash
npx expo start
```

Run the app on your desired platform:

- **Android**:  
  ```bash
  npm run android
  ```

- **iOS**:  
  ```bash
  npm run ios
  ```

## Technologies Used

- ⚛️ **React Native**: Framework for building cross-platform mobile apps
- 🧰 **Redux Toolkit**: State management with persistence
- 🌐 **Axios**: HTTP client for API requests
- 🚀 **Expo**: Development environment for React Native

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenWeather API](https://openweathermap.org/api) for providing weather data.
- [Expo](https://expo.dev/) for simplifying React Native development.
