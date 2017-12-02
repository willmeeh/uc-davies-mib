const express = require('express');
const diskController = require('./controller');

const diskRouter = express.Router();

diskRouter.route('/getUsage/:ip').get(diskController.getUsage);

module.exports = { diskRouter };
