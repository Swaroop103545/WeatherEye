export interface WeatherData {
  name: string;
  dt: number;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
  };
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}
