export interface WeatherData {
  main: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  dt: number;
}

export interface City {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

export interface DailySummary {
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  dominantCondition: string;
}

export interface AlertConfig {
  type: 'temperature' | 'condition';
  threshold: number;
  condition?: string;
}