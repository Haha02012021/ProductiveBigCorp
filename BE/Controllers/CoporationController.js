const { createManager } = require("../Services/User");
const { addModel, remove } = require("../Services/Model");
const { addVersion, removeVersion, editVer } = require("../Services/Version");
const { allProducts } = require("../Services/Product");

var addManager = async (req, res) => {
  try {
    const manager = await createManager(
      req.body.name,
      req.body.place,
      req.body.account,
      req.body.password,
      req.body.role
    );
    res.json({ success: true, message: "manager added", data: manager });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "error from addManager", error: err });
  }
};

var createModel = async (req, res) => {
  try {
    console.log(req.body);
    // res.send(req.files);
    const images = req.files.images.map((element) => {
      return element.filename;
    });
    const color_images = req.files.colors.map((element) => {
      return element.filename;
    });
    console.log(images, color_images);
    const newModel = await addModel(
      req.body.name,
      req.body.color_id,
      color_images,
      images
    );
    res.json({ success: true, data: newModel });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "error from newModel", error: err });
  }
};

var createVersion = async (req, res) => {
  try {
    const newVer = await addVersion(req.body);
    res.json({ success: true, message: "new version added", data: newVer });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "error from newModel", error: err });
  }
};

var getAllProducts = async (req, res) => {
  try {
    const products = await allProducts(
      req.body.condition,
      req.body.managers,
      req.body.page
    );
    if (!products) {
      res.status(404).json({ success: false, message: "not found" });
    } else {
      res.json({
        success: true,
        data: products,
        message: "get all products of all managers",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from get all products of all managers",
      error: err,
    });
  }
};

var deleteModel = async (req, res) => {
  try {
    const check = await remove(req.params.id);
    if (!check) {
      res.json({ success: false, message: "failed to delete" });
    } else {
      res.json({ success: true, message: "model deleted" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "error from delete model", error: err });
  }
};

var deleteVersion = async (req, res) => {
  try {
    const check = await removeVersion(req.params.id);
    if (!check) {
      res.json({ success: false, message: "failed to delete" });
    } else {
      res.json({ success: true, message: "version deleted" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from delete version",
      error: err,
    });
  }
};

const editVersion = async (req, res) => {
  try {
    const check = await editVer(req.params.id, req.body.updateInfo);
    if (check) {
      res.json({ success: true, message: "version edited" });
    } else {
      res.json({
        success: false,
        message: "failed to edit, check if version not found",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "error from edit version", error: err });
  }
};

module.exports = {
  addManager,
  createModel,
  createVersion,
  getAllProducts,
  deleteModel,
  deleteVersion,
  editVersion,
};
