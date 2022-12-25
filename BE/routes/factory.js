var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var {body, validationResult} = require('express-validator');

const {createProducts, getBatches, receiveBrokenProducts} = require('../Controllers/FactoryController');

const {validateFactory} = require('../Middlewares/roleValidator');

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

module.exports = router;