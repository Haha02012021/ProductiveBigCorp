var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var {body, query, validationResult} = require('express-validator');

const {addManager, createModel, createVersion, getAllProducts} = require('../Controllers/CoporationController');

const {validateCoporation} = require('../Middlewares/roleValidator');

router.post('/addManager',
body('name').exists().withMessage('need a name').isString().withMessage('need to be string').isLength({max: 16}).withMessage('max length is 16'),
body('account').exists().withMessage('need an account').isString().withMessage('need to be string').isLength({max: 16}).withMessage('max length is 16'),
body('password').exists().withMessage('need a password').isString().withMessage('need to be string').isLength({max: 16}).withMessage('max length is 16'),
body('place').exists().withMessage('need a place').isString().withMessage('need to be string'),
body('role').exists().withMessage('need a role').isIn([2, 3, 4]).withMessage('need a role, must be in 4 role'),
(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    } else {
        next();
    }
},
addManager);

router.post('/newModel', 
body('name').exists().withMessage('need a name').isString('must be a string'),
(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    } else {
        next();
    }
},
createModel);

router.post('/newVersion', createVersion);

router.post('/products/all', getAllProducts);

module.exports = router;
