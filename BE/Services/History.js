const {db, History, sequelize} = require('../models');
const {QueryTypes} = require('sequelize');

var addHistory = async (products, status_id, content, manager_id) => {
    try {
        const history = await History.bulkCreate(
            products.map(element => {
                return {
                    product_id: element,
                    status_id,
                    content,
                    manager_id,
                }
            })
        );
        return history;
    } catch (err) {
        console.log(err);
        return null;
    }
}

var addOneHistory = async (product_id, status_id, content, manager_id) => {
    try {
        const history = await History.create(
            {
                product_id,
                status_id,
                content,
                manager_id,
            }
        );
        return history;
    } catch (err) {
        console.log(err);
        return null;
    }
}

var getHistoryOfProduct = async (product_id) => {
    try {
        const history = History.findAll({
            where: {product_id},
            include : [
                'manager',
            ]
        })
    } catch (err) {
        console.log(err);
        return null;
    }
}

var productsByStatus = async (manager_id) => {
    try {
        //const manager = await sequelize.query(
        //    `SELECT count(*), histories.createdAt, quarter(histories.createdAt), content, status_id 
        //    FROM histories inner join statuses on statuses.id = histories.status_id 
        //    WHERE manager_id = $1 group by year(histories.createdAt), quarter(histories.createdAt), status_id 
        //    order by year(histories.createdAt), quarter(histories.createdAt), status_id`,
        //    {
        //      bind: [manager_id],
        //      type: QueryTypes.SELECT,
        //      nest: true,
        //      raw: false,
        //    }
        //);
        const manager = await History.count({
            where: {
              manager_id,
            },
            group: [sequelize.fn("QUARTER", sequelize.col("createdAt")), 'status_id'],
            nest: true,
        })
        return manager;
    } catch (err) {
        console.log(err);
        return null;
    }
  }
  

module.exports = {
    addHistory,
    addOneHistory,
    getHistoryOfProduct,
    productsByStatus,
}