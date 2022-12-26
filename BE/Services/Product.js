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
  Error,
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
    Object.keys(updateInfo).forEach((element) => {
      if (updateInfo[element] === product[element]) {
        throw "can not update the same value";
      }
    });
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
          attributes: ["id", "name", "price"],
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
            attributes: ["manager_id", "product_id"],
          },
          attributes: ["id", "name"],
          where: { role: 2 },
        },
        "batch",
        "request",
        "customer",
        {
          model: History,
          as: "histories",
          include: [
            {
              model: Status,
              as: "status",
              attributes: ["id", "context"],
            },
          ],
          attributes: ["content", "createdAt"],
        },
      ],
    });
    console.log(product);
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

var allProducts = async (condition, managers) => {
  try {
    if (managers) {
      if (managers.factory_id) {
        condition.factory_id = managers.factory_id;
      }
      if (managers.warranty_id) {
        condition.warranty_id = managers.warranty_id;
      }
      if (managers.store_id) {
        condition.store_id = managers.store_id;
      }
    }
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
          attributes: ["id", "name", "price"],
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
          required: false,
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

var findByUuid = async (uuid) => {
  try {
    const product = await Product.findOne({ where: { uuid } });
    if (!product) {
      throw "product not found";
    } else {
      return product;
    }
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
  findByUuid,
};
