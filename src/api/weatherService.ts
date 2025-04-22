import axios from 'axios';
import {
  OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_BASE_URL,
} from '../config/appConfig';

export const fetchWeatherByCity = async (city: string) => {
  const res = await axios.get(`${OPEN_WEATHER_BASE_URL}/weather`, {
    params: {
      q: city,
      appid: OPEN_WEATHER_API_KEY,
      units: 'metric',
    },
  });

  return res.data;
};
