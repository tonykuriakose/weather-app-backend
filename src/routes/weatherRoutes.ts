import { Router } from 'express';
import { WeatherController } from '../controllers/WeatherController';

const router = Router();
const weatherController = new WeatherController();

router.get('/weather', weatherController.getWeatherByCity);
router.get('/weather/current', weatherController.getCurrentWeather);
router.post('/search', weatherController.addSearch);
router.get('/searches', weatherController.getSearchHistory);

export default router;