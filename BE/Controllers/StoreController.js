const {
  updateOneProduct,
  updateProducts,
} = require("../Services/Product");
const {
  addOneHistory,
  addHistory,
  productsByStatus,
} = require("../Services/History");
const { createCustomer, findCustomerByPhoneNum } = require("../Services/User");
const { makeRequests, destroy, complete } = require("../Services/Request");
const { addError } = require("../Services/Error");
const {addRelation} = require('../Services/Manager_Product');

var requestWarranty = async (req, res) => {
  try {
    const product = await updateOneProduct(
      { status_id: 6 },
      req.body.product_id
    );
    const history = await addOneHistory(
      req.body.product_id,
      6,
      "yêu cầu được bảo hành",
      req.body.store_id
    );
    const error = await addError(product.id, req.body.content);
    res.json({
      success: true,
      message: "request sent",
      data: { product, history, error },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from warrantyRequest",
    });
  }
};

var sendToWarranty = async (req, res) => {
  try {
    const products = await updateProducts(
      { status_id: 7 },
      { id: req.body.products }
    );
    const history = await addHistory(
      req.body.products,
      7,
      "vận chuyển đến nơi bảo hành",
      req.body.store_id
    );
    await addRelation(req.body.products, req.body.warranty_id);
    res.json({
      success: true,
      message: "request sent",
      data: { products, history },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from warrantyRequest",
    });
  }
};

var receiveWarranty = async (req, res) => {
  try {
    const products = await updateProducts(
      { status_id: 11 },
      { id: req.body.products }
    );
    const history = await addHistory(
      req.body.products,
      11,
      "sản phẩm đã được bảo hành và đưa về cửa hàng",
      req.body.store_id
    );
    res.json({
      success: true,
      message: "request sent",
      data: { products, history },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from warrantyReceive",
    });
  }
};

var getCustomer = async (req, res) => {
  try {
    const customer = await findCustomerByPhoneNum(req.body.phoneNum);
    //console.log(req.body.email);
    //await console.log(customer);
    if (!customer) {
      res.status(404).json({ success: false, message: "customer not found" });
    } else {
      res.json({ success: true, message: "customer found", data: customer });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from customer search",
    });
  }
};

var addCustomer = async (req, res) => {
  try {
    const customer = await createCustomer(
      req.body.name,
      req.body.place,
      req.body.phone,
      req.body.email
    );
    if (!customer) {
      res.json({ success: false, message: "this customer already exists" });
    } else {
      const product = await updateOneProduct(
        {
          customer_id: customer.id,
          isSold: 1,
          soldAt: new Date(),
          status_id: 5,
        },
        req.body.product_id
      );
      if (product) {
        res.json({ success: true, message: "customer added", data: customer });
      } else {
        res.json({
          success: false,
          message: "failed to update customer id to product",
        });
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: err, success: false, message: "error from add customer" });
  }
};

var sell = async (req, res) => {
  try {
    const product = await updateOneProduct(
      {
        customer_id: req.body.customer_id,
        status_id: 5,
        isSold: true,
        soldAt: new Date(),
      },
      req.body.product_id
    );
    const history = addOneHistory(
      req.body.product_id,
      5,
      "đã được bán",
      req.body.store_id
    );
    res.json({ success: true, message: "product sold", data: product });
  } catch (err) {
    res
      .status(500)
      .json({ error: err, success: false, message: "error from sell" });
  }
};

var analizeProducts = async (req, res) => {
  try {
    const data = await productsByStatus(req.params.manager_id);
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

var createRequest = async (req, res) => {
  try {
    const request = await makeRequests(req.body.requests);
    if (request) {
      res.json({ success: true, message: "request sent" });
    } else {
      res.json({ success: false, message: "error in make request controller" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from creating request",
    });
  }
};

var deleteRequest = async (req, res) => {
  try {
    const check = destroy(req.params.id);
    if (!check) {
      res.status(500).json({ success: false, message: "delete failed" });
    } else {
      res.json({ success: true, message: "request deleted" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from deleting request",
    });
  }
};

var completeRequest = async (req, res) => {
  try {
    const data = await complete(req.params.id);
    if (data) {
      await addRelation(data, req.params.store_id);
      await addHistory(data, 4, 'đã bàn giao cho cửa hàng', req.params.store_id);
      res.json({ success: true, message: "request accept" });
    } else {
      res.json({ success: false, message: "can not update, service error" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
      message: "error from completing request",
    });
  }
};

module.exports = {
  requestWarranty,
  sendToWarranty,
  receiveWarranty,
  getCustomer,
  sell,
  addCustomer,
  analizeProducts,
  createRequest,
  deleteRequest,
  completeRequest,
};
