/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Resources              ->  index
 * POST    /api/Resources              ->  create
 * GET     /api/Resources/:id          ->  show
 * PUT     /api/Resources/:id          ->  upsert
 * PATCH   /api/Resources/:id          ->  patch
 * DELETE  /api/Resources/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Resource from './resource.model';
import fs from 'fs';

function respondWithResult(res, statusCode) {
	statusCode = statusCode || 200;
	return function(entity) {
		if (entity) {
			return res.status(statusCode).json(entity);
		}
		return null;
	};
}

function patchUpdates(patches) {
	return function(entity) {
		try {
			jsonpatch.apply(entity, patches, /*validate*/ true);
		} catch (err) {
			return Promise.reject(err);
		}

		return entity.save();
	};
}

function removeEntity(res) {
	return function(entity) {
		if (entity) {
			return entity.remove()
				.then(() => {
					res.status(204).end();
				});
		}
	};
}

function handleEntityNotFound(res) {
	return function(entity) {
		if (!entity) {
			res.status(404).end();
			return null;
		}
		return entity;
	};
}

function handleError(res, statusCode) {
	statusCode = statusCode || 500;
	return function(err) {
		res.status(statusCode).send(err);
	};
}

// Gets a list of Resources
export function index(req, res) {
	return Resource.find().where('createdBy').equals(req.params.user_id).exec()
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Gets a single Resource from the DB
export function show(req, res) {
	return Resource.find().where('_id').equals(req.params.id).exec()
		.then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Creates a new Resource in the DB
export function create(req, res) {
	return Resource.create(req.body)
		.then(respondWithResult(res, 201))
		.catch(handleError(res));
}

export function upload(req, res) {
  console.log(req.params);
	if (req.files) {
			fs.readFile(req.files[0].path, function(err, data) {
				if (data) {
					console.log(req.files);
					var path = require('path');
					var savePath = req.files[0].destination;
					savePath += req.files[0].originalname;
					fs.writeFile(savePath, data, function(error, saved) {
            if(!error){
              var file = {}
              file.name = req.files[0].originalname;
              file.createdBy = req.params.user_id;
              file.link = req.files[0].destination + '/' + req.files[0].originalname;
              Resource.create(file)
            		.then(respondWithResult(res, 201))
            		.catch(handleError(res));
            }
					});
				}
			});
	} else {
		res.status(500).json({
			error: "No file found in request"
		})
	}
}

// Upserts the given Resource in the DB at the specified ID
export function upsert(req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	return Resource.findOneAndUpdate({
			_id: req.params.id
		}, req.body, {
			new: true,
			upsert: true,
			setDefaultsOnInsert: true,
			runValidators: true
		}).exec()

		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Updates an existing Resource in the DB
export function patch(req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	return Resource.findById(req.params.id).exec()
		.then(handleEntityNotFound(res))
		.then(patchUpdates(req.body))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Deletes a Resource from the DB
export function destroy(req, res) {
	return Resource.findById(req.params.id).exec()
		.then(handleEntityNotFound(res))
		.then(removeEntity(res))
		.catch(handleError(res));
}
