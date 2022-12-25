var {db, Product, Error} = require('../models');

var addError = async (product_id, content) => {
    try{
        const error = await Error.create({
            product_id,
            content,
        });
        if(error) {
            return error;
        } else {
            throw "create error broken"
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    addError,
}