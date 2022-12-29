const {
  addBatch,
  findByFactoryId,
  getNonWarrantyProducts,
  updateOneBatch,
} = require("../Services/Batch");
const { addProducts, updateProducts } = require("../Services/Product");
const { addHistory } = require("../Services/History");
const { addRelation } = require("../Services/Manager_Product");
const { refuse, accept } = require("../Services/Request");
const { addErrorForMany } = require("../Services/Error");
var createProducts = async (req, res) => {
  try {
    const batch = await addBatch(
      req.body.factory_id,
      req.body.color_id,
      req.body.model_id,
      req.body.version_id,
      req.body.amount
    );

    const products = await addProducts(
      req.body.amount,
      req.body.color_id,
      req.body.model_id,
      req.body.version_id,
      batch.id
    );

    const productsId = products.map((element) => {
      return element.id;
    });

    const history = await addHistory(
      productsId,
      1,
      "đã được sản xuất",
      req.body.factory_id
    );

    await addRelation(productsId, req.body.factory_id);

    res.json({ success: true, message: "products sent to stock" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from add newProducts",
      error: err,
    });
  }
};

var receiveBrokenProducts = async (req, res) => {
  try {
    console.log(req.body);
    const products = await updateProducts(
      { status_id: 14 },
      { id: req.body.products }
    );
    const history = await addHistory(
      req.body.products,
      14,
      "trở lại nhà máy",
      req.body.factory_id
    );
    res.json({ success: true, message: "returned to factory", data: history });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error from receive broken products",
      error: err,
    });
  }
};

var getBatches = async (req, res) => {
  try {
    const batches = await findByFactoryId(
      req.params.factory_id,
      req.body.condition,
      req.body.page
    );
    res.json({ success: true, data: batches });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "error from get batches", error: err });
  }
};

var refuseRequest = async (req, res) => {
  try {
    const check = await refuse(req.params.id, req.body.canceledReason);
    if (!check) {
      res.status(500).json({ success: false, message: "refuse failed" });
    } else {
      res.json({ success: true, message: "request refused" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from deleting request",
    });
  }
};

var acceptRequest = async (req, res) => {
  try {
    const data = await accept(req.params.id, req.params.factory_id);
    if (data) {
      //console.log(data);
      if (data.err) {
        res.status(500).json({ success: false, message: data.err });
      } else {
        await addHistory(
          data,
          3,
          "đang chuyển tới cửa hàng yêu cầu",
          req.params.factory_id
        );
        res.json({
          success: true,
          data: data,
          message: "request accepted, products has been marked",
        });
      }
    } else {
      res
        .status(500)
        .json({ success: false, message: "failed to accept request" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from accepting request",
    });
  }
};

var requestSummon = async (req, res) => {
  try {
    const products = await getNonWarrantyProducts(req.params.batch_id);
    if (!products) {
      res.status(404).json({ success: false, message: "products not found" });
    } else {
      const batch = await updateOneBatch(
        { isSummoned: 1, error: req.body.error },
        req.params.batch_id
      );
      const update = await updateProducts({ status_id: 16 }, { id: products });
      const history = await addHistory(
        products,
        16,
        "được yêu cầu triệu hồi từ nhà máy",
        req.params.factory_id
      );
      const errors = await addErrorForMany(products, req.body.error);
      if (update && history && batch) {
        res.json({ success: true, message: "summoned" });
      } else {
        res
          .status(500)
          .json({ success: false, message: "can not summon products" });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from summoning products",
    });
  }
};

var destroyProducts = async (req, res) => {
  try {
    const check = await updateProducts(
      { status_id: 15 },
      { id: req.body.products }
    );
    await addHistory(
      req.body.products,
      15,
      "đã bị tiêu hủy",
      req.params.factory_id
    );
    res.json({ success: true, message: "destroyed" });
  } catch (err) {
    res
      .status(500)
      .json({
        error: err,
        success: false,
        message: "error from destroying products",
      });
  }
};

module.exports = {
  createProducts,
  getBatches,
  receiveBrokenProducts,
  refuseRequest,
  acceptRequest,
  requestSummon,
  destroyProducts,
};
