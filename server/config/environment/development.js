'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://dev:dev@ds129179.mlab.com:29179/enterprise_dev_db'
  },

  // Seed database on startup
  seedDB: true

};
