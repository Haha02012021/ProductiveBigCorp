const { request } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {db, History, Product} = require('../models')

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

router.post("/maintain", validateWarranty, async (req, res) => {
    try {
      await Product.update({status_id: 8}, {where: {id: req.body.products}});
      await History.bulkCreate(
          req.body.products.map(element => {
          return {
            product_id: element,
            status_id: 8
          }
        }))
      res.json({success: true, message: 'request sent'});
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from maintain'});
    }
})

router.post("/doneWarranty", validateWarranty, async (req, res) => {
    try {
        const product = await Product.findByPk(req.body.product_id);
        let status = 9;
        if(!req.body.repaired) {
          status = 12
        }
        await Product.update({status_id: status}, {where: {id: req.body.product_id}} );
        await History.create({
            product_id: req.body.product_id,
            status_id: status
        })
        if(status === 9) {
          res.json({success: true, message: 'done maintaining, sending to store'});
        } else {
          res.json({success: true, message: 'can not repair'});
        }
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from maintain'});
    }
})

router.post('sendBack', validateWarranty, async (req, res) => {
  try {
    await Product.update({status_id: 8}, {where: {id: req.body.products}});
    await History.bulkCreate(
        req.body.products.map(element => {
        return {
          product_id: element,
          status_id: 8
        }
      }))
    res.json({success: true, message: 'request sent'});
  } catch (err) {

  }
})