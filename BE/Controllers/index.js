const {getInfo} = require('../Services/Version');

var getVersionInfo = async (req, res) => {
    try {
        const info = await getInfo(req.params.id);
        res.json({success: true, data: info});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from get version info', error: err});
    }
}

module.exports = {
    getVersionInfo,
}