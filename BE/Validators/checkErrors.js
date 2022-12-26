var {validationResult} = require('express-validator');

const finalCheck = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      next();
    }
}

module.exports = {
    finalCheck,
}