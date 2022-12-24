const {db, Manager, Customer, sequelize, Product, MODEL, Version, Color} = require('../models');
const {QueryTypes} = require('sequelize');

var findByAccount = async (account) => {
    try {
        const manager = await sequelize.query(
          'SELECT * FROM managers WHERE BINARY account = $1 limit 1',
          {
            bind: [account],
            type: QueryTypes.SELECT
          }
        );
        if(manager.length !== 0) {
          return manager[0];
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
}

var createManager = async (name, place, account, password, role) => {
  try {
    const checkManager = await sequelize.query(
      'SELECT * FROM managers WHERE BINARY account = $1 limit 1',
      {
        bind: [account],
        type: QueryTypes.SELECT
      }
    );
    if(checkManager.length !== 0) {
      throw 'Account has already been taken';
    }
    const manager = await Manager.create({
        name,
        place,
        account,
        password,
        role,
    })
    return manager;
    } catch (err) {
        console.log(err);
        return null;
    }
}

var findCustomerByPhoneNum = async (phoneNum) => {
  try {
    const customer = await Customer.findOne({where: {phone: phoneNum}});
    if(customer) {
      return customer
    } else {
      return null
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

var findCustomerByEmail = async (email) => {
  try {
    //console.log(email);
    const customer = await sequelize.query(
      'SELECT * FROM customers WHERE BINARY email = $1',
      {
        bind: [email],
        type: QueryTypes.SELECT
      }
    );
    if(customer.length !== 0) {
      console.log(customer[0]);
      return customer[0];
    } else {
      return null
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

var createCustomer = async (name, place, phone, email) => {
  try {
    const customer = await sequelize.query(
      'SELECT * FROM customers WHERE BINARY email = $1 or phone = $2 limit 1',
      {
        bind: [email, phone],
        type: QueryTypes.SELECT
      }
    );
    if(customer.length !== 0) {
      throw "Customer already existed";
    } else {
      const customer = await Customer.create({
        name, place, phone, email
      })
      return customer;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

var getProducts = async (id, condition) => {
  try {
    console.log(condition);
    const products = await Manager.findByPk(id, {
      include: [{
        model: Product,
        as: 'products',
        through: {
          attributes: [],
        },
        include: [
          {
            model: MODEL,
            as: 'model',
            attributes: ['id', 'name']
          },
          {
            model: Version,
            as: 'version',
            attributes: ['id', 'name', 'price'],
          },
          {
            model: Color,
            as: 'color',
            attributes: ['id', 'name', 'code'],
          },
          {
            model: Manager,
            as: "managers",
            through: {
              attributes: [],
            },
            where: {
              role: [2],
            },
            attributes: ["id", "name"],
          },
        ],
        where: condition,
      },
    ],
    });
    return products
  } catch (err) {
    console.log(err);
    return null;
  }
}

var updateCustomer = async (updateInfo, id) => {
  try {
    const customer = Customer.findByPk(id);
    await customer.update(updateInfo);
    return customer;
  } catch (err) {
    console.log(err);
    return null;
  }
}

var updateManagerInfo = async (id, updateInfo) => {
  try {
    const manager = await Manager.findByPk(id);
    manager.update(updateInfo);
    return manager;
  } catch (err) {
    console.log(err);
    return null;
  }
}

var allManagers = async (role, page) => {
  try {
    if(!page || !role) {
      throw "params not defined"
    } else {
      const limit = 5;
      const offset = 0 + (page - 1) * limit;
      let count = await Manager.count({where: {role}});
      count = count % limit === 0 ? count / limit : parseInt(count / limit) + 1;
      const managers = await Manager.findAll({
        where: {role},
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["createdAt", "desc"]],
        offset: offset,
        limit: limit,
      })
      return {managers, totalPages: count, currentPage: parseInt(page)};
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

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
}