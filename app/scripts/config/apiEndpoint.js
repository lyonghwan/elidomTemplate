'use strict';

/**
 * @ngdoc constant
 * @name GulpTest.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('ElidomTemplate')

  // development
  .constant('API_ENDPOINT', {
    host: 'http://192.168.35.227',
    port: 8080,
    path: '/elidom',
    needsAuth: false
  });


  // live example with HTTP Basic Auth
  /*
  .constant('API_ENDPOINT', {
    host: 'http://yourserver.com',
    path: '/api/v2',
    needsAuth: true,
    username: 'whatever',
    password: 'foobar'
  });
  */

