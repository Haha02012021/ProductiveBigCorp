const { request } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {
  receiveRequest,
  finishWaranty,
  sendBack,
  sendBackToFactory,
} = require('../Controllers/WarrantyController');
const { route } = require('./factory');

const validateWarranty = require('../Middlewares/roleValidator');

router.post("/maintain", receiveRequest)

router.post("/doneWarranty", finishWaranty)

router.post('/sendBack', sendBack);

router.post('/sendBackToFactory', sendBackToFactory);

module.exports = router;