const {
  db,
  Manager,
  Customer,
  sequelize,
  Product,
  MODEL,
  Version,
  Color,
  Status,
  Request,
  Error,
  Manager_Product,
} = require("../models");
const { QueryTypes, Op } = require("sequelize");

var findByAccount = async (account) => {
  try {
    const manager = await sequelize.query(
      "SELECT * FROM managers WHERE BINARY account = $1 limit 1",
      {
        bind: [account],
        type: QueryTypes.SELECT,
      }
    );
    if (manager.length !== 0) {
      return manager[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

var createManager = async (name, place, account, password, role) => {
  try {
    const checkManager = await sequelize.query(
      "SELECT * FROM managers WHERE BINARY account = $1 limit 1",
      {
        bind: [account],
        type: QueryTypes.SELECT,
      }
    );
    if (checkManager.length !== 0) {
      throw "Account has already been taken";
    }
    const manager = await Manager.create({
      name,
      place,
      account,
      password,
      role,
    });
    return manager;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var findCustomerByPhoneNum = async (phoneNum) => {
  try {
    const customer = await Customer.findAll({
      where: {
        phone: {
          [Op.like]: `%${phoneNum}%`,
        },
      },
    });
    if (customer) {
      return customer;
    } else {
      throw "this user not found, error in service";
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

var findCustomerByEmail = async (email) => {
  try {
    //console.log(email);
    const customer = await sequelize.query(
      "SELECT * FROM customers WHERE BINARY email = $1",
      {
        bind: [email],
        type: QueryTypes.SELECT,
      }
    );
    if (customer.length !== 0) {
      console.log(customer[0]);
      return customer[0];
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

var createCustomer = async (name, place, phone, email) => {
  try {
    const customer = await sequelize.query(
      "SELECT * FROM customers WHERE BINARY email = $1 or phone = $2 limit 1",
      {
        bind: [email, phone],
        type: QueryTypes.SELECT,
      }
    );
    if (customer.length !== 0) {
      throw "Customer already existed";
    } else {
      const customer = await Customer.create({
        name,
        place,
        phone,
        email,
      });
      return customer;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

var getProducts = async (id, condition, page) => {
  try {
    const limit = 5;
    const offset = 0 + (page - 1) * limit;
    let count = await Manager_Product.findAll({ where: {manager_id: id}, attributes: [[sequelize.fn('DISTINCT', sequelize.col('product_id')), 'product_id']] });
    console.log(count.length, condition);

    count = count.length % limit === 0 ? count.length / limit : parseInt(count.length / limit) + 1;

    let products = await Manager.findByPk(id, {
      include: [
        {
          model: Product,
          as: "products",
          through: {
            attributes: [],
          },
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
              model: Status,
              as: "status",
              attributes: ["id", "context"],
            },
            {
              model: Error,
              as: "errors",
              attributes: ["content", "updatedAt"],
              order: [["createdAt", "ASC"]],
              limit:
                condition.status_id && [6, 7, 8, 9, 10, 11].includes(condition.status_id)
                  ? 1
                  : 0,
            },
          ],
          where: condition,
          order: [["updatedAt", "desc"]],
        },
      ],
    });
    products = products.get({plain: true}).products.slice(offset, offset + limit);
    return { products: products, totalPages: count, currentPage: parseInt(page) };
  } catch (err) {
    console.log(err);
    return null;
  }
};

var getRequests = async (id, condition, role) => {
  try {
    const requests = await Manager.findByPk(id, {
      include: [
        {
          required: false,
          model: Request,
          as: role === 4 ? "sentRequests" : "receivedRequests",
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
              model: Manager,
              as: "factory",
              attributes: ["id", "name"],
            },
            {
              model: Manager,
              as: "store",
              attributes: ["id", "name"],
            },
          ],
          where: condition,
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    if (!requests) {
      throw "controller error, can not get requests";
    } else {
      return requests;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

var updateCustomer = async (updateInfo, id) => {
  try {
    const customer = Customer.findByPk(id);
    await customer.update(updateInfo);
    return customer;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var updateManagerInfo = async (id, updateInfo) => {
  try {
    const manager = await Manager.findByPk(id);
    manager.update(updateInfo);
    return manager;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var allManagers = async (role, page) => {
  try {
    if (page) {
      if (!role) {
        throw "role not defined";
      } else {
        const limit = 5;
        const offset = 0 + (page - 1) * limit;
        let count = await Manager.count({ where: { role } });
        count = count % limit === 0 ? count / limit : parseInt(count / limit) + 1;
        const managers = await Manager.findAll({
          where: { role },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          order: [["createdAt", "desc"]],
          offset: offset,
          limit: limit,
        });
        return { managers, totalPages: count, currentPage: parseInt(page) };
      }
    } else {
      if (!role) {
        throw "role not defined";
      } else {
        const managers = await Manager.findAll({
          where: { role },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          order: [["createdAt", "desc"]],
        });
        return managers;
      }
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  findByAccount,
  createManager,
  createCustomer,
  findCustomerByPhoneNum,
  getProducts,
  updateManagerInfo,
  findCustomerByEmail,
  updateCustomer,
  allManagers,
  getRequests,
};
