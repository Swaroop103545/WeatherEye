import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchWeatherByCity } from '../../api/weatherService';
import { WeatherData } from '../types/weather'

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      return await fetchWeatherByCity(city);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'No City Found');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default weatherSlice.reducer;
