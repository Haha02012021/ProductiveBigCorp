var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var {body, query, validationResult} = require('express-validator');

const {addManager, createModel, createVersion, getAllProducts, deleteModel} = require('../Controllers/CoporationController');

const {validateCoporation} = require('../Middlewares/roleValidator');
const { finalCheck } = require('../Validators/checkErrors');
const { checkIntArray } = require('../Validators/arrayValidator');

router.post('/addManager',
body('name').exists().withMessage('need a name').isString().withMessage('need to be string').isLength({max: 16}).withMessage('max length is 16'),
body('account').exists().withMessage('need an account').isString().withMessage('need to be string').isLength({max: 16}).withMessage('max length is 16'),
body('password').exists().withMessage('need a password').isString().withMessage('need to be string').isLength({max: 16}).withMessage('max length is 16'),
body('place').exists().withMessage('need a place').isString().withMessage('need to be string'),
body('role').exists().withMessage('need a role').isIn([2, 3, 4]).withMessage('need a role, must be in 4 role'),
finalCheck,
addManager);

router.post('/newModel', 
body('name').exists().withMessage('need a name').isString('must be a string'),
finalCheck,
createModel);

router.post('/newVersion', createVersion);

router.post('/products/all', body('condition').optional({checkFalsy: null}).isObject().withMessage('must be object'), 
body('managers').optional({checkFalsy: null}).isArray().withMessage('must be array').custom(checkIntArray),
finalCheck,
getAllProducts);

router.delete('/model/:id', deleteModel);

module.exports = router;
