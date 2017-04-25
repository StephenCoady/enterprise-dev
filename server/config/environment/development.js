'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://dev:dev@ds117931.mlab.com:17931/enterprise_dev_db'
  },

  // Seed database on startup
  seedDB: true

};
