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
  createRequest,
  deleteRequest,
  completeRequest,
  sendBackToCustomer,
  receiveFromCustomer,
  compensate,
} = require("../Controllers/StoreController");

const { validateStore } = require("../Middlewares/roleValidator");
const { checkIntArray } = require("../Validators/arrayValidator");
const { finalCheck } = require("../Validators/checkErrors");
const { checkSpecialCharacters, checkPhone } = require("../Validators/stringValidator");

router.post(
  "/warrantyRequest",
  validateStore,
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
  validateStore,
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
  validateStore,
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
  validateStore,
  body("phoneNum")
    .exists()
    .withMessage("need a phone number")
    .custom(checkSpecialCharacters),
  finalCheck,
  getCustomer
);

router.post(
  "/customer/new",
  validateStore,
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
    .custom(checkSpecialCharacters).custom(checkPhone),
  finalCheck,
  addCustomer
);

router.post(
  "/sell",
  validateStore,
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

router.post(
  "/request/new",
  validateStore,
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
  validateStore,
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
  validateStore,
  param("id")
    .exists()
    .withMessage("need a id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  completeRequest
);

router.get(
  "/customer/sendBack/:product_id/:store_id",
  validateStore,
  sendBackToCustomer
);

router.get(
  "/customer/receive/:product_id/:store_id",
  validateStore,
  receiveFromCustomer
);

router.get(
  "/customer/compensate/:product_id/:store_id/:customer_id",
  validateStore,
  compensate
);

module.exports = router;
