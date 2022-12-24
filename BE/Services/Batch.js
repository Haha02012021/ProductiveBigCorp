const {db, Batch, MODEL, Version, Color} = require('../models');

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

const findByFactoryId = async (factory_id) => {
    try{
        const batches = await Batch.findAll({
          where: {
            factory_id: factory_id
          },
          include: [
            {
                model: MODEL,
                as: 'model',
                attributes: ['id', 'name'],
            },
            {
                model: Version,
                as: 'version',
                attributes: ['id', 'name', 'price'],
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

module.exports = {
    addBatch,
    findByFactoryId,
}