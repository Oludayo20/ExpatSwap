import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Logger from './middleware/logger.js';
import ErrorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import CorsOptions from './config/corsOptions.js';
import DatabaseConnector from './config/dbConnection.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

export default class App {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 4000;
    this.corsOptionsInstance = new CorsOptions();
    this.dbConnector = new DatabaseConnector();
    this.initializeMiddleware();
  }

  initializeMiddleware() {
    this.logger = new Logger();
    this.app.use(cors(this.corsOptionsInstance.getOptions()));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use((req, res, next) => {
      this.logger.log(req);
      next();
    });
  }

  initDB() {
    this.dbConnector.connect();
    mongoose.connection.once('open', () => {
      console.log('Connected to MongoDB');
      this.app.listen(this.PORT, () => {
        console.log(`Server running at http://localhost:${this.PORT}`);
      });
    });

    mongoose.connection.on('error', (err) => {
      console.log(err);
      this.logger.logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        'mongoErrLog.log'
      );
    });
  }

  listen() {
    this.initDB();
  }

  initializedRoutes(routes) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });

    this.app.all('*', (req, res) => {
      res.status(404);

      if (req.accepts('html')) {
        return res.send(`
          <html>
            <body>
              <h1>Sorry!</h1>
              <p>The resource you have requested does not exist.</p>
            </body>
          </html>
      `);
      } else if (req.accepts('json')) {
        return res.json({ message: '404 Not Found' });
      } else {
        return res.type('txt').send('404 Not Found');
      }
    });
    // handle global errors
    this.app.use(ErrorHandler);
  }
}
