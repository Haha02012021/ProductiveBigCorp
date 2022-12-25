const { getInfo, getAllVers } = require("../Services/Version");
const { info, getAll } = require("../Services/Model");
const { getProducts, allManagers, getRequests } = require("../Services/User");
const { allColors } = require("../Services/Color");
const { productInfo } = require("../Services/Product");
const { getDetail } = require("../Services/Request");

var getVersionInfo = async (req, res) => {
  try {
    const info = await getInfo(req.params.id);
    if (!info) {
      res.status(404).json({ success: false, message: "not found" });
    } else {
      res.json({ success: true, data: info });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from get version info",
      error: err,
    });
  }
};

var getProductInfo = async (req, res) => {
  try {
    const info = await productInfo(req.params.id);
    if (!info) {
      res.status(404).json({ success: false, message: "not found" });
    } else {
      res.json({ success: true, data: info, message: "get product info" });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "error from get product info",
      error: err,
    });
  }
};

var getModelInfo = async (req, res) => {
  try {
    const model = await info(req.params.id);
    if (!model) {
      res.status(404).json({ success: false, message: "not found" });
    } else {
      res.json({ success: true, data: model, message: "get info success" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from get model info",
      error: err,
    });
  }
};

var getAllProducts = async (req, res) => {
  try {
    const products = await getProducts(
      req.params.manager_id,
      req.body.condition
    );
    if (!products) {
      res.status(404).json({ success: false, message: "products not found" });
    } else {
      res.json({ success: true, data: products, message: "get all products" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from get all products",
      error: err,
    });
  }
};

var getAllVersions = async (req, res) => {
  try {
    const versions = await getAllVers();
    if (!versions) {
      res.status(404).json({ success: false, message: "not found" });
    } else {
      res.json({ success: true, data: versions, message: "get all versions" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from get all versions",
      error: err,
    });
  }
};

var getAllModels = async (req, res) => {
  try {
    const models = await getAll();
    if (!models) {
      res.status(404).json({ success: false, message: "not found" });
    } else {
      res.json({ success: true, data: models, message: "get all models" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from get all models",
      error: err,
    });
  }
};

var getAllColors = async (req, res) => {
  try {
    const colors = await allColors();
    //console.log(colors);
    if (!colors) {
      res.status(404).json({ success: false, message: "not found" });
    } else {
      res.json({ success: true, data: colors, message: "get all colors" });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from get all colors",
      error: err,
    });
  }
};

var getAllManagers = async (req, res) => {
  try {
    const data = await allManagers(req.query.role, req.query.page);
    if (!data) {
      res.status(404).json({ success: false, message: "not found" });
    } else {
      res.json({
        success: true,
        data: data,
        message: `get all managers with role ${req.query.role}`,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from get all managers",
      error: err,
    });
  }
};

var getRequestInfo = async (req, res) => {
  try {
    const request = await getDetail(req.params.id);
    res.json({
      success: true,
      data: request,
      message: "get request info success",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from get request info",
    });
  }
};

var getAllRequests = async (req, res) => {
  try {
    console.log(req.body);
    const requests = await getRequests(
      req.params.manager_id,
      req.body.condition,
      req.body.role
    );
    if (requests) {
      res.json({
        success: true,
        data: requests,
        message: "get all request success",
      });
    } else {
      res.json({ success: false, message: "requests not found" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from get all requests",
    });
  }
};

module.exports = {
  getVersionInfo,
  getModelInfo,
  getAllProducts,
  getAllModels,
  getAllVersions,
  getAllColors,
  getProductInfo,
  getAllManagers,
  getRequestInfo,
  getAllRequests,
};
