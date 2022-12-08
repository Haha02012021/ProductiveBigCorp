const {db, MODEL, Model_Color} = require('../models');

var addModel = async (name, colors) => {
    try {
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
      } catch (err) {
          console.log(err);
      }
}

module.exports = {
    addModel,
}