const express = require('express');
const cpuController = require('./controller');

const cpuRouter = express.Router();

cpuRouter.route('/getUsage/:ip').get(cpuController.getUsage);

module.exports = { cpuRouter };
