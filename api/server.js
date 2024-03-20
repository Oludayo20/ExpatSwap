import App from './app.js';
import UserRoute from './routes/userRoutes.js';

const server = new App();

server.initializedRoutes([new UserRoute()]);
server.listen();
