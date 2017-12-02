const express = require('express');
const tasksController = require('./controller');

const tasksRouter = express.Router();

tasksRouter.route('/getUsage/:ip').get(tasksController.getUsage);

module.exports = { tasksRouter };
