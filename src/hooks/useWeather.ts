import { useDispatch, useSelector } from 'react-redux';
import { getWeather } from '../redux/slices/weatherSlice';
import { RootState, AppDispatch } from '../redux/store';
import { WeatherData } from '../redux/types/weather';

export const useWeather = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, forecast, loading, error, lastSuccessfulCity } = useSelector((state: RootState) => state.weather) as {
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
  };

  const fetchWeather = (city: string) => dispatch(getWeather(city));

  return { data, forecast, loading, error, fetchWeather, lastSuccessfulCity };
};
