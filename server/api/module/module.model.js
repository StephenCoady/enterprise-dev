'use strict';

import mongoose from 'mongoose';

var ModuleSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  createdBy: String,
  resources: []
});

export default mongoose.model('Module', ModuleSchema);
