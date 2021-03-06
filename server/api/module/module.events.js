/**
 * Module model events
 */

'use strict';

import {EventEmitter} from 'events';
import Module from './module.model';
var ModuleEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ModuleEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Module.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ModuleEvents.emit(`${event}:${doc._id}`, doc);
    ModuleEvents.emit(event, doc);
  };
}

export default ModuleEvents;
