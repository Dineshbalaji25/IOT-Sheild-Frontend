# IOT Shield Frontend

This is the frontend dashboard for the IOT Shield Monitoring Platform, built with React, Vite, and Recharts. It provides real-time visualization of telemetry data from connected IoT devices.

## Features

- **Real-Time Dashboard**: Displays live stats like total messages, alerts, and active devices.
- **Charts**: Visualizes temperature, humidity, and voltage data using Recharts.
- **Alert Monitoring**: Shows a feed of recent alerts triggered by violated sensor thresholds.

## Requirements

- Node.js (version 18 or higher recommended)
- npm or yarn

## Setup and Execution Steps

1. **Install Dependencies**

   Open a terminal in the `IOT-Sheild-frontend` directory and run:

   ```bash
   npm install
   ```

2. **Environment Variables**

   Ensure you have a `.env` file in the root of the frontend project:

   ```env
   VITE_API_URL=/api
   ```

   *(Note: The `/api` proxy is configured in `vite.config.js` to route traffic to the backend at `http://localhost:8000` to prevent CORS issues.)*

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. **Access the Application**

   Open your browser and navigate to `http://localhost:5173`. You should see the dashboard loading data.

## Backend Integration

This frontend relies on the IOT Shield Backend to function properly. Please ensure the backend server and its MQTT broker are running on port `8000` before starting the frontend so data populates correctly.
