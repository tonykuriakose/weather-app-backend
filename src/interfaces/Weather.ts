
export interface OpenWeatherMapResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}


export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  icon: string;
  sunrise: number;
  sunset: number;
  timestamp: number;
  coordinates: {
    lat: number;
    lon: number;
  };
}


export interface SearchHistoryItem {
  id: string;
  city: string;
  country: string;
  searchedAt: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}


export interface WeatherQuery {
  city?: string;
  lat?: number;
  lon?: number;
}

export interface SearchRequest {
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}