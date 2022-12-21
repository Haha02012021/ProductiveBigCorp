const {updateOneProduct, updateProducts} = require('../Services/Product');
const {addOneHistory, addHistory, productsByStatus} = require('../Services/History');
const {createCustomer} = require('../Services/User');
const {findCustomerByEmail} = require('../Services/User');

var requestWarranty = async (req, res) => {
    try {
        const product = await updateOneProduct({status_id: 6}, req.body.product_id);
        const history = await addOneHistory(req.body.product_id, 6, 'yêu cầu được bảo hành', req.body.store_id);
        res.json({success: true, message: 'request sent', data: {product, history}});
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from warrantyRequest'});
    }
}

var sendToWarranty = async (req, res) => {
    try {
        const products = await updateProducts({status_id: 7}, {id: req.body.products});
        const history = await addHistory(req.body.products, 7, 'vận chuyển đến nơi bảo hành', req.body.store_id);
        res.json({success: true, message: 'request sent', data: {products, history}});
    } catch (err) {
        err.status(500).json({error: err, success: false, message: 'error from warrantyRequest'});
    } 
}

var receiveWarranty = async (req, res) => {
    try {
        const products = await updateProducts({status_id: 11}, {id: req.body.products});
        const history = await addHistory(req.body.products, 11, 'sản phẩm đã được bảo hành và đưa về cửa hàng', req.body.store_id);
        res.json({success: true, message: 'request sent', data: {products, history}});
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from warrantyReceive'});
    }
}

var getCustomer = async (req, res) => {
    try {
        const customer = await findCustomerByEmail(req.body.email);
        //console.log(req.body.email);
        //await console.log(customer);
        if(!customer) {
            res.status(404).json({success: false, message: 'customer not found'});
        } else {
            res.json({success: true, message: 'customer found', data: customer});
        }
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from customer search'});
    }
}

var addCustomer = async (req, res) => {
    try {
        const customer = await createCustomer(req.body.name, req.body.place, req.body.phone, req.body.email);
        if(!customer) {
            res.json({success: false, message: 'this customer already exists'})
        } else {
            res.json({success: true, message: 'customer added', data: customer});
        }
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from add customer'});
    }
}

var sell = async (req, res) => {
    try {
        const product = await updateOneProduct({customer_id: req.body.customer_id, status_id: 5, isSold: true, soldAt: new Date()}, req.body.product_id);
        const history = addOneHistory(req.body.product_id, 5, 'đã được bán', req.body.store_id);
        res.json({success: true, message: 'product sold', data: product});
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from sell'});
    }
}

var analizeProducts = async (req, res) => {
    try {
        const data = await productsByStatus(req.params.manager_id);
        if(!data) {
            res.json({success: false, message: 'data not returned'});
        } else {
            res.json({success: true, message: 'analized', data});
        }
    } catch (err) {
        res.status(500).json({error: err, success: false, message: 'error from analize products'});
    }
}

module.exports = {
    requestWarranty,
    sendToWarranty,
    receiveWarranty,
    getCustomer,
    sell,
    addCustomer,
    analizeProducts
}