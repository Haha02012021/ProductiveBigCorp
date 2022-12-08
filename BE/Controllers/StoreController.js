const {updateOneProduct, updateProducts} = require('../Services/Product');
const {addOneHistory, addHistory} = require('../Services/History');
const {addRelation} = require('../Services/Manager_Product');

var requestWarranty = async (req, res) => {
    try {
        const product = await updateOneProduct({status_id: 6}, req.body.product_id);
        const history = await addOneHistory(req.body.product_id, 6);
        res.json({success: true, message: 'request sent', data: {product, history}});
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from warrantyRequest'});
    }
}

var sendToWarranty = async (req, res) => {
    try {
        const products = await updateProducts({status_id: 7}, {id: req.body.products});
        await addRelation(req.body.products, req.body.manager_id);
        const history = await addHistory(req.body.products, 7);
        res.json({success: true, message: 'request sent', data: {products, history}});
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from warrantyRequest'});
    } 
}

var receiveWarranty = async (req, res) => {
    try {
        const products = await updateProducts({status_id: 10}, {id: req.body.products});
        const history = await addHistory(req.body.products, 10);
        res.json({success: true, message: 'request sent', data: products});
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from warrantyReceive'});
    }
}

module.exports = {
    requestWarranty,
    sendToWarranty,
    receiveWarranty,
}