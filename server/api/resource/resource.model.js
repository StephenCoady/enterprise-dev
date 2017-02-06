'use strict';

import mongoose from 'mongoose';

var ResourceSchema = new mongoose.Schema({
  name: String,
  createdBy: String,
  link: String
});

export default mongoose.model('Resource', ResourceSchema);
