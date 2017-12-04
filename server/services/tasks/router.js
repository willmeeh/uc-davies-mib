const express = require('express');
const tasksController = require('./controller');

const tasksRouter = express.Router();

tasksRouter.route('/getTotal/:ip').get(tasksController.getTotal);

module.exports = { tasksRouter };
