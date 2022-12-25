const {
    db,
    Product,
    MODEL,
    Version,
    Color,
    Status,
    Manager,
    Request,
  } = require("../models");

  var getDetail = async (id) => {
    const detail = await Request.findByPk(id, {
        include: ['factory', 'store', 'model', 'version', 'color'],
    })
    return detail;
  }

  var makeRequest = async (store_id, factory_id, version_id, model_id, color_id, amount) => {
    try {
      const newRequest = await Request.create({
        store_id,
        factory_id,
        version_id,
        model_id,
        color_id,
        amount,
      });
      if(!newRequest) {
        throw "error in creating new request";
      } else {
        return newRequest;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  module.exports = {
    getDetail,
    makeRequest,
  }