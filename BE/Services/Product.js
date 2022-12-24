const {
  db,
  Product,
  MODEL,
  Version,
  Batch,
  Color,
  Status,
  History,
  Image,
  Manager,
} = require("../models");

var addProducts = async (amount, color_id, model_id, version_id, batch_id) => {
  try {
    const products = await Product.bulkCreate(
      Array(amount).fill({
        color_id: color_id,
        model_id: model_id,
        version_id: version_id,
        batch_id: batch_id,
        status_id: 1,
      })
    );
    return products;
  } catch (err) {
    console.log(err);
  }
};

var updateProducts = async (updateInfo, condition) => {
  try {
    const product = await Product.update(updateInfo, { where: condition });
    return product;
  } catch (err) {
    console.log(err);
  }
};

var updateOneProduct = async (updateInfo, id) => {
  try {
    const product = await Product.findByPk(id);
    await product.update(updateInfo);
    console.log(product);
    return product;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var productInfo = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: MODEL,
          as: "model",
          attributes: ["id", "name"],
          include: [
            {
              model: Color,
              as: "colors",
              through: {
                attributes: ["image"],
              },
              attributes: ["id", "name", "code"],
            },
            {
              model: Image,
              as: "images",
              attributes: ["id", "link"],
            },
          ],
        },
        {
          model: Version,
          as: "version",
          attributes: ["id", "name"],
          include: [
            "chassis",
            "engine",
            "exterior",
            "interior",
            "i_activesense",
            "safety",
            "size",
          ],
        },
        {
          model: Color,
          as: "color",
          attributes: ["id", "name", "code"],
        },
        {
          model: Status,
          as: "status",
          attributes: ["id", "context"],
        },
        {
          model: Manager,
          as: "managers",
          through: {
            attributes: [],
          },
          attributes: ["id", "name"],
          where: { role: 2 },
        },
        "batch",
        "request",
        "customer",
        "hasStatuses",
      ],
    });
    return product;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var getCustomerInfo = async (id) => {
  try {
    const product = await Product.findByPk(id, { include: ["customer"] });
    return product;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var allProducts = async (condition) => {
  try {
    const products = await Product.findAll({
      where: condition,
      include: [
        {
          model: MODEL,
          as: "model",
          attributes: ["id", "name"],
        },
        {
          model: Version,
          as: "version",
          attributes: ["id", "name"],
        },
        {
          model: Color,
          as: "color",
          attributes: ["id", "name", "code"],
        },
        {
          model: Status,
          as: "status",
          attributes: ["id", "context"],
        },
        {
          model: Manager,
          as: "managers",
          through: {
            attributes: [],
          },
          where: {
            role: [2, 3, 4],
          },
          attributes: ["id", "name"],
        },
      ],
    });
    return products;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  addProducts,
  updateProducts,
  updateOneProduct,
  productInfo,
  getCustomerInfo,
  allProducts,
};
