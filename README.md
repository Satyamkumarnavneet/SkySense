# SkySense

This project is a real-time data processing system for monitoring weather conditions in major Indian metros. It provides summarized insights using rollups and aggregates, utilizing data from the OpenWeatherMap API.

## Features

- Real-time weather data retrieval for 6 Indian metros (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad)
- Daily weather summaries with average, maximum, and minimum temperatures
- Dominant weather condition calculation
- User-configurable alerting system for temperature thresholds and specific weather conditions
- Visualizations for daily weather summaries and historical trends

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- OpenWeatherMap API key

## Setup and Running

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-monitoring-system.git
   cd weather-monitoring-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Build for Production

To build the application for production, run:

```
npm run build
```

The built files will be in the `dist` directory.

## Design Choices

- **React with TypeScript**: Chosen for its robust type checking and improved developer experience.
- **Vite**: Used as the build tool for its fast development server and optimized production builds.
- **Tailwind CSS**: Utilized for rapid UI development with utility-first CSS.
- **Axios**: Employed for making HTTP requests to the OpenWeatherMap API.
- **Chart.js and react-chartjs-2**: Used for creating visualizations of weather data.
- **Lucide React**: Chosen for its comprehensive set of customizable icons.

## Project Structure

- `src/components`: React components for different parts of the UI
- `src/services`: Services for API calls and data processing
- `src/types`: TypeScript type definitions
- `src/config`: Configuration files, including city data
- `src/App.tsx`: Main application component

## Testing

To run the tests, use the following command:

```
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).