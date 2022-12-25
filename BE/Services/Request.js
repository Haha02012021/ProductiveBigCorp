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

  var makeRequests = async (requests) => {
    try {
      const newRequests = await Request.bulkCreate(requests);
      if(!newRequests) {
        throw "error in creating new request";
      } else {
        return newRequests;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  //var accepRequest = async (id) => {
  //  const request = await Request.findByPk(id);
  //  request.progress = 1;
  //  request.acceptedAt = new Date();
  //  request.save();

  //  const products = 
  //}

  var destroy = async (id) => {
    try {
      const request = await Request.findByPk(id);
      await request.destroy();
      return true
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  var refuse = async (id) => {
    try {
      const request = await Request.findByPk(id);
      request.progress = -1;
      await request.save();
      return true
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  module.exports = {
    getDetail,
    makeRequests,
    destroy,
    refuse,
  }