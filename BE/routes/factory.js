var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var { body, param, validationResult } = require("express-validator");

const {
  createProducts,
  getBatches,
  receiveBrokenProducts,
  acceptRequest,
  requestSummon,
  destroyProducts,
} = require("../Controllers/FactoryController");

const { validateFactory } = require("../Middlewares/roleValidator");
const { refuseRequest } = require("../Controllers/FactoryController");
const { finalCheck } = require("../Validators/checkErrors");
const { checkIntArray } = require("../Validators/arrayValidator");

router.post(
  "/newProducts",
  validateFactory,
  body("factory_id")
    .exists()
    .withMessage("need factory_id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  createProducts
);

router.post("/batches/:factory_id", validateFactory, getBatches);

router.post(
  "/receiveBrokenProducts",
  validateFactory,
  body("products")
    .isArray()
    .withMessage("must be an array")
    .custom(checkIntArray),
  finalCheck,
  receiveBrokenProducts
);

router.post(
  "/request/refuse/:id",
  validateFactory,
  param("id")
    .exists()
    .withMessage("need an id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  refuseRequest
);

router.get(
  "/request/accept/:id/:factory_id",
  validateFactory,
  param("id")
    .exists()
    .withMessage("need an id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  acceptRequest
);

router.post(
  "/products/summon/:batch_id/:factory_id",
  validateFactory,
  param("batch_id")
    .exists()
    .withMessage("need a id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  requestSummon
);

router.post("/products/delete/:factory_id", destroyProducts);

module.exports = router;
