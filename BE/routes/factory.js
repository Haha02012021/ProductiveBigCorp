var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var {body, param, validationResult} = require('express-validator');

const {createProducts, getBatches, receiveBrokenProducts, acceptRequest, requestSummon} = require('../Controllers/FactoryController');

const {validateFactory} = require('../Middlewares/roleValidator');
const {refuseRequest} = require('../Controllers/FactoryController');
const { finalCheck } = require('../Validators/checkErrors');
const { checkIntArray } = require('../Validators/arrayValidator');

router.post('/newProducts',
body('factory_id').exists().withMessage('need factory_id').isInt().withMessage('must be integer'),
finalCheck, 
createProducts);

router.post('/batches/:factory_id', getBatches);

router.post('/receiveBrokenProducts', body('products').isArray().withMessage('must be an array').custom(checkIntArray), 
finalCheck,
receiveBrokenProducts);

router.post('/request/refuse/:id', param('id').exists().withMessage('need an id').isInt().withMessage('must be integer'),
finalCheck,
refuseRequest);

router.get('/request/accept/:id/:factory_id', param('id').exists().withMessage('need an id').isInt().withMessage('must be integer'),
finalCheck,
acceptRequest);

router.post('/products/summon/:batch_id/:factory_id',
param('batch_id').exists().withMessage('need a id').isInt().withMessage('must be integer'),
finalCheck, 
requestSummon);

module.exports = router;