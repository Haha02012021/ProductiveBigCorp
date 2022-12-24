const { request } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {requestWarranty, sendToWarranty, receiveWarranty, getCustomer, sell, addCustomer, analizeProducts} = require('../Controllers/StoreController');

const {validateStore} = require('../Middlewares/roleValidator');

router.post('/warrantyRequest', requestWarranty);

router.post('/sendToWarranty', sendToWarranty);

router.post('/warrantyReceive', receiveWarranty);

router.post('/customer/search', getCustomer);

router.post('/customer/new', addCustomer)

router.post('/sell', sell);

router.get('/analize/status/:manager_id', analizeProducts);


module.exports = router

