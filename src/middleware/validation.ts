import { Request, Response, NextFunction } from 'express';
import { ErrorResponseDTO } from '../dto/WeatherDTO';

// Validate city query parameter
export const validateCityQuery = (req: Request, res: Response, next: NextFunction): void => {
  const { city } = req.query;

  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    const errorResponse: ErrorResponseDTO = {
      success: false,
      message: 'City parameter is required and must be a non-empty string'
    };
    res.status(400).json(errorResponse);
    return;
  }

  // Sanitize city name
  req.query.city = city.trim();
  next();
};

// Validate coordinates query parameters
export const validateCoordinatesQuery = (req: Request, res: Response, next: NextFunction): void => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    const errorResponse: ErrorResponseDTO = {
      success: false,
      message: 'Latitude and longitude parameters are required'
    };
    res.status(400).json(errorResponse);
    return;
  }

  const latitude = parseFloat(lat as string);
  const longitude = parseFloat(lon as string);

  if (isNaN(latitude) || isNaN(longitude)) {
    const errorResponse: ErrorResponseDTO = {
      success: false,
      message: 'Latitude and longitude must be valid numbers'
    };
    res.status(400).json(errorResponse);
    return;
  }

  if (latitude < -90 || latitude > 90) {
    const errorResponse: ErrorResponseDTO = {
      success: false,
      message: 'Latitude must be between -90 and 90'
    };
    res.status(400).json(errorResponse);
    return;
  }

  if (longitude < -180 || longitude > 180) {
    const errorResponse: ErrorResponseDTO = {
      success: false,
      message: 'Longitude must be between -180 and 180'
    };
    res.status(400).json(errorResponse);
    return;
  }

  // Add parsed values to request
  req.query.lat = latitude.toString();
  req.query.lon = longitude.toString();
  next();
};

// Validate search request body
export const validateSearchBody = (req: Request, res: Response, next: NextFunction): void => {
  const { city, country, lat, lon } = req.body;

  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    const errorResponse: ErrorResponseDTO = {
      success: false,
      message: 'City is required and must be a non-empty string'
    };
    res.status(400).json(errorResponse);
    return;
  }

  if (!country || typeof country !== 'string' || country.trim().length === 0) {
    const errorResponse: ErrorResponseDTO = {
      success: false,
      message: 'Country is required and must be a non-empty string'
    };
    res.status(400).json(errorResponse);
    return;
  }

  if (typeof lat !== 'number' || typeof lon !== 'number') {
    const errorResponse: ErrorResponseDTO = {
      success: false,
      message: 'Latitude and longitude must be numbers'
    };
    res.status(400).json(errorResponse);
    return;
  }

  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    const errorResponse: ErrorResponseDTO = {
      success: false,
      message: 'Invalid coordinates'
    };
    res.status(400).json(errorResponse);
    return;
  }

  // Sanitize strings
  req.body.city = city.trim();
  req.body.country = country.trim();
  next();
};