import allowedOrigins from './allowedOrigins.js';

class CorsOptions {
  constructor() {
    this.allowedOrigins = allowedOrigins;
  }

  getOptions() {
    return {
      origin: (origin, callback) => {
        if (this.allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      optionsSuccessStatus: 200
    };
  }
}

export default CorsOptions;
