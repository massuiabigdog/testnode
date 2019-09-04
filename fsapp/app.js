// var express = require('express');
// var app = express();
// const path = require('path');
// const filemanagerMiddleware = require('@opuscapita/filemanager-server').middleware;
// const logger = require('@opuscapita/filemanager-server').logger;

// let config = {
//     // fsRoot: __dirname,
//     // rootName: 'Root folder',
//       fsRoot: path.resolve(__dirname, './demo-files'),
//   rootName: 'Customization area',
//     port: process.env.PORT || '8008',
//     host: process.env.HOST || 'localhost'
//   };
  
//   let filemanager = require('@opuscapita/filemanager-server');
//   filemanager.server.run(config);

// // on the request to root (localhost:3000/)
// app.get('/', function (req, res) {
//     res.send('<b>My</b> first express http server');
// });

// // On localhost:3000/welcome
// app.get('/welcome', function (req, res) {
//     res.send('<b>Hello</b> welcome to my http server made with express');
// });

// // Change the 404 message modifing the middleware
// app.use(function(req, res, next) {
//     res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
// });

// // start the server in the port 3000 !
// app.listen(8008, function (err) {
//     console.log('Example app listening on port 8008.');
//     if (err) {
//       logger.error(err);
//     }
  
//  //   logger.info(`Server listening at http://${host}:${port}`);
// }); 
// const baseUrl = process.env.BASE_URL || '/';

// app.use(baseUrl, filemanagerMiddleware(config));

// app.use(baseUrl, express.static(path.resolve(__dirname, './static')));
// // app.listen(port, host, function(err) {
// //   if (err) {
// //     logger.error(err);
// //   }

// //   logger.info(`Server listening at http://${host}:${port}`);
// // });

// process.on('exit', function() {
//   logger.warn('Server has been stopped');
// });

const fs = require('fs');
const path = require('path');
const compression = require('compression');
const express = require('express');
const filemanagerMiddleware = require('@opuscapita/filemanager-server').middleware;
const logger = require('@opuscapita/filemanager-server').logger;
const env = require('./env.js');

const config = {
  fsRoot: path.resolve(__dirname, './demo-files'),
  rootName: 'Customization area'
};

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8008';

fs.writeFileSync(
  path.resolve(__dirname, './static/env.js'),
  'window.env = ' + JSON.stringify(env) + ';'
);

app.use(compression());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const baseUrl = process.env.BASE_URL || '/';

app.use(baseUrl, filemanagerMiddleware(config));

app.use(baseUrl, express.static(path.resolve(__dirname, './static')));
app.listen(port, host, function(err) {
  if (err) {
    logger.error(err);
  }

  logger.info(`Server listening at http://${host}:${port}`);
});

process.on('exit', function() {
  logger.warn('Server has been stopped');
});