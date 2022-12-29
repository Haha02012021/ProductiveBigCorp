var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var { body, query, validationResult } = require("express-validator");

const {
  addManager,
  createModel,
  createVersion,
  getAllProducts,
  deleteModel,
  deleteVersion,
  editVersion,
  allSoldOrError,
} = require("../Controllers/CoporationController");

const { validateCoporation } = require("../Middlewares/roleValidator");
const { finalCheck } = require("../Validators/checkErrors");
const { checkIntArray } = require("../Validators/arrayValidator");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //files khi upload xong sẽ nằm trong thư mục "uploads" này - các bạn có thể tự định nghĩa thư mục này
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    // tạo tên file = thời gian hiện tại nối với số ngẫu nhiên => tên file chắc chắn không bị trùng
    const filename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, filename + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addManager",
  validateCoporation,
  body("name")
    .exists()
    .withMessage("need a name")
    .isString()
    .withMessage("need to be string")
    .isLength({ max: 16 })
    .withMessage("max length is 16"),
  body("account")
    .exists()
    .withMessage("need an account")
    .isString()
    .withMessage("need to be string")
    .isLength({ max: 16 })
    .withMessage("max length is 16"),
  body("password")
    .exists()
    .withMessage("need a password")
    .isString()
    .withMessage("need to be string")
    .isLength({ max: 16 })
    .withMessage("max length is 16"),
  body("place")
    .exists()
    .withMessage("need a place")
    .isString()
    .withMessage("need to be string"),
  body("role")
    .exists()
    .withMessage("need a role")
    .isIn([2, 3, 4])
    .withMessage("need a role, must be in 4 role"),
  finalCheck,
  addManager
);

router.post(
  "/newModel",
  validateCoporation,
  upload.fields([{ name: "colors" }, { name: "images" }]),
  //body('name').exists().withMessage('need a name').isString('must be a string'),
  //body('color_id').isArray().withMessage('must be an array').custom(checkIntArray),
  //body('images').optional({checkFalsy: null}).isArray().withMessage('must be an array'),
  //body('colors').isArray().withMessage('must be an array'),
  //finalCheck,
  createModel
);

router.put("/version/edit/:id", validateCoporation, editVersion);

router.post(
  "/model/edit",
  validateCoporation,
  upload.fields([{ name: "colors" }, { name: "images" }])
);

router.post("/newVersion", validateCoporation, createVersion);

router.post(
  "/products/all",
  validateCoporation,
  body("condition")
    .optional({ checkFalsy: null })
    .isObject()
    .withMessage("must be object"),
  body("managers")
    .optional({ checkFalsy: null })
    .isArray()
    .withMessage("must be array")
    .custom(checkIntArray),
  finalCheck,
  getAllProducts
);

router.delete("/model/:id", validateCoporation, deleteModel);

router.delete("/version/:id", validateCoporation, deleteVersion);

router.get('/analize/', allSoldOrError);

module.exports = router;
