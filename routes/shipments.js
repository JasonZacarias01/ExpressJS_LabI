var express = require('express');
var router = express.Router();
var datos = require('../shipping.json');

/* GET all shipments. */
router.get('/', function(req, res, next) {
    res.render('shipmentsLayout', { shipments: datos });
});

/* GET shipment by ID. */
router.get('/:id', function(req, res, next) {
    const shipmentId = parseInt(req.params.id, 10);
    console.log(shipmentId)
    console.log(datos.find(objeto => objeto.shipmentId === shipmentId))
    res.render('shipmentsLayout', { shipments: datos.find(objeto => objeto.shipmentId === shipmentId) });
});

module.exports = router;