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
  analizeProducts,
  getSoldOrErrorByModel,
  getSoldOrError,
} = require("../Controllers/index");
var { param, query, body, validationResult } = require("express-validator");

const { authenToken } = require("../Middlewares/roleValidator");
const { finalCheck } = require("../Validators/checkErrors");
const { route } = require("./coporation");

router.get(
  "/version/:id",
  authenToken,
  param("id")
    .exists()
    .withMessage("need an id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  getVersionInfo
);

router.get(
  "/model/:id",
  authenToken,
  param("id")
    .exists()
    .withMessage("need an id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  getModelInfo
);

router.post("/products/manager/:manager_id", authenToken, getAllProducts);

router.get("/versions/all", authenToken, getAllVersions);

router.get("/models/all", authenToken, getAllModels);

router.get("/colors/all", authenToken, getAllColors);

router.get(
  "/product/detail/:id",
  authenToken,
  param("id")
    .exists()
    .withMessage("need an id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  getProductInfo
);

router.get(
  "/managers/all",
  authenToken,
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

router.get(
  "/request/:id",
  authenToken,
  param("id")
    .exists()
    .withMessage("need an id")
    .isInt()
    .withMessage("must be integer"),
  finalCheck,
  getRequestInfo
);

router.post(
  "/requests/all/:manager_id",
  authenToken,
  body("condition")
    .optional({ checkFalsy: null })
    .isObject()
    .withMessage("must be an object"),
  finalCheck,
  getAllRequests
);

router.get("/statuses/all", authenToken, getAllStatuses);

router.get(
  "/product/:uuid",
  param("uuid")
    .exists()
    .withMessage("need a uuid")
    .isUUID()
    .withMessage("must be a uuid"),
  finalCheck,
  findOneProduct
);

router.get("/analize/status/:manager_id", authenToken, analizeProducts);

router.get("/analize/:manager_id", authenToken, getSoldOrError);

router.get("/analize/model/:manager_id", authenToken, getSoldOrErrorByModel);

module.exports = router;
