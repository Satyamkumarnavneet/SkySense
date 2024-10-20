import axios from 'axios';
import { WeatherData, City } from '../types/WeatherTypes';

const API_KEY = 'your_api_key_here';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city: City): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`);
    const { main, weather, dt } = response.data;
    return {
      main: weather[0].main,
      temp: main.temp,
      feels_like: main.feels_like,
      humidity: main.humidity,
      wind_speed: response.data.wind.speed,
      dt: dt
    };
  } catch (error) {
    console.error(`Error fetching weather data for ${city.name}:`, error);
    throw error;
  }
};

export const getWeatherIcon = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'clear': return '☀️';
    case 'clouds': return '☁️';
    case 'rain': return '🌧️';
    case 'snow': return '❄️';
    case 'thunderstorm': return '⛈️';
    default: return '🌤️';
  }
};
