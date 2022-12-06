const { request } = require('express');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {db, Manager, Batch, Customer, Product, History, Manager_Product, Version} = require('../models');

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

router.post('/warrantyRequest', validateStore, async (req, res) => {
    try {
        await Product.update({status_id: 6}, {where: {id: req.body.product_id}});
        await History.create({
            product_id: req.body.product_id,
            status_id: 6
        })
        res.json({success: true, message: 'request sent'});
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from warrantyRequest'});
    }   
})

router.post('/sendToWarranty', validateStore, async (req, res) => {
    try {
        await Product.update({status_id: 7}, {where: {id: req.body.products}});
        await Manager_Product.bulkCreate(
            req.body.products.map(element => {
            return {
              product_id: element,
              manager_id: req.body.maintainance_id
            }
          }));
        await History.bulkCreate(
            req.body.products.map(element => {
            return {
              product_id: element,
              status_id: 7
            }
          }))
        res.json({success: true, message: 'request sent'});
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from warrantyRequest'});
    }   
})

router.post('/warrantyReceive', validateStore, async (req, res) => {
    try {
        await Product.update({status_id: 10}, {where: {id: req.body.products}});
        await History.bulkCreate(
            req.body.products.map(element => {
            return {
              product_id: element,
              status_id: 10
            }
          }))
        res.json({success: true, message: 'request sent'});
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from warrantyReceive'});
    }
});

router.post('/sell', validateStore, async (req, res) => {
    try {
        const product = await Product.findOne({where: {version_id: req.body.version_id, color_id: req.body.color_id, status_id: 4}});
        if(product) {
            const customer = await Customer.findOrCreate({
                where: {phone: req.body.phone}, 
                defaults: {
                    name: req.body.name, 
                    phone: req.body.phone, 
                    email: req.body.email, 
                    place: req.body.place
                }
            });
            await product.update({status: 5, customer_id: customer.id});
            await History.create({
                product_id: product.id,
                status_id: 5
            })
            res.json({success: true, message: 'sold', data: {product: product, customer: customer}});
        } else {
            res.json({success: false, message: 'out of stock'});
        }
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from selling'});
    }
})


