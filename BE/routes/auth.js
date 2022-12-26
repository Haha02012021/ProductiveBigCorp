var express = require('express');
var router = express.Router();
var {body, validationResult} = require('express-validator');

const {login, logout} = require('../Controllers/auth');
const { finalCheck } = require('../Validators/checkErrors');

router.post("/login", 
    body('account').exists().withMessage('account is required').
    isString().withMessage('must be a string')
    .isLength({min: 4, max: 16}).withMessage('length must be between 8-16'), 
    body('password').exists().withMessage('password is required'),
    finalCheck,
    login);

router.delete('/logout', logout);

module.exports = router;