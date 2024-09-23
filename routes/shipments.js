var express = require('express');
var router = express.Router();
const shipmentsController = require('../controllers/shipmentsController');

/* GET shipment by getDifferentAddress. */
router.get('/getDifferentAddress', shipmentsController.getDifferentAddress);

/* GET all shipments. */
router.get('/', shipmentsController.getAllShipments);

/* GET shipment by ID. */
router.get('/:id', shipmentsController.getShipmentsById);

module.exports = router;