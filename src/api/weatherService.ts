import axios from 'axios';
import { API_KEY, BASE_URL } from '../config/appConfig';
import NetInfo from '@react-native-community/netinfo';

export const fetchWeatherByCity = async (city: string) => {
  try {
    console.log('Fetching weather for:', city);
    console.log('API Key:', API_KEY);
    console.log('Base URL:', BASE_URL);

    if (!API_KEY) {
      throw new Error('API Key is missing');
    }

    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected) {
      throw new Error('No internet connection');
    }

    const url = `${BASE_URL}/weather`;
    console.log('Weather API URL:', url);

    const res = await axios.get(url, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
      timeout: 10000, // 10 seconds timeout
    });

    if (!res.data) {
      throw new Error('No data received from weather API');
    }

    console.log('Weather response:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('Weather API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      code: error.code
    });

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your internet connection.');
    }

    if (!error.response) {
      throw new Error('Network error. Please check your internet connection.');
    }

    if (error.response.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    }

    throw error;
  }
};

export const fetchForecastByCity = async (city: string) => {
  try {
    console.log('Fetching forecast for:', city);
    
    if (!API_KEY) {
      throw new Error('API Key is missing');
    }

    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected) {
      throw new Error('No internet connection');
    }

    const url = `${BASE_URL}/forecast`;
    console.log('Forecast API URL:', url);

    const res = await axios.get(url, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
      timeout: 10000, // 10 seconds timeout
    });

    if (!res.data) {
      throw new Error('No data received from forecast API');
    }

    console.log('Forecast response:', res.data);

    // Group forecast data by day
    const dailyForecasts = res.data.list.reduce((acc: any, item: any) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!acc[dayKey]) {
        acc[dayKey] = {
          date: dayKey,
          temp: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        };
      }
      return acc;
    }, {});

    const result = Object.values(dailyForecasts).slice(0, 7);
    console.log('Processed forecast data:', result);
    return result;
  } catch (error: any) {
    console.error('Forecast API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      code: error.code
    });

    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your internet connection.');
    }

    if (!error.response) {
      throw new Error('Network error. Please check your internet connection.');
    }

    if (error.response.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    }

    throw error;
  }
};
