var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {db, Manager, Batch, Product, History} = require('../models');
const {createProducts, getBatches} = require('../Controllers/FactoryController');

function validateFactory(req, res, next) {
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
      if(data.role == 2) {
        next();
      } else {
        res.status(403).json({success: false, message: 'not able for this role'});
      }
    });
}

router.post('/newProducts', validateFactory, createProducts);

router.get('/batches', validateFactory, getBatches);

router.post('/sendProducts', validateFactory, async (req, res) => {
  
})

module.exports = router;