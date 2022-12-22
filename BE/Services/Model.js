const {db, MODEL, Model_Color, Color, sequelize} = require('../models');
const {QueryTypes} = require('sequelize');

var addModel = async (name, colors) => {
    try {
        const oldModel = await sequelize.query(
            'SELECT * FROM models WHERE BINARY name = $1 limit 1',
            {
              bind: [name],
              type: QueryTypes.SELECT
            }
        );
        console.log(oldModel);
        if(oldModel) {
            throw 'Already existed'
        } else {
            const newModel = await MODEL.create({
                name: name
            })
            await Model_Color.bulkCreate(colors.map(element => {
                return {
                    model_id: newModel.id,
                    color_id: element,
                }
            }))
            return newModel
        }
      } catch (err) {
          console.log(err);
          return null
      }
}

var info = async (id) => {
    try {
        const model = await MODEL.findByPk(id, {include: [{
            model: Color,
            as: 'colors',
            through: {
                attributes: [],
            },
        }, 'versions']});
        return model;
    } catch (err) {
        console.log(err);
        return null;
    }
}

var getAll = async () => {
    try {
        const models = await MODEL.findAll({
            include: [{
                model: Color,
                as: 'colors',
                through: {
                    attributes: []
                },
                attributes: ['id', 'name', 'code']
            }]
        });
        return models;
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    addModel,
    info,
    getAll,
}