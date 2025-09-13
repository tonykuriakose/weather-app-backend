import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  // Server configuration
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // API configuration
  openWeatherMap: {
    apiKey: process.env.OPENWEATHER_API_KEY || '',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
    timeout: 5000, // 5 seconds
  },
  
  // CORS configuration
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  
  // Request limits
  requestLimits: {
    jsonLimit: '10mb',
    urlEncodedLimit: '10mb',
  },
  
  // Search configuration
  search: {
    maxHistoryItems: 10,
  }
};

// Validate required environment variables
export const validateConfig = (): void => {
  const requiredEnvVars = ['OPENWEATHER_API_KEY'];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
};

// Check if we're in development mode
export const isDevelopment = (): boolean => {
  return config.nodeEnv === 'development';
};

// Check if we're in production mode
export const isProduction = (): boolean => {
  return config.nodeEnv === 'production';
};