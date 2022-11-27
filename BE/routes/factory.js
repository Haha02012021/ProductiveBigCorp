var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {db, Manager, Batch, Product, History} = require('../models');

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

router.post('/newProducts', validateFactory, async (req, res) => {
    const batch = await Batch.create({
      factory_id: req.body.factory_id,
      color_id: req.body.color_id,
      model_id: req.body.model_id,
      version_id: req.body.version_id,
      amount: req.amount
    })

    const products = await Product.bulkCreate([
      {
        color_id: req.body.color_id,
        model_id: req.body.model_id,
        version_id: req.body.version_id,
        batch_id: batch.id,
        status_id: 1
      }
    ])

    const historyLog = products.forEach(element => {
      return {
        product_id: element.id,
        status_id: 1,
      }
    });

    const history = await History.bulkCreate(historyLog)

})

router.get('/batches', validateFactory, async (req, res) => {
    const factory = await Batch.findAll({
      where: {
        factory_id: req.body.factory_id
      }
    })
    res.json({'data': factory});

})



module.exports = router;