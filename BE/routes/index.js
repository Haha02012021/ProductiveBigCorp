var express = require("express");
var router = express.Router();

var {
  getVersionInfo,
  getModelInfo,
  getAllModels,
  getAllProducts,
  getAllVersions,
  getAllColors,
  getProductInfo,
  getAllManagers,
  getRequestInfo,
  getAllRequests,
  getAllStatuses,
  findOneProduct,
  analizeProducts
} = require("../Controllers/index");
var { param, query, body, validationResult } = require("express-validator");

const { authenToken } = require("../Middlewares/roleValidator");
const { finalCheck } = require("../Validators/checkErrors");

router.get("/version/:id", param('id').exists().withMessage('need an id').isInt().withMessage('must be integer'),
finalCheck,
getVersionInfo);

router.get("/model/:id", param('id').exists().withMessage('need an id').isInt().withMessage('must be integer'),
finalCheck,
getModelInfo);

router.post("/products/manager/:manager_id", getAllProducts);

router.get("/versions/all", getAllVersions);

router.get("/models/all", getAllModels);

router.get("/colors/all", getAllColors);

router.get("/product/detail/:id", param('id').exists().withMessage('need an id').isInt().withMessage('must be integer'),
finalCheck,
getProductInfo);

router.get(
  "/managers/all",
  query("role")
    .exists()
    .withMessage("need a role")
    .isIn([2, 3, 4])
    .withMessage("need a role, must be in 4 role"),
  query("page")
    .optional({ checkFalsy: null })
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  getAllManagers
);

router.get("/request/:id", param('id').exists().withMessage('need an id').isInt().withMessage('must be integer'),
finalCheck,
getRequestInfo);

router.post("/requests/all/:manager_id", body('condition').optional({checkFalsy: null}).isObject().withMessage('must be an object'),
finalCheck,
getAllRequests);

router.get("/statuses/all", getAllStatuses);

router.get('/product/:uuid', param('uuid').exists().withMessage('need a uuid').isUUID().withMessage('must be a uuid'),
finalCheck,
findOneProduct);

router.get("/analize/status/:manager_id", analizeProducts);

module.exports = router;
