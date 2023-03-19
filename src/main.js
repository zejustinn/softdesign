import App from './App.js';
import Server from './Server.js';

new Server(new App(), process.env.EXPRESS_SERVER_PORT).run();
