'use strict';

var express = require('express');
var controller = require('./resource.controller');
import * as auth from '../../auth/auth.service';


var router = express.Router();

router.get('/user/:user_id', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/upload/:user_id', controller.upload);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
