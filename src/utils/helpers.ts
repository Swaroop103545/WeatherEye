const formatWeatherTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString('en-US', {
    weekday: 'short',     
    hour: 'numeric',      
    minute: '2-digit',    
    hour12: true,
  });
};
const getWeatherIconUrl = (iconCode: string, size: '2x' | '4x' = '4x') => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};



export { formatWeatherTime, getWeatherIconUrl };