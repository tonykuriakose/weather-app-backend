import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes';
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';

const app: Application = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
});


app.use('/api', weatherRoutes);


app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Weather API is running',
    environment: process.env.NODE_ENV || 'development'
  });
});


app.use(notFoundHandler);


app.use(globalErrorHandler);

export default app;