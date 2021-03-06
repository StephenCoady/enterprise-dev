/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/modules              ->  index
 * POST    /api/modules              ->  create
 * GET     /api/modules/:id          ->  show
 * PUT     /api/modules/:id          ->  upsert
 * PATCH   /api/modules/:id          ->  patch
 * DELETE  /api/modules/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Module from './module.model';
import Resource from '../resource/resource.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
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

// Gets a list of Modules
export function index(req, res) {
  return Module.find().where('createdBy')
    .equals(req.params.user_id)
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Module from the DB
export function show(req, res) {
  return Module.find().where('_id')
    .equals(req.params.id)
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function addResource(req, res) {
  console.log(req.params);
  return Module.findOneAndUpdate({
      _id: req.params.module_id
    }, {$push: {"resources": {id: req.params.resource_id}}})
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Module in the DB
export function create(req, res) {
  return Module.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Module in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Module.findOneAndUpdate({
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

// Updates an existing Module in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Module.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Module from the DB
export function destroy(req, res) {
  return Module.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
