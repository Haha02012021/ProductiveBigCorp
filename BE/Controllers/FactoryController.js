const {addBatch, findByFactoryId} = require('../Services/Batch');
const {addProducts, updateProducts} = require('../Services/Product');
const {addHistory} = require('../Services/History');
const {addRelation} = require('../Services/Manager_Product');
const {refuse} = require('../Services/Request');
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

        const history = await addHistory(productsId, 1, 'đã được sản xuất', req.body.factory_id);

        await addRelation(productsId, req.body.factory_id);

        res.json({success: true, message: 'products sent to stock'})
    } catch (err) {
        res.status(500).json({success: false, message: 'error from add newProducts', error: err});
    }
}

var receiveBrokenProducts = async (req, res) => {
    try {
        console.log(req.body);
        const products = await updateProducts({status_id: 14}, {id: req.body.products});
        const history = await addHistory(req.body.products, 14, 'trở lại nhà máy', req.body.factory_id);
        res.json({success: true, message: 'returned to factory', data: history});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from receive broken products', error: err});
    }
}

var getBatches = async (req, res) => {
    try {
        const batches = await findByFactoryId(req.params.factory_id);
        res.json({success: true, data: batches});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get batches', error: err});
    }
}

var provide = async (req, res) => {
    try {
    } catch (err) {
        res.status(500).json({success: false, message: 'error from provide', error: err});
    }
}

var refuseRequest = async (req, res) => {
    try {
        const check = refuse(req.params.id);
        if(!check) {
            res.status(500).json({success: false, message: 'refuse failed'});
        } else {
            res.json({success: true, message: 'request refused'});
        }
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from deleting request'});
    }
}

module.exports = {
    createProducts,
    getBatches,
    receiveBrokenProducts,
    provide,
    refuseRequest,
}