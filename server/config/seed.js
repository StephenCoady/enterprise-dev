/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Module from '../api/module/module.model';
import User from '../api/user/user.model';
import Resource from '../api/resource/resource.model';

var user_id;
var user_two_id;
var resource_id;
var resource_two_id;
var resource_three_id;
var resource_four_id;
var resource_five_id;
var resource_six_id;
var resource_seven_id;
var resource_eight_id;
var resource_nine_id;

User.find({}).remove()
  .then(() => {
    console.log('old users removed');
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
    Resource.find({}).remove()
      .then(() => {
        console.log('finished populating new users');
        console.log('old resources removed');
        var query = User.findOne({
          email: 'test@example.com'
        });
        return query.then(function(doc) {
            user_id = doc._id;
          })
          .then(() => {
            var userTwoQuery = User.findOne({
              email: "admin@example.com"
            });
            return userTwoQuery.then(function(doc) {
                user_two_id = doc._id;
              })
              .then(() => {
                return Resource.create({
                  name: 'Cloud Resource 1',
                  createdBy: user_id,
                  link: 'www.cloud1.ie'
                }, {
                  name: 'Cloud Resource 2',
                  createdBy: user_id,
                  link: 'www.cloud2.ie'
                }, {
                  name: 'Cloud Resource 3',
                  createdBy: user_id,
                  link: 'www.cloud3.ie'
                }, {
                  name: 'Enterprise Resource 1',
                  createdBy: user_id,
                  link: 'www.ent1.ie'
                }, {
                  name: 'Enterprise Resource 2',
                  createdBy: user_id,
                  link: 'www.ent2.ie'
                }, {
                  name: 'Enterprise Resource 3',
                  createdBy: user_id,
                  link: 'www.ent3.ie'
                }, {
                  name: 'Formal Resource 1',
                  createdBy: user_id,
                  link: 'www.formal1.ie'
                }, {
                  name: 'Formal Resource 2',
                  createdBy: user_id,
                  link: 'www.formal2.ie'
                }, {
                  name: 'Formal Resource 3',
                  createdBy: user_id,
                  link: 'www.formal3.ie'
                })
              })
              .then(() => {
                console.log('finished populating resources');
              })  
              .then(() => {
                  Module.find({}).remove()
                    .then(() => {
                      console.log('old modules removed');
                      var query = Resource.findOne({
                        name: "Cloud Resource 1"
                      });
                      return query.then(function(doc) {
                          resource_id = doc._id;
                        })
                        .then(() => {
                          var query = Resource.findOne({
                            name: "Cloud Resource 2"
                          });
                          return query.then(function(doc) {
                            resource_two_id = doc._id;
                          })
                        })
                        .then(() => {
                          var query = Resource.findOne({
                            name: "Enterprise Resource 1"
                          });
                          return query.then(function(doc) {
                            resource_three_id = doc._id;
                          })
                        })
                        .then(() => {
                          var query = Resource.findOne({
                            name: "Enterprise Resource 3"
                          });
                          return query.then(function(doc) {
                            resource_four_id = doc._id;
                          })
                        })
                        .then(() => {
                          var query = Resource.findOne({
                            name: "Formal Resource 1"
                          });
                          return query.then(function(doc) {
                            resource_five_id = doc._id;
                          })
                        })
                    })
                    .then(() => {
                      return Module.create({
                          name: 'Enterprise Development',
                          info: 'Module to develop enterprise-level applications and web interfaces. Fullstack ' +
                            'development practices with analysis of modern development tools and processes.',
                          createdBy: user_id,
                          resources: [{
                            id: resource_three_id,
                            position: 0
                          }, {
                            id: resource_four_id,
                            position: 1
                          }]
                        }, {
                          name: 'Cloud Technologies',
                          info: 'Build modern cloud infrastructures using tools such as AWS, Docker and Kubernetes.',
                          createdBy: user_id,
                          resources: [{
                            id: resource_id,
                            position: 0
                          }, {
                            id: resource_two_id,
                            position: 1
                          }]
                        }, {
                          name: 'Formal Specification',
                          info: 'Formally specify any system using precise language and formal processes.',
                          createdBy: user_id,
                          resources: [{
                            id: resource_five_id,
                            position: 2
                          }]
                        }, {
                          name: 'Management Psychology',
                          info: 'Examine the difficulties and theories associated with management across many different backgrounds.',
                          createdBy: user_two_id,
                          resources: []
                        }, {
                          name: 'Final Year Project 1',
                          info: 'A module to manage fourth year students final year project.',
                          createdBy: user_two_id,
                          resources: []
                        }, {
                          name: 'Network Security',
                          info: 'Analysis of network and system security at both user and enterprise level.',
                          createdBy: user_two_id,
                          resources: []
                        })
                        .then(() => {
                          console.log('finished populating modules');
                        });
                    })
                });
          })
      })
  });
