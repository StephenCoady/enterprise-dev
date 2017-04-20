'use strict';

import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

// Populate databases with sample data
if(config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();
app.use(multer({
  dest: path.join(__dirname, '/uploads/')
}).any());
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);
 
// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
