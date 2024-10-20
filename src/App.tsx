import React, { useState, useEffect } from 'react';
import { INDIAN_METROS } from './config/cities';
import { fetchWeatherData } from './services/WeatherService';
import WeatherDisplay from './components/WeatherDisplay';
import DailySummaryComponent from './components/DailySummary';
import AlertSystem from './components/AlertSystem';
import { WeatherData, DailySummary, AlertConfig } from './types/WeatherTypes';
import { CloudRain } from 'lucide-react';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{ [cityId: number]: WeatherData | null }>({});
  const [dailySummaries, setDailySummaries] = useState<DailySummary[]>([]);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({ type: 'temperature', threshold: 35 });
  const [alerts, setAlerts] = useState<string[]>([]);
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F' | 'K'>('C'); // Temperature unit state

  useEffect(() => {
    const fetchData = async () => {
      const newData: { [cityId: number]: WeatherData | null } = {};
      for (const city of INDIAN_METROS) {
        try {
          const data = await fetchWeatherData(city);
          newData[city.id] = data;
          checkAlerts(city.name, data);
        } catch (error) {
          console.error(`Failed to fetch data for ${city.name}:`, error);
          newData[city.id] = null;
        }
      }
      setWeatherData(newData);
      updateDailySummary(newData);
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Fetch every 5 minutes

    return () => clearInterval(interval);
  }, [alertConfig]);

  const convertTemperature = (temp: number): string => {
    switch (temperatureUnit) {
      case 'C':
        return `${temp.toFixed(1)}°C`;
      case 'F':
        return `${(temp * 9 / 5 + 32).toFixed(1)}°F`;
      case 'K':
        return `${(temp + 273.15).toFixed(1)}K`;
      default:
        return `${temp.toFixed(1)}°C`;
    }
  };

  const updateDailySummary = (data: { [cityId: number]: WeatherData | null }) => {
    const today = new Date().toISOString().split('T')[0];
    const temperatures: number[] = [];
    const conditions: string[] = [];

    Object.values(data).forEach(cityData => {
      if (cityData) {
        temperatures.push(cityData.temp);
        conditions.push(cityData.main);
      }
    });

    const avgTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);
    const dominantCondition = conditions.sort((a, b) =>
      conditions.filter(v => v === a).length - conditions.filter(v => v === b).length
    ).pop() || '';

    const summary: DailySummary = {
      date: today,
      avgTemp,
      maxTemp,
      minTemp,
      dominantCondition
    };

    setDailySummaries(prev => [...prev.filter(s => s.date !== today), summary]);
  };

  const checkAlerts = (cityName: string, data: WeatherData) => {
    if (alertConfig.type === 'temperature' && data.temp > alertConfig.threshold) {
      setAlerts(prev => [...prev, `Alert: Temperature in ${cityName} is ${data.temp.toFixed(1)}°C, exceeding the threshold of ${alertConfig.threshold}°C`]);
    } else if (alertConfig.type === 'condition' && data.main === alertConfig.condition) {
      setAlerts(prev => [...prev, `Alert: ${alertConfig.condition} condition detected in ${cityName}`]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 flex items-center">
          <CloudRain className="mr-2" /> SkySense
        </h1>
        <div className="mt-4 flex-shrink-0">
          <label className="mr-2">Select Temperature Unit:</label>
          <select
            value={temperatureUnit}
            onChange={e => setTemperatureUnit(e.target.value as 'C' | 'F' | 'K')}
            className="border rounded p-2"
          >
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
            <option value="K">Kelvin</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDIAN_METROS.map(city => (
          <WeatherDisplay key={city.id} city={city} weatherData={weatherData[city.id]} convertTemperature={convertTemperature} />
        ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Daily Summaries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailySummaries.map(summary => (
            <DailySummaryComponent key={summary.date} summary={summary} convertTemperature={convertTemperature} />
          ))}
        </div>
      </div>
      
      <div className="mt-12">
        <AlertSystem onAlertConfigChange={setAlertConfig} />
      </div>
      
      {alerts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Alerts</h2>
          <ul className="bg-red-100 p-6 rounded-lg">
            {alerts.map((alert, index) => (
              <li key={index} className="text-red-700 mb-2">{alert}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
