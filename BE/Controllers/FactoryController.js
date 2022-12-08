const {addBatch, findByFactoryId} = require('../Services/Batch');
const {addProducts} = require('../Services/Product');
const {addHistory} = require('../Services/History');
const {addRelation} = require('../Services/Manager_Product');

var createProducts = async (req, res) => {
    try {
        const batch = await addBatch(
            req.body.factory_id,
            req.body.color_id,
            req.body.model_id,
            req.body.version_id,
            req.body.amount
        )
  
        const products = await addProducts(req.body.amount, req.body.color_id, req.body.model_id, req.body.version_id, batch.id)
  
        const productsId = products.map(element => {return element.id});

        const history = await addHistory(productsId, 1);

        await addRelation(productsId, req.body.factory_id);

        res.json({success: true, message: 'products sent to stock'})
    } catch (err) {
        res.status(500).json({success: false, message: 'error from add newProducts', error: err});
    }
}

var getBatches = async (req, res) => {
    try {
        const batches = await findByFactoryId(req.body.factory_id);
        res.json({success: true, data: batches});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get batches', error: err});
    }
}

module.exports = {
    createProducts,
    getBatches,
}