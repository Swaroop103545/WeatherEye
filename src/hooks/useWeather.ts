import { useDispatch, useSelector } from 'react-redux';
import { getWeather } from '../redux/slices/weatherSlice';
import { RootState, AppDispatch } from '../redux/store';
import { WeatherData } from '../redux/types/weather';

export const useWeather = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.weather) as {
    data: WeatherData | null;
    loading: boolean;
    error: string | null;
  };

  const fetchWeather = (city: string) => dispatch(getWeather(city));

  return { data, loading, error, fetchWeather };
};
