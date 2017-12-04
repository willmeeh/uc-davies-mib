const express = require('express');
const cpuController = require('./controller');

const cpuRouter = express.Router();

cpuRouter.route('/getContextCounter/:ip').get(cpuController.getContextCounter);

module.exports = { cpuRouter };
