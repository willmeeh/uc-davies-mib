const express = require('express');
const diskController = require('./controller');

const diskRouter = express.Router();

diskRouter.route('/getUsage/:ip').get(diskController.getUsage);
diskRouter.route('/getFree/:ip').get(diskController.getFree);
diskRouter.route('/getTotal/:ip').get(diskController.getTotal);
diskRouter.route('/getUsagePercent/:ip').get(diskController.getUsagePercent);
diskRouter.route('/getInodesUsedPercent/:ip').get(diskController.getInodesUsedPercent);

module.exports = { diskRouter };
