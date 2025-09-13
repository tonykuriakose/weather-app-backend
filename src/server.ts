import app from './app';
import { config, validateConfig } from './config/config';

// Validate configuration before starting server
try {
  validateConfig();
  console.log('✅ Configuration validated successfully');
} catch (error: any) {
  console.error('❌ Configuration validation failed:', error.message);
  console.error('Please check your .env file and ensure all required variables are set');
  process.exit(1);
}

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log('🌤️  Weather API Server Started');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔑 OpenWeatherMap API configured: ${config.openWeatherMap.apiKey ? '✅' : '❌'}`);
});

// Graceful shutdown handlers
const gracefulShutdown = (signal: string) => {
  console.log(`\n👋 ${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error('❌ Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});