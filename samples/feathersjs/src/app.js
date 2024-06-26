const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const path = require('path');

// Create an Express compatible Feathers application
const app = express(feathers());

// Enable REST services
app.configure(express.rest());

// Enable Socket.io services
app.configure(socketio());

// Host the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple middleware to display "DefangxFeathersjs"
app.use('/', (req, res) => {
  res.send('DefangxFeathersjs');
});

module.exports = app;
