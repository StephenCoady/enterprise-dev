'use strict';

var express = require('express');
var controller = require('./module.controller');
import * as auth from '../../auth/auth.service';


var router = express.Router();

router.get('/user/:user_id', controller.index);
// router.get('/:id/resources', controller.getAllResources);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:module_id/:resource_id', controller.addResource);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
