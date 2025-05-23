import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchWeatherByCity, fetchForecastByCity } from '../../api/weatherService';
import { WeatherData } from '../types/weather'

interface WeatherState {
  data: WeatherData | null;
  forecast: Array<{
    date: string;
    temp: number;
    icon: string;
    description: string;
  }> | null;
  loading: boolean;
  error: string | null;
  lastSuccessfulCity: string | null;
}

const initialState: WeatherState = {
  data: null,
  forecast: null,
  loading: false,
  error: null,
  lastSuccessfulCity: null,
};

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecastByCity(city),
      ]);
      return { weatherData, forecastData };
    } catch (err: any) {
      console.error('Weather fetch failed:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch weather data';
      return rejectWithValue(errorMessage);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.forecast = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action: PayloadAction<{ weatherData: WeatherData; forecastData: any[] }>) => {
        state.data = action.payload.weatherData;
        state.forecast = action.payload.forecastData;
        state.loading = false;
        state.error = null;
        state.lastSuccessfulCity = action.payload.weatherData.name;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        if (!state.lastSuccessfulCity) {
          state.data = null;
          state.forecast = null;
        }
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
