import React from 'react';
import { DailySummary } from '../types/WeatherTypes';
import { getWeatherIcon } from '../services/WeatherService';
import { format } from 'date-fns';

interface DailySummaryProps {
  summary: DailySummary;
  convertTemperature: (temp: number) => string; // Add this prop
}

const DailySummaryComponent: React.FC<DailySummaryProps> = ({ summary, convertTemperature }) => {
  const formattedDate = format(new Date(summary.date), 'MMM dd, yyyy');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{formattedDate}</h3>
        <span
          className="text-3xl"
          aria-label={summary.dominantCondition}
          title={summary.dominantCondition}
        >
          {getWeatherIcon(summary.dominantCondition)}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Average Temp</p>
          <p className="text-lg font-semibold">{convertTemperature(summary.avgTemp)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Max Temp</p>
          <p className="text-lg font-semibold">{convertTemperature(summary.maxTemp)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Min Temp</p>
          <p className="text-lg font-semibold">{convertTemperature(summary.minTemp)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Dominant Condition</p>
          <p className="text-lg font-semibold">{summary.dominantCondition || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default DailySummaryComponent;
