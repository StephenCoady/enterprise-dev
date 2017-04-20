'use strict';

import angular from 'angular';
import routes from './resources.routes';
import Auth from '../../components/auth/auth.service';



export default angular.module('enterpriseDevApp.resources', ['enterpriseDevApp.auth', 'ngRoute'])
	.config(routes)
	.controller('ResourcesController', ['$scope', '$http', 'Auth', '$routeParams', '$route', 'FileUploader', function($scope, $http, Auth, $routeParams, $route, FileUploader) {
		var resources = {};

		var id = $routeParams.Id;
		var user_id;
    var uploader = $scope.uploader = new FileUploader({
      url: 'api/resources/upload/' + user_id
    });
    
		resources.getAll = function(id) {
			return $http.get('/api/resources/user/' + id);
		};

		resources.create = function(resource) {
			return $http.post('/api/resources/', resource);
		};

		resources.upload = function(resource) {
			return $http.post('/api/resources/upload/', resource);
		};

		$scope.createResource = function(resource) {
			resource.createdBy = user_id;
			resources.create(resource)
				.then(function() {
					$route.reload();
				});
		};


		Auth.getCurrentUser().then(function(user) {
			user_id = user._id;
		}).then(function() {
      uploader.url = 'api/resources/upload/' + user_id;
      console.log(uploader);
			resources.getAll(user_id).then(function(response) {
				$scope.resources = response.data;
			}, function(error) {
				console.log(error);
			});
		});

		// FILTERS

		// a sync filter
		uploader.filters.push({
			name: 'syncFilter',
			fn: function(item /*{File|FileLikeObject}*/ , options) {
				console.log('syncFilter');
				return this.queue.length < 10;
			}
		});

		// an async filter
		uploader.filters.push({
			name: 'asyncFilter',
			fn: function(item /*{File|FileLikeObject}*/ , options, deferred) {
				console.log('asyncFilter');
				setTimeout(deferred.resolve, 1e3);
			}
		});

		// CALLBACKS

		uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
			console.info('onWhenAddingFileFailed', item, filter, options);
		};
		uploader.onAfterAddingFile = function(fileItem) {
			console.info('onAfterAddingFile', fileItem);
		};
		uploader.onAfterAddingAll = function(addedFileItems) {
			console.info('onAfterAddingAll', addedFileItems);
		};
		uploader.onBeforeUploadItem = function(item) {
			console.info('onBeforeUploadItem', item);
		};
		uploader.onProgressItem = function(fileItem, progress) {
			console.info('onProgressItem', fileItem, progress);
		};
		uploader.onProgressAll = function(progress) {
			console.info('onProgressAll', progress);
		};
		uploader.onSuccessItem = function(fileItem, response, status, headers) {
			console.info('onSuccessItem', fileItem, response, status, headers);
		};
		uploader.onErrorItem = function(fileItem, response, status, headers) {
			console.info('onErrorItem', fileItem, response, status, headers);
		};
		uploader.onCancelItem = function(fileItem, response, status, headers) {
			console.info('onCancelItem', fileItem, response, status, headers);
		};
		uploader.onCompleteItem = function(fileItem, response, status, headers) {
			console.info('onCompleteItem', fileItem, response, status, headers);
		};
		uploader.onCompleteAll = function() {
      $route.reload();
			console.info('onCompleteAll');
		};

		console.info('uploader', uploader);


	}])
	.name;
