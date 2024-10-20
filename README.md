# SkySense

SkySense is a real-time web application for monitoring weather conditions in major Indian cities. It provides summarized insights using data from the OpenWeatherMap API and allows users to customize temperature units and alerts.

## Features

- Real-time weather data retrieval for major Indian metros (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad)
- Daily weather summaries including average, maximum, and minimum temperatures
- Calculation of dominant weather conditions
- User-configurable alert system for temperature thresholds and specific weather conditions
  
## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- OpenWeatherMap API key

## Setup and Running

1. Clone the repository:
   ```bash
   git clone https://github.com/Satyamkumarnavneet/SkySense
   cd SkySense

   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set your API key in the `src/services/WeatherService.ts` file:
   ```
   const API_KEY = 'your_api_key_here';
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
- **Lucide React**: Chosen for its comprehensive set of customizable icons.

## Project Structure

- `src/components`: React components for different parts of the UI
- `src/services`: Services for API calls and data processing
- `src/types`: TypeScript type definitions
- `src/config`: Configuration files, including city data
- `src/App.tsx`: Main application component


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

