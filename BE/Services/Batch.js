const { Op } = require('sequelize');
const {db, Batch, MODEL, Version, Color, Product} = require('../models');

const addBatch = async (factory_id, color_id, model_id, version_id, amount) => {
    try {
        const batch = await Batch.create({
            factory_id: factory_id,
            color_id: color_id,
            model_id: model_id,
            version_id: version_id,
            amount: amount
        });
        return batch;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const findByFactoryId = async (factory_id, condition) => {
    try{
        if(condition) {
            condition.factory_id = factory_id;
        }
        const batches = await Batch.findAll({
          where: condition ? condition : {factory_id},
          include: [
            {
                model: MODEL,
                as: 'model',
                attributes: ['id', 'name', 'deletedAt'],
                paranoid: false
            },
            {
                model: Version,
                as: 'version',
                attributes: ['id', 'name', 'price', 'deletedAt'],
                paranoid: false,
            },
            {
                model: Color,
                as: 'color',
                attributes: ['id', 'code', 'name'],
            },
          ]
        })
        return batches;
    } catch (err) {
        console.log(err);
        return null;
    }
}

var getNonWarrantyProducts = async (id) => {
    try {
        let products = await Product.findAll({
            where: {
                status_id : [3, 4, 5, 11, 17, 19],
                batch_id: id
            },
            attributes: ['id'],
        });
        //console.log(products);
        if(!products) {
            throw 'no products fit the demand'
        } else {
            products =  products.map(element => {return element.id});
            console.log(products);
            return products;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

var updateOneBatch = async (updateInfo, id) => {
    try {
        const batch = await Batch.findByPk(id);
        Object.keys(updateInfo).forEach((element) => {
            if (updateInfo[element] === batch[element]) {
              throw "can not update the same value";
            }
        });
        if(!batch) {
            throw "batch not found"
        } else {
            batch.update(updateInfo);
            return batch
        }
    } catch (err) {
        console.log(err);
        return null;
    } 
} 

module.exports = {
    addBatch,
    findByFactoryId,
    getNonWarrantyProducts,
    updateOneBatch,
}