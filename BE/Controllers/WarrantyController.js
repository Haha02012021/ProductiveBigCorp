const {updateOneProduct, updateProducts} = require('../Services/Product');
const {addOneHistory, addHistory} = require('../Services/History');
const {addRelation} = require('../Services/Manager_Product');

var receiveRequest = async (req, res) => {
    try {
        const products = await updateProducts({status_id: 8}, {id: req.body.products});
        const history = await addHistory(req.body.products, 8, 'đang được bảo hành', req.body.warranty_id);
        res.json({success: true, message: 'request sent', data: {products, history}});
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from receive warranty request'});
    }
}

var finishWaranty = async (req, res) => {
    try {
        const product = await updateOneProduct({status_id: 9}, req.body.product_id);
        console.log(req.body);
        if(req.body.done) {
            const history = await addOneHistory(req.body.product_id, 9, `đã bảo hành xong, ${req.body.error}`, req.body.warranty_id);
            res.json({success: true, message: 'warranty done', data: {product, history}});
        } else {
            const history = await addOneHistory(req.body.product_id, 12, `Không thể sửa chữa, ${req.body.error ? req.body.error : 'không rõ nguyên nhân'}`, req.body.warranty_id);
            res.json({success: true, message: 'warranty done', data: {product, history}});
        }
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from finish warranty request'});
    }
}

var sendBack = async (req, res) => {
    try {
        const products = await updateProducts({status_id: 10}, {id: req.body.products});
        const history = await addHistory(req.body.products, 10, 'vận chuyển về lại cửa hàng', req.body.warranty_id);
        res.json({success: true, message: 'sending back', data: {products, history}});
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from sending back'});
    } 
}

var sendBackToFactory = async (req, res) => {
    try {
        const products = await updateProducts({status_id: 13}, {id: req.body.products});
        const history = await addHistory(req.body.products, 13, 'chuyển về nhà máy', req.body.warranty_id);
        res.json({success: true, message: 'sending back to factory', data: {products, history}});
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from sending back'});
    }
}

module.exports = {
    receiveRequest,
    finishWaranty,
    sendBack,
    sendBackToFactory,
}