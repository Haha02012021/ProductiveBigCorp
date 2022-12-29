const { getInfo, getAllVers } = require("../Services/Version");
const { info, getAll } = require("../Services/Model");
const { getProducts, allManagers, getRequests } = require("../Services/User");
const { allColors } = require("../Services/Color");
const { productInfo, findByUuid } = require("../Services/Product");
const { getDetail } = require("../Services/Request");
const { allStatuses } = require("../Services/Status");
const { productsByStatus, getSoldOrErrorInfo, getAllSoldOrErrorInfoOfManagerByModel } = require("../Services/History");

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
  console.log(req.body);
  try {
    const products = await getProducts(
      req.params.manager_id,
      req.body.condition,
      req.body.page
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
    const versions = await getAllVers(req.query.page);
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
    const models = await getAll(req.query.page);
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
      req.body.role,
      req.body.page
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

var getAllStatuses = async (req, res) => {
  try {
    const statuses = await allStatuses();
    if (!statuses) {
      res.json({ success: false, message: "error in statuses table" });
    } else {
      res.json({
        success: true,
        data: statuses,
        message: "get all statuses success",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from get all statuses",
    });
  }
};

var findOneProduct = async (req, res) => {
  try {
    const product = await findByUuid(req.params.uuid);
    if (product) {
      res.json({ success: true, data: product, message: "product found" });
    } else {
      res.status(404).json({ success: false, message: "product not found" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from find a product",
    });
  }
};

var analizeProducts = async (req, res) => {
  try {
    console.log(req.params.manager_id);
    const data = await productsByStatus(
      req.params.manager_id,
      req.query.option,
      req.query.year,
      req.query.secondYear,
      req.query.role
    );
    if (!data) {
      res.json({ success: false, message: "data not returned" });
    } else {
      res.json({ success: true, message: "analized", data });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from analize products",
    });
  }
};

var getSoldOrError = async (req, res) => {
  try {
    console.log(req.query, req.params);
    const data = await getSoldOrErrorInfo(
      req.params.manager_id,
      req.query.option,
      req.query.year,
      req.query.secondYear,
      req.query.type,
    );
    if (!data || data.length === 0) {
      throw "error in services or product not found";
    } else {
      res.json({ success: true, message: "analized", data });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from get Sold or error info",
    });
  }
};

var getSoldOrErrorByModel = async (req, res) => {
  try {
    console.log(req.query, req.params);
    const data = await getAllSoldOrErrorInfoOfManagerByModel(
      req.params.manager_id,
      req.query.type,
    );
    if (!data || data.length === 0) {
      throw "error in services or products not found";
    } else {
      res.json({ success: true, message: "analized", data });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from get Sold or error info",
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
  getAllStatuses,
  findOneProduct,
  analizeProducts,
  getSoldOrError,
  getSoldOrErrorByModel,
};
