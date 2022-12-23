const {createManager} = require('../Services/User');
const {addModel} = require('../Services/Model');
const {addVersion} = require('../Services/Version');
const {allProducts} = require('../Services/Product');

var addManager = async (req, res) => {
    try {
        const manager = await createManager(
            req.body.name,
            req.body.place,
            req.body.account,
            req.body.password,            
            req.body.role,
        )
        res.json({success: true, message: 'manager added', data: manager});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from addManager', error: err});
    }
}

var createModel = async (req, res) => {
    try {
        const newModel = await addModel(req.body.name, req.body.colors);
        res.json({success: true, data: newModel});
    } catch {
        res.status(500).json({success: false, message: 'error from newModel', error: err});
    }
}

var createVersion = async (req, res) => {
    try {
        const newVer = await addVersion(req.body);
        res.json({success: true, message: 'new version added', data: newVer});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from newModel', error: err});
    }
}

var getAllProducts = async (req, res) => {
    try {
        const products = await allProducts(req.body.condition);
        if(!products) {
            res.status(404).json({success: false, message: 'not found'});
        } else {
            res.json({success: true, data: products, message: 'get all products of all managers'});
        }
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get all products of all managers', error: err});
    }
}

module.exports = {
    addManager,
    createModel,
    createVersion,
    getAllProducts
}