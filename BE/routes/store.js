const { request } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const { route } = require('.');

const {requestWarranty, sendToWarranty, receiveWarranty, getCustomer, 
    sell, addCustomer, analizeProducts, createRequest, deleteRequest, 
    completeRequest, findOneProduct} = require('../Controllers/StoreController');

const {validateStore} = require('../Middlewares/roleValidator');

router.post('/warrantyRequest', requestWarranty);

router.post('/sendToWarranty', sendToWarranty);

router.post('/warrantyReceive', receiveWarranty);

router.post('/customer/search', getCustomer);

router.post('/customer/new', addCustomer)

router.post('/sell', sell);

router.get('/analize/status/:manager_id', analizeProducts);

router.post('/request/new', createRequest);

router.delete('/request/delete/:id', deleteRequest);

router.get('/request/complete/:id', completeRequest);

router.get('/product/:uuid', findOneProduct);

module.exports = router

