const {db, Batch} = require('../models');

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
    }
}

const findByFactoryId = async (factory_id) => {
    try{
        const batches = await Batch.findAll({
          where: {
            factory_id: factory_id
          }
        })
        return batches;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addBatch,
    findByFactoryId,
}