var express = require('express');
var router = express.Router();

var {getVersionInfo, getModelInfo, getAllModels, getAllProducts, 
    getAllVersions, getAllColors, getProductInfo, getAllManagers, getRequestInfo} = require('../Controllers/index'); 
var {param, query, validationResult} = require('express-validator');

const {authenToken} = require('../Middlewares/roleValidator');

router.get('/version/:id', getVersionInfo);

router.get('/model/:id', getModelInfo);

router.get('/products/manager/:manager_id', getAllProducts);

router.get('/versions/all', getAllVersions);

router.get('/models/all', getAllModels);

router.get('/colors/all', getAllColors);

router.get('/product/detail/:id', getProductInfo);

router.get('/managers/all', 
query('role').exists().withMessage('need a role').isIn([2, 3, 4]).withMessage('need a role, must be in 4 role'),
query('page').optional({checkFalsy: null}).isInt().withMessage('must be integer'),
(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    } else {
        next();
    }
},
getAllManagers);

router.get('/request/:id', getRequestInfo);

module.exports = router;