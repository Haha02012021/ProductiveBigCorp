const { request } = require("express");
var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const {
  receiveRequest,
  finishWaranty,
  sendBack,
  sendBackToFactory,
} = require("../Controllers/WarrantyController");
const { route } = require("./factory");

const { validateWarranty } = require("../Middlewares/roleValidator");
const { body } = require("express-validator");
const { checkIntArray } = require("../Validators/arrayValidator");
const { finalCheck } = require("../Validators/checkErrors");
const { brokenOrDone } = require("../Validators/warrantyValidator");

router.post(
  "/maintain",
  validateWarranty,
  body("products")
    .isArray()
    .withMessage("must be an array")
    .custom(checkIntArray),
  finalCheck,
  receiveRequest
);

router.post(
  "/doneWarranty",
  validateWarranty,
  body("product_id")
    .exists()
    .withMessage("need a product_id")
    .isInt()
    .withMessage("must be integer"),
  //body('warranty_id').exists().withMessage('need a warranty_id').isInt().withMessage('must be integer'),
  body("error").optional({ checkFalsy: null }).custom(brokenOrDone),
  body("done")
    .optional({ checkFalsy: null })
    .isBoolean()
    .withMessage("must be true or false"),
  finalCheck,
  finishWaranty
);

router.post(
  "/sendBack",
  validateWarranty,
  body("products")
    .isArray()
    .withMessage("must be an array")
    .custom(checkIntArray),
  finalCheck,
  sendBack
);

router.post(
  "/sendBackToFactory",
  validateWarranty,
  body("products")
    .isArray()
    .withMessage("must be an array")
    .custom(checkIntArray),
  finalCheck,
  sendBackToFactory
);

module.exports = router;
