const {db, Manager, Customer} = require('../models');

var findByAccount = async (req, res) => {
    try {
        const manager = await Manager.findOne({where: {account: req.body.account}});
        if(manager) {
          return manager;
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
      }
}

var createManager = async (name, place, account, password, role) => {
  try {
      const manager = await Manager.create({
          name: name,
          place: place,
          account: account,
          password: password,
          role: role,
      })
      return manager;
    } catch (err) {
        console.log(err);
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
  }
}

var createCustomer = async (name, place, phone, email) => {
  try {
    const customer = await Customer.create({
      name, place, phone, email
    })
    return customer;
  } catch (err) {
    console.log(err);
  }
}

var getProducts = async (id) => {
  try {
    const products = await Manager.findByPk(id, {include: ['products']});
    return products
  } catch (err) {
    console.log(err);
  }
}

var updateManagerInfo = async (id, updateInfo) => {
  try {
    const manager = await Manager.findByPk(id);
    manager.update(updateInfo);
    return manager;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  findByAccount,
  createManager,
  createCustomer,
  findCustomerByPhoneNum,
  getProducts,
  updateManagerInfo
}