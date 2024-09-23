const { trasnformData, findDifferences } = require('../transformers/shipmentsTransformer');
const datos = require('../data/shipments.json');
const users = require('../data/users.json');

exports.getAllShipments = (req, res, next) => {
  try {
    const transformedShipments = trasnformData(datos);
    const useTemplate = req.query.template === 'true';
    if(useTemplate) {
        res.render('shipmentsLayout', { shipments: transformedShipments });
    } else {
        res.json(transformedShipments);
    }
  } catch (error) {
    next(error);
  }
};

exports.getShipmentsById = (req, res, next) => {
    try {
        const useTemplate = req.query.template === 'true';
        const shipmentId = parseInt(req.params.id, 10);
        const filteredData = [datos.find(objeto => objeto.shipmentId === shipmentId)] || [];
        const transformedShipments = filteredData[0] === undefined ? [] : trasnformData(filteredData);
        
        if(useTemplate) {
            res.render('shipmentsLayout', { shipments: filteredData.length === 0 ? [] : transformedShipments });
        } else {
            res.json(transformedShipments);
        }
        
    } catch (error) {
      next(error);
    }
  };

  exports.getDifferentAddress = (req, res, next) => {
    try {
      const differentData = findDifferences(datos, users)
      res.json(differentData);
        
    } catch (error) {
      next(error);
    }
  };
