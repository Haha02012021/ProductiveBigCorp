const {getInfo} = require('../Services/Version');
const {info} = require('../Services/Model');

var getVersionInfo = async (req, res) => {
    try {
        const info = await getInfo(req.params.id);
        res.json({success: true, data: info});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get version info', error: err});
    }
}

var getModelInfo = async (req, res) => {
    try {
        const model = await info(req.params.id);
        res.json({success: true, data: model, message: 'get info success'});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get model info', error: err});
    }
}

module.exports = {
    getVersionInfo,
    getModelInfo,
}