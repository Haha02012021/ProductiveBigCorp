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

var deleteOneRelation = async (product_id, manager_id) => {
    try {
        const relation = await Manager_Product.findOne({where: {
            manager_id,
            product_id
        }});
        if(!relation) {
            throw "relation not found"
        } else {
            await relation.destroy();
            return true;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    addRelation,
    addOneRelation,
    deleteOneRelation,
}