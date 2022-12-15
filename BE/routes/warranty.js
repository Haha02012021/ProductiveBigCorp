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

function validateWarranty(req, res, next) {
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
      if(data.role == 3) {
        next();
      } else {
        res.status(403).json({success: false, message: 'not able for this role'});
      }
    });
}

router.post("/maintain", receiveRequest)

router.post("/doneWarranty", finishWaranty)

router.post('/sendBack', sendBack);

router.post('/sendBackToFactory', sendBackToFactory);

module.exports = router;