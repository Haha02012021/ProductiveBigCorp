var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var {body, validationResult} = require('express-validator');

const {createProducts, getBatches, receiveBrokenProducts, acceptRequest} = require('../Controllers/FactoryController');

const {validateFactory} = require('../Middlewares/roleValidator');
const {refuseRequest} = require('../Controllers/FactoryController');

router.post('/newProducts',
body('factory_id').exists().withMessage('need factory_id').isInt().withMessage('must be integer'),
(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    } else {
        next();
    }
}, 
createProducts);

router.get('/batches/:factory_id', getBatches);

router.post('/receiveBrokenProducts', receiveBrokenProducts);

router.post('/request/refuse/:id', refuseRequest);

router.get('/request/accept/:id/:factory_id', acceptRequest);

module.exports = router;