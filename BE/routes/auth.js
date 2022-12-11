var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {login, logout} = require('../Controllers/auth');

router.post("/login", login);

router.delete('/logout', logout);

module.exports = router;