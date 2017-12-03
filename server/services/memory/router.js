const express = require('express');
const memoryController = require('./controller');

const memoryRouter = express.Router();

memoryRouter.route('/getUsage/:ip').get(memoryController.getUsage);
memoryRouter.route('/getTotal/:ip').get(memoryController.getTotal);
memoryRouter.route('/getFree/:ip').get(memoryController.getFree);

module.exports = { memoryRouter };
