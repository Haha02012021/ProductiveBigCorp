var express = require('express');
var router = express.Router();

var {getVersionInfo, getModelInfo, getAllModels, getAllProducts, getAllVersions, getAllColors, getProductInfo} = require('../Controllers/index');

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

router.get('/version/:id', getVersionInfo);

router.get('/model/:id', getModelInfo);

router.get('/products/manager/:manager_id', getAllProducts);

router.get('/versions/all', getAllVersions);

router.get('/models/all', getAllModels);

router.get('/colors/all', getAllColors);

router.get('/product/detail/:id', getProductInfo)

module.exports = router;