import React, { useState } from 'react';
import { AlertConfig } from '../types/WeatherTypes';

interface AlertSystemProps {
  onAlertConfigChange: (config: AlertConfig) => void;
}

interface ActiveAlert {
  id: number;
  message: string;
  condition?: string; // To store condition in case of weather condition alerts
}

const AlertSystem: React.FC<AlertSystemProps> = ({ onAlertConfigChange }) => {
  const [alertType, setAlertType] = useState<'temperature' | 'condition'>('temperature');
  const [threshold, setThreshold] = useState<number>(35);
  const [consecutiveCount, setConsecutiveCount] = useState<number>(2);
  const [condition, setCondition] = useState<string>('');
  const [unit, setUnit] = useState<'Celsius' | 'Fahrenheit' | 'Kelvin'>('Celsius');
  const [activeAlerts, setActiveAlerts] = useState<ActiveAlert[]>([]);
  const [pastAlerts, setPastAlerts] = useState<ActiveAlert[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const convertToPreferredUnit = (temp: number) => {
    switch (unit) {
      case 'Celsius':
        return temp;
      case 'Fahrenheit':
        return (temp * 9) / 5 + 32;
      case 'Kelvin':
        return temp + 273.15;
      default:
        return temp;
    }
  };

  // Function to check if a duplicate alert exists (case insensitive)
  const isDuplicateAlert = (message: string, condition?: string) => {
    const formattedCondition = condition ? condition.toLowerCase() : null;

    return activeAlerts.some(alert => 
      alert.message.toLowerCase() === message.toLowerCase() &&
      (!condition || alert.condition?.toLowerCase() === formattedCondition)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (consecutiveCount <= 0) {
      alert('Consecutive updates must be at least 1.');
      return;
    }

    const config: AlertConfig = {
      type: alertType,
      threshold: convertToPreferredUnit(threshold),
      consecutiveCount: alertType === 'temperature' ? consecutiveCount : undefined,
      ...(alertType === 'condition' && { condition }),
      unit,
    };

    const alertMessage = alertType === 'temperature'
      ? `Temperature exceeds ${threshold}°${unit}`
      : `Condition is ${condition.toLowerCase()}`; // Store condition in lowercase for consistency

    // Prevent duplicate alerts
    if (isDuplicateAlert(alertMessage, condition)) {
      alert('An alert for this condition already exists.');
      return;
    }

    onAlertConfigChange(config);

    setActiveAlerts([...activeAlerts, { id: Date.now(), message: alertMessage, condition: condition.toLowerCase() }]);
    setShowConfirmation(true);

    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000); // Hide confirmation after 3 seconds
  };

  const stopAlert = (id: number) => {
    const stoppedAlert = activeAlerts.find(alert => alert.id === id);
    if (stoppedAlert) {
      setPastAlerts([...pastAlerts, stoppedAlert]);
      setActiveAlerts(activeAlerts.filter(alert => alert.id !== id));
    }
  };

  const deleteAllPastAlerts = () => {
    setPastAlerts([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Alert Configuration</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alert Type:
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value as 'temperature' | 'condition')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="temperature">Temperature</option>
              <option value="condition">Weather Condition</option>
            </select>
          </label>
        </div>

        {alertType === 'temperature' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature Threshold (°{unit}):
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consecutive Updates for Alert:
                <input
                  type="number"
                  value={consecutiveCount}
                  onChange={(e) => setConsecutiveCount(Number(e.target.value))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature Unit:
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'Celsius' | 'Fahrenheit' | 'Kelvin')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="Celsius">Celsius</option>
                  <option value="Fahrenheit">Fahrenheit</option>
                  <option value="Kelvin">Kelvin</option>
                </select>
              </label>
            </div>
          </>
        )}

        {alertType === 'condition' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weather Condition:
              <input
                type="text"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., Rain, Snow, Clear"
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Set Alert
        </button>

        {showConfirmation && (
          <div className="mt-4 text-green-600">Alert created successfully!</div>
        )}
      </form>

      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-800">Active Alerts</h4>
        {activeAlerts.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {activeAlerts.map(alert => (
              <li
                key={alert.id}
                className="bg-red-100 p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <span>{alert.message}</span>
                <button
                  onClick={() => stopAlert(alert.id)}
                  className="text-red-600 hover:underline"
                >
                  Stop
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-500">No active alerts.</p>
        )}
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-800">Past Alerts</h4>
        {pastAlerts.length > 0 ? (
          <>
            <ul className="mt-4 space-y-2">
              {pastAlerts.map(alert => (
                <li
                  key={alert.id}
                  className="bg-yellow-100 p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <span>{alert.message}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={deleteAllPastAlerts}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-md"
            >
              Delete All Past Alerts
            </button>
          </>
        ) : (
          <p className="mt-2 text-gray-500">No past alerts.</p>
        )}
      </div>
    </div>
  );
};

export default AlertSystem;
