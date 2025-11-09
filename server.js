/*
  ExpressJs http/s UI server. The idea is to serve UI content this way instead of using nginx.
  This idea is not fully tested, and may not work in a production setting.

  Environment variables are set in:
  - Dockerfile
  - docker-compose.yml => service:ui_csup

  ExpressJs can serve multiple sub-systems deployed under sub-directories (as git sub-modules)
  simply by instantiating another subApp=express(), then mounting that subApp within the main
  App under a subRoute like this:
    mainApp = express();
    subApp = express();
    mainApp.use('/subRoute', subApp);
  
  ExpressJs can also handle virtual hosting of subdomains. This approach should be explored to 
  see if it can also replace nginx's capacity to reverse-proxy localhost services segregated by
  port into multiple subdomains over the same port (80/443).
*/
/*
  On using environment variables to configure this expressJs http wrapper:
  - we need to distinguish between dev/localhost and dev/docker
  - if dev/localhost we require dotenv which uses .env file
  - if dev/docker we use docker-compose.yml to set environment variables
*/
const dotenv = require('dotenv').config();
const process = require('process')
const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors middleware
const app = express();
const uiApp = express();
//const vhost = require('vhost'); // For virtual hosting (subdomains)
const port = process.env.UI_PORT ? process.env.UI_PORT : 8080;

console.log('server.js=>expressJs=>dotenv', dotenv);
console.log('server.js=>expressJs=>process.env.API_PROT', process.env.API_PROT)
console.log('server.js=>expressJs=>process.env.API_HOST', process.env.API_HOST)
console.log('server.js=>expressJs=>process.env.API_PORT', process.env.API_PORT)
console.log('server.js=>expressJs=>process.env.UI_PROT', process.env.UI_PROT)
console.log('server.js=>expressJs=>process.env.UI_HOST', process.env.UI_HOST)
console.log('server.js=>expressJs=>process.env.UI_PORT', process.env.UI_PORT)

// Array of allowed origins. Need to include both API and UI (self!?)
const allowedOrigins = [
  `${process.env.API_PROT}://${process.env.API_HOST}:${process.env.API_PORT}`,
  `${process.env.UI_PROT}://${process.env.UI_HOST}:${process.env.UI_PORT}`
];
console.log('server.js=>expressJs=>allowedOrigins', allowedOrigins);

//constrain CORS origins to API and UI
var corsOptions = {
  origin: (origin, callback) => {
    console.log('server.js=>express=>corsOptions origin:', origin);
    if (typeof origin === 'undefined' || !origin || allowedOrigins.includes(origin)) { // Allow requests with no origin (e.g., Postman) OR if origin is in the allowed list
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} Not allowed by expressJs CORS config: ${JSON.stringify(allowedOrigins)}`));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false, // If you need to send cookies
};
//allow all origins
corsOptions = {
  origin: '*'
}
console.log('server.js=>expressJs=>corsOptions', corsOptions);

app.use(cors(corsOptions)); // Enable CORS for all routes

// Serve the main app
app.use(express.static(path.join(__dirname, '')));
console.log('server.js=>expressJs=>serving static content from:', path.join(__dirname, ''));

// Serve additional ui content, or another App, from a sub-directory
//uiApp.use('/', express.static(path.join(__dirname, 'sub_app')));

// If the sub_app is running under 'sub_app' root, mount the '/' route
//app.use('/', uiApp);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
