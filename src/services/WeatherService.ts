import axios from 'axios';
import { config } from '../config/config';
import { OpenWeatherMapResponse, WeatherData } from '../interfaces/Weather';
import { AppError } from '../middleware/errorHandler';

export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.apiKey = config.openWeatherMap.apiKey;
    this.baseUrl = config.openWeatherMap.baseUrl;
    this.timeout = config.openWeatherMap.timeout;

    if (!this.apiKey) {
      throw new AppError('OpenWeatherMap API key is required', 500);
    }
  }

  // Get weather by city name
  async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await axios.get<OpenWeatherMapResponse>(
        `${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`,
        { timeout: this.timeout }
      );
      
      return this.transformWeatherData(response.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new AppError(`City "${city}" not found`, 404);
      }
      if (error.response?.status === 401) {
        throw new AppError('Invalid API key', 401);
      }
      if (error.code === 'ECONNABORTED') {
        throw new AppError('Weather service request timeout', 408);
      }
      throw new AppError(`Failed to fetch weather data: ${error.message}`, 500);
    }
  }

  // Get weather by coordinates
  async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get<OpenWeatherMapResponse>(
        `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
        { timeout: this.timeout }
      );
      
      return this.transformWeatherData(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new AppError('Invalid API key', 401);
      }
      if (error.code === 'ECONNABORTED') {
        throw new AppError('Weather service request timeout', 408);
      }
      throw new AppError(`Failed to fetch weather data: ${error.message}`, 500);
    }
  }

  // Transform OpenWeatherMap response to our WeatherData interface
  private transformWeatherData(data: OpenWeatherMapResponse): WeatherData {
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: data.wind.deg || 0,
      visibility: Math.round(data.visibility / 1000), // Convert to km
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      timestamp: data.dt,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    };
  }
}