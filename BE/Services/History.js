const {db, History} = require('../models');

var addHistory = async (products, status_id) => {
    try {
        const history = await History.bulkCreate(
            products.map(element => {
                return {
                    product_id: element,
                    status_id: status_id,
                }
            })
        );
        return history;
    } catch (err) {
        console.log(err);
    }
}

var addOneHistory = async (product_id, status_id) => {
    try {
        const history = await History.create(
            {
                product_id,
                status_id
            }
        );
        return history;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addHistory,
    addOneHistory,
}