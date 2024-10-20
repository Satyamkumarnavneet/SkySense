import React from 'react';
import { WeatherData, City } from '../types/WeatherTypes';
import { getWeatherIcon } from '../services/WeatherService';

interface WeatherDisplayProps {
  city: City;
  weatherData: WeatherData | null;
  convertTemperature: (temp: number) => string; // Add this prop
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, weatherData, convertTemperature }) => {
  if (!weatherData) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{city.name}</h2>
        <span
          className="text-4xl"
          aria-label={weatherData.main}
          title={weatherData.main}
        >
          {getWeatherIcon(weatherData.main)}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Temperature</p>
          <p className="text-xl font-semibold">{convertTemperature(weatherData.temp)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Feels Like</p>
          <p className="text-xl font-semibold">{convertTemperature(weatherData.feels_like)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-xl font-semibold">{weatherData.humidity}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Wind Speed</p>
          <p className="text-xl font-semibold">{weatherData.wind_speed.toFixed(1)} m/s</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Last updated: {new Date(weatherData.dt * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
};

export default WeatherDisplay;
