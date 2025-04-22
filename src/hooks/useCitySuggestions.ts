import { useState, useEffect } from 'react';
import axios from 'axios';
import { OPEN_WEATHER_BASE_URL, OPEN_WEATHER_API_KEY } from '../config/appConfig';

export const useCitySuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      axios
        .get(`${OPEN_WEATHER_BASE_URL}/find`, {
          params: {
            q: query,
            appid: OPEN_WEATHER_API_KEY,
            units: 'metric',
            type: 'like',
            sort: 'population',
          },
        })
        .then((response) => {
          setSuggestions(response.data.list.map((city: any) => city.name));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch suggestions');
          setLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return { suggestions, loading, error };
};
