var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {db, Manager, Batch} = require('../models');

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

router.post('/newProducts', validateFactory, (req, res) => {
    
})

router.get('/batches', validateFactory, async (req, res) => {
    const factory = await Manager.findOne({
        where: {
            name: 'factory1'
        },
        include: ['batches']
    })
    res.json({'data': factory});

})

module.exports = router;