const {getInfo} = require('../Services/Version');
const {info} = require('../Services/Model');
const {getProducts} = require('../Services/User');
const {getAll} = require('../Services/Model');
const {getAllVers} = require('../Services/Version');

var getVersionInfo = async (req, res) => {
    try {
        const info = await getInfo(req.params.id);
        if(!info) {
            res.status(404).json({success: false, message: 'not found'});
        }
        res.json({success: true, data: info});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get version info', error: err});
    }
}

var getModelInfo = async (req, res) => {
    try {
        const model = await info(req.params.id);
        if(!model) {
            res.status(404).json({success: false, message: 'not found'});
        }
        res.json({success: true, data: model, message: 'get info success'});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get model info', error: err});
    }
}

var getAllProducts = async (req, res) => {
    try {
        const products = await getProducts(req.params.manager_id);
        if(!products) {
            res.status(404).json({success: false, message: 'products not found'});
        }
        res.json({success: true, data: products, message: 'get all products'});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get all products', error: err});
    }
}

var getAllVersions = async (req, res) => {
    try {
        const versions = await getAllVers();
        if(!versions) {
            res.status(404).json({success: false, message: 'not found'});
        } 
        res.json({success: true, data: versions, message: 'get all versions'});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get all versions', error: err});
    }
}

var getAllModels = async (req, res) => {
    try {
        const models = await getAll();
        if(!models) {
            res.status(404).json({success: false, message: 'not found'});
        } 
        res.json({success: true, data: models, message: 'get all models'});
        
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get all models', error: err});
    }
}

module.exports = {
    getVersionInfo,
    getModelInfo,
    getAllProducts,
    getAllModels,
    getAllVersions,
}