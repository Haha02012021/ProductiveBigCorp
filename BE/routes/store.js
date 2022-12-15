const { request } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {requestWarranty, sendToWarranty, receiveWarranty, getCustomer, sell, addCustomer} = require('../Controllers/StoreController');

function validateStore(req, res, next) {
    const bearer = req.headers['authorization'];
    if(!bearer) {
      res.sendStatus(401);
    }
    const token = bearer.split(" ")[1];
    if(!token) {
      res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      console.log(typeof data.role);
      if(err) {
        res.status(403).json({success: false, message: 'token invalidated'});
      }
      if(data.role == 4) {
        next();
      } else {
        res.status(403).json({success: false, message: 'not able for this role'});
      }
    });
}

router.post('/warrantyRequest', requestWarranty);

router.post('/sendToWarranty', sendToWarranty);

router.post('/warrantyReceive', receiveWarranty);

router.post('/customer/search', getCustomer);

router.post('/customer/new', addCustomer)

router.post('/sell', sell);


module.exports = router

