const { QueryTypes, Op } = require("sequelize");
const {
  db,
  Product,
  MODEL,
  Version,
  Batch,
  Manager_Product,
  Color,
  Status,
  History,
  Image,
  Manager,
  Error,
  sequelize,
  Chassis,
  Engine,
  Exterior,
  Interior,
  Iactivsense,
  Safety,
  Size,
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
    //console.log(products);
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
          attributes: ["id", "name", "deletedAt"],
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
              paranoid: false,
            },
          ],
          paranoid: false,
        },
        {
          model: Version,
          as: "version",
          attributes: ["id", "name", "price", "deletedAt"],
          include: [
            {
              model: Chassis,
              as: "chassis",
              paranoid: false,
            },
            {
              model: Engine,
              as: "engine",
              paranoid: false,
            },
            {
              model: Exterior,
              as: "exterior",
              paranoid: false,
            },
            {
              model: Interior,
              as: "interior",
              paranoid: false,
            },
            {
              model: Iactivsense,
              as: "i_activsense",
              paranoid: false,
            },
            {
              model: Safety,
              as: "safety",
              paranoid: false,
            },
            {
              model: Size,
              as: "size",
              paranoid: false,
            },
          ],
          paranoid: false,
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

var allProducts = async (condition, managers, page) => {
  try {
    //console.log(managers, condition, page);
    if (managers && managers.length > 0) {
      condition.id = await sequelize.query(
        `SELECT product_id FROM manager_product where manager_id in (${managers.toString()})
        group by product_id having count(manager_id) > $1 or count(manager_id) = $1`,
        {
          bind: [managers.length],
          type: QueryTypes.SELECT,
        }
      );
      console.log(condition.id);
      condition.id = condition.id.map((element) => {
        return element.product_id;
      });
    }
    console.log(condition);
    const limit = page ? 5 : null;
    const offset = page ? 0 + (page - 1) * limit : 0;
    let count = await Product.count({ where: condition });
    if (page) {
      count = count % limit === 0 ? count / limit : parseInt(count / limit) + 1;
    }
    const products = await Product.findAll({
      where: condition,
      include: [
        {
          model: MODEL,
          as: "model",
          attributes: ["id", "name", "deletedAt"],
          paranoid: false,
        },
        {
          model: Version,
          as: "version",
          attributes: ["id", "name", "price", "deletedAt"],
          paranoid: false,
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
          attributes: ["id", "name", "role"],
        },
      ],
      order: [["createdAt", "desc"]],
      offset: offset,
      limit: limit,
    });
    return {
      products: products,
      totalPages: count,
      currentPage: parseInt(page),
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

var findByUuid = async (uuid) => {
  try {
    const product = await Product.findOne({
      where: { uuid },
      include: [
        {
          model: MODEL,
          as: "model",
          attributes: ["id", "name", "deletedAt"],
          paranoid: false,
        },
        {
          model: Version,
          as: "version",
          attributes: ["id", "name", "price", "deletedAt"],
          paranoid: false,
        },
        {
          model: Color,
          as: "color",
          attributes: ["id", "name", "code"],
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
          attributes: ["id", "name", "role"],
        },
        {
          required: false,
          model: Error,
          as: "errors",
          attributes: ["content"],
        },
      ],
    });
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
