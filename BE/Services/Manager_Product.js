const {db, Manager_Product} = require('../models');

var addRelation = async (products, manager_id) => {
    try {
        await Manager_Product.bulkCreate(
            products.map(element => {
                return {
                    product_id: element,
                    manager_id: manager_id,
                }
            })
        );
    } catch (err) {
        console.log(err);
        return null;
    }
}

var addOneRelation = async (product_id, manager_id) => {
    try {
        await Manager_Product.create(
            {
                product_id: product_id,
                manager_id: manager_id,
            }
            
        );
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    addRelation,
    addOneRelation,
}