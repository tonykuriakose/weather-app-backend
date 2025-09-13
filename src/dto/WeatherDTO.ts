


export interface WeatherByCityDTO {
  city: string;
}

export interface WeatherByCoordinatesDTO {
  lat: number;
  lon: number;
}

export interface AddSearchDTO {
  city: string;
  country: string;
  lat: number;
  lon: number;
}

// Simple response DTOs
export interface WeatherResponseDTO {
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

export interface ErrorResponseDTO {
  success: false;
  message: string;
  error?: string;
}

export interface SuccessResponseDTO<T> {
  success: true;
  data: T;
  message?: string;
}