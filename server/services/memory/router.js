const express = require('express');
const memoryController = require('./controller');

const memoryRouter = express.Router();

memoryRouter.route('/getUsage/:ip').get(memoryController.getUsage);

module.exports = { memoryRouter };
