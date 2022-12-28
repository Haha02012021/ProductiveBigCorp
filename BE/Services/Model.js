const {
  db,
  MODEL,
  Model_Color,
  Color,
  sequelize,
  Image,
  Version,
} = require("../models");
const { QueryTypes, Model } = require("sequelize");
const fs = require('fs');

var addModel = async (name, colors, colorImages, images) => {
  try {
    const oldModel = await sequelize.query(
      "SELECT * FROM models WHERE BINARY name = $1 limit 1",
      {
        bind: ["name"],
        type: QueryTypes.SELECT,
      }
    );
    console.log(oldModel);
    if (oldModel.length !== 0) {
      throw "Already existed";
    } else {
      const newModel = await MODEL.create({
        name: name,
      });
      const relation = [];
      for (let i = 0; i< colorImages.length; i++) {
        realtion.push({model_id: newModel.id, color_id: colors[i], image: 'http://localhost:5000/' + colorImages[i], name: colorImages[i]});
      }
      await Model_Color.bulkCreate(
        relation
      );
      if(images) {
        await Image.bulkCreate(
          images.map(element => {
            return {
              link: 'http://localhost:5000/' + element,
              model_id: newModel.id,
              name: element
            }
          })
        )
      }
      return newModel;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

//var editModel = async (id, colorImages, deletedImages, newImages, name) => {
//  try {
//    const model = await Model.findByPk(id);
//    if(!model) {
//      throw "model not found";
//    }
//    if(name) {
//      model.update({name});
//    }//

//    const colors = await Model_Color.findAll({where: {model_id: id}});//

//    for(let i = 0; i < colors.length; i++) {
//      if(colors[i].image !== colorImages[i]) {
//        if(fs.existsSync('/images' + colors[i].name)) {
//          fs.unlinkSync('/images' + colors[i].name)
//        }
//        await colors[i].update({image: 'http://localhost:5000/' + colorImages[i].filename, name: colorImages.filename});
//      }
//    }//

//    await Image.destroy({where: {id: deletedImages}});
//    await Image.bulkCreate(
//      newImages.map(element => {
//        return {
//          model_id: id,
//          link: 'http://localhost:5000/' + element,
//          name: element,
//        }
//      })
//    )
//  } catch (err) {
//    console.log(err);
//    return null;
//  }
//}

var info = async (id) => {
  try {
    const model = await MODEL.findByPk(id, {
      include: [
        {
          model: Color,
          as: "colors",
          through: {
            attributes: ['image'],
          },
          attributes: ['id', 'name', 'code'],
        },
        {
          model: Version,
          as: "versions",
          attributes: ["id", "name", "price", "deletedAt"],
          paranoid: false,
        },
        {
          model: Image,
          as: "images",
          attributes: ["id", "link"],
          paranoid: false,
        },
      ],
      paranoid: false,
    });
    return model;
  } catch (err) {
    console.log(err);
    return null;
  }
};

var getAll = async (page) => {
  try {
    const limit = 5;
    const offset = 0 + (page - 1) * limit;
    let count = await MODEL.count();
    const models = await MODEL.findAll({
      include: [
        {
          model: Color,
          as: "colors",
          through: {
            attributes: [],
          },
          attributes: ["id", "name", "code"],
        },
      ],
      offset: offset,
      limit: count,
    });
    return { models: models, totalPages: count, currentPage: parseInt(page) };
  } catch (err) {
    console.log(err);
    return null;
  }
};

var remove = async (id) => {
  try {
    const model = await MODEL.findByPk(id);
    if (!model) {
      throw "model not found";
    } else {
      await model.destroy();
      return true;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  addModel,
  info,
  getAll,
  remove,
};
