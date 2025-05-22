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
WeatherEye/
├── src/
│   ├── api/                  # API related code
│   ├── components/           # Reusable components
│   ├── config/              # Configuration files
│   ├── hooks/               # Custom React hooks
│   ├── redux/               # Redux store and slices
│   ├── screens/             # Screen components
│   ├── services/            # Service layer
│   ├── styles/              # Global styles
│   ├── theme/               # Theme configuration
│   └── utils/               # Utility functions
├── assets/                  # Global assets
├── __tests__/              # Test files
├── __mocks__/              # Mock files
├── .expo/                  # Expo configuration
├── .github/                # GitHub configuration
├── .gitignore             # Git ignore rules
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
├── declarations.d.ts      # TypeScript declarations
├── index.ts               # Entry point
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Jest setup
├── package.json           # Project dependencies
├── package-lock.json      # Dependency lock file
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
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

## Environment Setup

1. Create a `.env` file in the root directory
2. Add API key and configuration:
```
OPEN_WEATHER_API_KEY='8e743a7c554f65944da658a9fed2f466'
OPEN_WEATHER_BASE_URL='https://api.openweathermap.org/data/2.5/'
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

## Testing

The project uses Jest and React Native Testing Library for testing. Here are the available test commands:

1. **Run all tests**:
```bash
npm test
# or
yarn test
```

2. **Run tests in watch mode**:
```bash
npm run test:watch
# or
yarn test:watch
```

3. **Run tests with coverage**:
```bash
npm test -- --coverage
# or
yarn test --coverage
```

## Technologies Used

- ⚛️ **React Native**: Framework for building cross-platform mobile apps
- 🧰 **Redux Toolkit**: State management with persistence
- 🌐 **Axios**: HTTP client for API requests
- 🚀 **Expo**: Development environment for React Native

## Architectural Decisions

The WeatherEye application follows a layered architecture with a strong emphasis on separation of concerns and modularity. Key aspects of the architecture include:

- **Layered Structure**: The codebase is organized into distinct layers such as `api`, `services`, `redux`, `screens`, `components`, `hooks`, `utils`, `config`, `styles`, and `theme`. Each layer has a specific responsibility.
- **API Layer (`api/`)**: Handles direct communication with external APIs, such as the OpenWeatherMap API, abstracting the data fetching logic.
- **Service Layer (`services/`)**: Contains business logic and orchestrates calls to the API layer. This layer is responsible for data processing and transformation before it reaches the Redux store.
- **State Management (`redux/`)**: Utilizes Redux Toolkit for centralized state management. State logic is organized into slices, and persistence is handled for relevant data.
- **UI Layers (`screens/`, `components/`)**: Screens represent the different pages of the application, while components are reusable UI elements. This separation promotes reusability and maintainability.
- **Custom Hooks (`hooks/`)**: Encapsulate complex logic and side effects, making components cleaner and more focused on rendering.
- **Utility Functions (`utils/`)**: Contains helper functions that can be used across different parts of the application.
- **Configuration (`config/`)**: Centralizes application configuration, including API keys and base URLs.
- **Styling (`styles/`, `theme/`)**: Manages global styles and theme-related configurations for consistent UI.
- **Modularity and Reusability**: The structure promotes creating small, focused modules and reusable components, making the codebase easier to understand, test, and maintain.
- **Testability**: The layered structure and separation of concerns facilitate writing unit and integration tests for individual layers and modules.

This architectural approach aims to ensure the application is scalable, maintainable, and easy to develop upon.

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

## Screenshots

Here are some screenshots of the application in action:

<img src="https://github.com/user-attachments/assets/081bb09b-b73a-43b7-bba7-fe1f367fdf87" alt="Light Mode" height="400" /> <img src="https://github.com/user-attachments/assets/5d8ba1e9-ec4c-49f7-ae6a-dd0ca7740041" alt="Dark Mode" height="400" />

## Acknowledgments

- [OpenWeather API](https://openweathermap.org/api) for providing weather data.
- [Expo](https://expo.dev/) for simplifying React Native development.
