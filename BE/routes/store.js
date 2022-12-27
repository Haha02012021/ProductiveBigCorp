const { request } = require("express");
var express = require("express");
const { body, param } = require("express-validator");

var router = express.Router();
var jwt = require("jsonwebtoken");
const { route } = require(".");

const {
  requestWarranty, 
  sendToWarranty, 
  receiveWarranty, 
  getCustomer, 
  sell, 
  addCustomer, 
  analizeProducts, 
  createRequest, 
  deleteRequest, 
  completeRequest,
  sendBackToCustomer,
  receiveFromCustomer,
  compensate} = require('../Controllers/StoreController');

const { validateStore } = require("../Middlewares/roleValidator");
const { checkIntArray } = require("../Validators/arrayValidator");
const { finalCheck } = require("../Validators/checkErrors");
const { checkSpecialCharacters } = require("../Validators/stringValidator");

router.post(
  "/warrantyRequest",
  body("product_id")
    .exists()
    .withMessage("need a product_id")
    .isInt()
    .withMessage("must be integer"),
  body("store_id")
    .exists()
    .withMessage("need a store_id")
    .isInt()
    .withMessage("must be integer"),
  body("content")
    .exists()
    .withMessage("need a error content")
    .isString()
    .withMessage("must be string"),
  finalCheck,
  requestWarranty
);

router.post(
  "/sendToWarranty",
  body("store_id")
    .exists()
    .withMessage("need a store_id")
    .isInt()
    .withMessage("must be integer"),
  body("warranty_id")
    .exists()
    .withMessage("need a warranty_id")
    .isInt()
    .withMessage("must be integer"),
  body("products").custom(checkIntArray),
  finalCheck,
  sendToWarranty
);

router.post(
  "/warrantyReceive",
  body("store_id")
    .exists()
    .withMessage("need a store_id")
    .isInt()
    .withMessage("must be integer"),
  body("products").custom(checkIntArray),
  finalCheck,
  receiveWarranty
);

router.post(
  "/customer/search",
  body("phoneNum")
    .exists()
    .withMessage("need a phone number")
    .custom(checkSpecialCharacters),
  finalCheck,
  getCustomer
);

router.post(
  "/customer/new",
  body("email").isEmail().withMessage("must be an email"),
  body("name")
    .exists()
    .withMessage("need a name")
    .custom(checkSpecialCharacters),
  body("product_id")
    .exists()
    .withMessage("need a product_id")
    .isInt()
    .withMessage("must be integer"),
  body("phone")
    .exists()
    .withMessage("need a phone number")
    .custom(checkSpecialCharacters),
  finalCheck,
  addCustomer
);

router.post(
  "/sell",
  body("store_id")
    .exists()
    .withMessage("need a store_id")
    .isInt()
    .withMessage("must be integer"),
  body("customer_id")
    .exists()
    .withMessage("need a customer_id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  sell
);

router.get("/analize/status/:manager_id", analizeProducts);

router.post(
  "/request/new",
  body("factory_id")
    .exists()
    .withMessage("need a factory_id")
    .isInt()
    .withMessage("must be integer"),
  body("version_id")
    .exists()
    .withMessage("need a version_id")
    .isInt()
    .withMessage("must be integer"),
  body("model_id")
    .exists()
    .withMessage("need a model_id")
    .isInt()
    .withMessage("must be integer"),
  body("color_id")
    .exists()
    .withMessage("need a color_id")
    .isInt()
    .withMessage("must be integer"),
  body("amount")
    .exists()
    .withMessage("need a amount")
    .isInt()
    .withMessage("must be integer"),
  createRequest
);

router.delete(
  "/request/delete/:id",
  param("id")
    .exists()
    .withMessage("need a id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  deleteRequest
);

router.get(
  "/request/complete/:id/:store_id",
  param("id")
    .exists()
    .withMessage("need a id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  completeRequest
);

router.get('/customer/sendBack/:product_id/:store_id', sendBackToCustomer);

router.get('/customer/receive/:product_id/:store_id', receiveFromCustomer);

router.post('/customer/compensate/:product_id/:store_id/:customer_id', compensate)


module.exports = router;
