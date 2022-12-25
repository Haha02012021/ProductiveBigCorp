const {db,  Status,} = require('../models');

var allStatuses = async () => {
    try {
        const statuses = await Status.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        if(!statuses) {
            throw "no statuses found, error in database"
        } else {
            return statuses;
        }
    } catch (err) {
        console.log(err);
        return null
    }
}

module.exports = {
    allStatuses,
}