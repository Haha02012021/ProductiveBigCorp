const { db, Color } = require("../models");

var allColors = async () => {
  try {
    const colors = await Color.findAll({ attributes: ["id", "name", "code"] });
    return colors;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  allColors,
};
