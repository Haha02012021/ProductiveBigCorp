var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const { Op } = require("sequelize");
const {db, Manager} = require('../models'); 

router.post("/login", async (req, res) => {
  //res.json({'hello': 'hello'});
  try {
    const manager = await Manager.findOne({where: {account: req.body.account}});
    if(manager) {
      if(req.body.password === manager.password) {
          const accessToken = jwt.sign(manager.account, process.env.ACCESS_TOKEN_SECRET)
          res.status(200).cookie('jwt', accessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production' ? true : false,
              sameSite: 'none',
          });
          res.json({user: manager, accessToken});
      } else {
          res.status(404).json({success: false, message: 'password incorrect'});
      }
    } else {
      res.status(404).json({success: false, message: 'account incorrect'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        errors: error,
    });
  }
})

router.delete('/logout',async (req, res) => {
    try {
        // Reset cookie
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'none',
            expires: new Date(Date.now() + 1 * 1000),
        });
        res.status(200).json({
            success: true,
            message: 'success',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: error,
        });
    }
})

function authenToken(req, res, next) {
  const bearer = req.headers['authorization'];
  if(!bearer) {
    res.sendStatus(401);
  }
  const token = bearer.split(" ")[1];
  if(!token) {
    res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    if(err) {
      res.sendStatus(403);
    }
    next();
  });
}

module.exports = router;