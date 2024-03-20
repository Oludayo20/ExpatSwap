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
   git clone https://github.com/Oludayo20/ExpatSwap
   ```
2. Navigate to the project directory:
   ```
   cd ExpatSwap/api
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

### Routes

Routes can be found in the route folder

## Documentation

### Middleware

- **Logger**: Logs incoming HTTP requests.
- **Error Handler**: Handles errors globally and returns appropriate responses.
- **Cookie Parser**: Parses cookies attached to incoming requests.
- **CORS**: Configures Cross-Origin Resource Sharing for allowing requests from different origins.
- **Body Parser**: Parses request bodies to JSON format.

### Database

The `DatabaseConnector` class in `dbConnection.js` connects the server to MongoDB using Mongoose. It includes event listeners for handling connection and error events.

## Base URL

The base URL for all API endpoints is `http://localhost:4000/api/v1`.

## Endpoint Configuration

### Get All Users

- **URL:** `/user/get-all-user`
- **Method:** `GET`
- **Query Parameters:**
  - `page` (optional): Specifies the page number for pagination. Default value is 1.

### Create User

- **URL:** `/user/create-user`
- **Method:** `POST`
- **Body Parameters:**
  - `firstName` (string, required): First name of the user.
  - `lastName` (string, required): Last name of the user.
  - `phoneNum` (integer, required): Phone number of the user.
  - `email` (string, required): Email address of the user.
  - `password` (string, required): Password of the user.
  - `dateOfBirth` (date, required): Date of birth of the user.

## Example Usage

### Get All Users

```http
GET /api/v1/user/get-all-user?page=1
```

### Create User

```http
POST /api/v1/user/create-user

{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNum": 1234567890,
  "email": "john.doe@example.com",
  "password": "password123",
  "dateOfBirth": "1990-01-01"
}
```

## License

This API documentation is released under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
