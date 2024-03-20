# Expatswap - Api

This is a `Node.js / Express` project

First, run the development server:

````bash
npm run dev

The following log message should be displayed in console output:

```bash
Server started at http://localhost:4000
````

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- MongoDB installed and running locally or remotely

### Installation

1. Clone this repository to your local machine:
   ```
   git clone https://github.com/your-username/express-server-template.git
   ```
2. Navigate to the project directory:
   ```
   cd express-server-template
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up environment variables by creating a `.env` file in the root directory and specifying the following variables:
   ```
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   ```

## Usage

### Initialization

The `App` class in `app.js` initializes the Express application and sets up middleware. To start the server, call the `listen()` method after initializing routes.

```javascript
import App from './app.js';
import routes from './routes/index.js';

const app = new App();
app.initializedRoutes(routes);
app.listen();
```

### Initializing Routes

Routes can be initialized by passing an array of route objects to the `initializedRoutes()` method of the `App` instance. Each route object should contain a `router` property, which is an instance of Express Router.

```javascript
import express from 'express';
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default router;
```

```javascript
// index.js
import userRoutes from './userRoutes.js';

const routes = [userRoutes];
export default routes;
```

## Documentation

### Middleware

- **Logger**: Logs incoming HTTP requests.
- **Error Handler**: Handles errors globally and returns appropriate responses.
- **Cookie Parser**: Parses cookies attached to incoming requests.
- **CORS**: Configures Cross-Origin Resource Sharing for allowing requests from different origins.
- **Body Parser**: Parses request bodies to JSON format.

### Database

The `DatabaseConnector` class in `dbConnection.js` connects the server to MongoDB using Mongoose. It includes event listeners for handling connection and error events.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
