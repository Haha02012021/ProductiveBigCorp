var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {createProducts, getBatches, receiveBrokenProducts} = require('../Controllers/FactoryController');

const {validateFactory} = require('../Middlewares/roleValidator');

router.post('/newProducts', createProducts);

router.get('/batches/:factory_id', getBatches);

router.post('/receiveBrokenProducts', receiveBrokenProducts);

module.exports = router;