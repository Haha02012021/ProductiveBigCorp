var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {login, logout} = require('../Controllers/auth');

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

router.post("/login", login);

router.delete('/logout', logout);

module.exports = router;