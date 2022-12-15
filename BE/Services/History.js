const {db, History} = require('../models');

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

module.exports = {
    addHistory,
    addOneHistory,
    getHistoryOfProduct
}