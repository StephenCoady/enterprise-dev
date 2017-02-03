/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Module from '../api/module/module.model';
import User from '../api/user/user.model';

var user_id;
var user_two_id;
 
User.find({}).remove()
  .then(() => {
    return User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
  })
  .then(() => {
    Module.find({}).remove()
      .then(() => {
        console.log('finished populating users');
        var query = User.findOne({email: 'test@example.com'});
        return query.then(function(doc){
          user_id = doc._id;
        })
        .then(() => {
          var userTwoQuery = User.findOne({email: "admin@example.com"});
          return userTwoQuery.then(function(doc){
            user_two_id = doc._id;
          })
        })
      })
    .then(() => {

      return Module.create({
          name: 'Enterprise Development',
          info: 'Module to develop enterprise-level applications and web interfaces. Fullstack ' + 
          'development practices with analysis of modern development tools and processes.',
          createdBy: user_id
        }, {
          name: 'Cloud Technologies',
          info: 'Build modern cloud infrastructures using tools such as AWS, Docker and Kubernetes.',
            createdBy: user_id
        }, {
          name: 'Formal Specification',
          info: 'Formally specify any system using precise language and formal processes.',
            createdBy: user_id
        }, {
          name: 'Management Psychology',
          info: 'Examine the difficulties and theories associated with management across many different backgrounds.',
            createdBy: user_two_id
        }, {
          name: 'Final Year Project 1',
          info: 'A module to manage fourth year students final year project.',
            createdBy: user_two_id
        }, {
          name: 'Network Security',
          info: 'Analysis of network and system security at both user and enterprise level.',
            createdBy: user_two_id
        })
        .then(() => {
          console.log('finished populating modules');
        });
    });
  });
