var express = require('express');
var router = express.Router();

var {getVersionInfo, getModelInfo, getAllModels, getAllProducts, getAllVersions, getAllColors, getProductInfo} = require('../Controllers/index');

const {authenToken} = require('../Middlewares/roleValidator');

router.get('/version/:id', getVersionInfo);

router.get('/model/:id', getModelInfo);

router.get('/products/manager/:manager_id', getAllProducts);

router.get('/versions/all', getAllVersions);

router.get('/models/all', getAllModels);

router.get('/colors/all', getAllColors);

router.get('/product/detail/:id', getProductInfo)

module.exports = router;