const {db, Product, Manager} = require('../models');

var addProducts = async (amount, color_id, model_id, version_id, batch_id) => {
  try {
      const products = await Product.bulkCreate(Array(amount).fill({
        color_id: color_id,
        model_id: model_id,
        version_id: version_id,
        batch_id: batch_id,
        status_id: 1
       })     
     );
    return products;
  } catch (err) {
    console.log(err);
  }
}

var updateProducts = async (updateInfo, condition) => {
  try {
    const product = await Product.update(updateInfo, {where: condition});
    return product;
  } catch (err) {
    console.log(err);
  }
}

var updateOneProduct = async (updateInfo, id) => {
  try {
    const product = await Product.findByPk(id);
    await product.update(updateInfo);
    console.log(product);
    return product
  } catch (err) {
    console.log(err);
    return null;
  }
}

var getInfo = async (id) => {
  try {
    const product = await Product.findByPk(id, {include: ['model', 'version', 'status', 'color', 'batch', 'request', 'customer', 'hasStatuses']});
    return product;
  } catch (err) {
    console.log(err);
    return null;
  }
}

var getCustomerInfo = async (id) => {
  try {
    const product = await Product.findByPk(id, {include: ['customer']});
    return product;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  addProducts,
  updateProducts,
  updateOneProduct,
  getInfo,
  getCustomerInfo,
}