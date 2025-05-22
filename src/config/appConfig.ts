import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from '@env';

if (!OPEN_WEATHER_API_KEY) {
  throw new Error('OPEN_WEATHER_API_KEY is not defined in environment variables');
}

if (!OPEN_WEATHER_BASE_URL) {
  throw new Error('OPEN_WEATHER_BASE_URL is not defined in environment variables');
}

export const API_KEY = OPEN_WEATHER_API_KEY;
export const BASE_URL = OPEN_WEATHER_BASE_URL;