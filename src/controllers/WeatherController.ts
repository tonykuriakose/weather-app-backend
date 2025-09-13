import { Request, Response } from 'express';
import {  } from '../services/WeatherService';
import { SearchService } from '../services/SearchService';
import { WeatherService } from '../services/WeatherService';
import { AddSearchDTO,WeatherResponseDTO,SuccessResponseDTO,ErrorResponseDTO } from '../dto/WeatherDTO';

export class WeatherController {
  private weatherService: WeatherService;
  private searchService: SearchService;

  constructor() {
    this.weatherService = new WeatherService();
    this.searchService = new SearchService();
  }

  
  getWeatherByCity = async (req: Request, res: Response): Promise<void> => {
    try {
      const city = req.query.city as string;

      if (!city) {
        const errorResponse: ErrorResponseDTO = {
          success: false,
          message: 'City parameter is required'
        };
        res.status(400).json(errorResponse);
        return;
      }

      const weatherData = await this.weatherService.getWeatherByCity(city);
      
      const response: SuccessResponseDTO<WeatherResponseDTO> = {
        success: true,
        data: weatherData,
        message: 'Weather data retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error: any) {
      const errorResponse: ErrorResponseDTO = {
        success: false,
        message: 'Failed to fetch weather data',
        error: error.message
      };
      res.status(500).json(errorResponse);
    }
  };

  // GET /api/weather/current?lat=X&lon=Y
  getCurrentWeather = async (req: Request, res: Response): Promise<void> => {
    try {
      const lat = req.query.lat as string;
      const lon = req.query.lon as string;

      if (!lat || !lon) {
        const errorResponse: ErrorResponseDTO = {
          success: false,
          message: 'Latitude and longitude parameters are required'
        };
        res.status(400).json(errorResponse);
        return;
      }

      const weatherData = await this.weatherService.getWeatherByCoordinates(
        parseFloat(lat),
        parseFloat(lon)
      );

      const response: SuccessResponseDTO<WeatherResponseDTO> = {
        success: true,
        data: weatherData,
        message: 'Current weather data retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error: any) {
      const errorResponse: ErrorResponseDTO = {
        success: false,
        message: 'Failed to fetch current weather data',
        error: error.message
      };
      res.status(500).json(errorResponse);
    }
  };

  // POST /api/search
  addSearch = async (req: Request, res: Response): Promise<void> => {
    try {
      const { city, country, lat, lon } = req.body;

      if (!city || !country || lat === undefined || lon === undefined) {
        const errorResponse: ErrorResponseDTO = {
          success: false,
          message: 'City, country, lat, and lon are required'
        };
        res.status(400).json(errorResponse);
        return;
      }

      const searchData: AddSearchDTO = {
        city,
        country,
        lat,
        lon
      };

      const searchItem = this.searchService.addSearch(searchData);

      const response: SuccessResponseDTO<typeof searchItem> = {
        success: true,
        data: searchItem,
        message: 'Search added to history'
      };

      res.status(201).json(response);
    } catch (error: any) {
      const errorResponse: ErrorResponseDTO = {
        success: false,
        message: 'Failed to add search to history',
        error: error.message
      };
      res.status(500).json(errorResponse);
    }
  };

  // GET /api/searches
  getSearchHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const searches = this.searchService.getAllSearches();

      const response: SuccessResponseDTO<typeof searches> = {
        success: true,
        data: searches,
        message: 'Search history retrieved successfully'
      };

      res.status(200).json(response);
    } catch (error: any) {
      const errorResponse: ErrorResponseDTO = {
        success: false,
        message: 'Failed to retrieve search history',
        error: error.message
      };
      res.status(500).json(errorResponse);
    }
  };
}