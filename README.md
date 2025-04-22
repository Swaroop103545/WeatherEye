# WeatherApp

WeatherApp is a React Native application that provides real-time weather information for cities around the world. It uses the OpenWeatherMap API to fetch weather data and supports both light and dark themes.

## Features

- 🔍 **Search Weather**: Search for weather information by city name.
- 📡 **Real-Time Data**: Displays current temperature, weather conditions, wind speed, and precipitation.
- 🌙 **Dark Mode**: Toggle between light and dark themes.
- 🧠 **Redux State Management**: Uses Redux for global state management with persistence.
- 🏙️ **City Suggestions**: Smart suggestions while typing a city name.

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

## Architectural Decisions

The WeatherApp is structured following Clean Architecture principles to ensure scalability, maintainability, and separation of concerns.

- **Separation of Concerns**: Code is organized into distinct layers such as `api`, `hooks`, `redux`, and `screens`, each with a clear responsibility.
- **Reusable Components**: UI elements are modularized into the `components` directory for reuse across different screens.
- **State Management**: Redux Toolkit is used for managing global state efficiently with persistence and separation of state logic into slices.
- **Custom Hooks**: Encapsulated logic for data fetching and side effects resides in the `hooks` directory to keep components clean.
- **Service Layer**: All API interactions are handled through the `api` layer using Axios, which abstracts the networking logic away from UI components.
- **Configuration Centralization**: API keys and base URLs are stored in a centralized `config` file to simplify environment management.

This architecture facilitates ease of testing, debugging, and onboarding for new developers.

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

## Acknowledgments

- [OpenWeather API](https://openweathermap.org/api) for providing weather data.
- [Expo](https://expo.dev/) for simplifying React Native development.
