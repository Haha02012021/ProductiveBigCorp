const {findByAccount} = require('../Services/User');

var login = async (req, res) => {
  try {
      const manager = await findByAccount(req.body.account);
      if(manager) {
        if(req.body.password === manager.password) {
            const accessToken = jwt.sign(manager.dataValues, process.env.ACCESS_TOKEN_SECRET)
            res.status(200).cookie('jwt', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: 'none',
            });
            res.json({user: manager, accessToken});
        } else {
            res.status(404).json({success: false, message: 'password incorrect'});
        }
      } else {
        res.status(404).json({success: false, message: 'account incorrect'});
      }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: error,
    });
  }
}

var logout = async (req, res) => {
  try {
      // Reset cookie
      res.cookie('jwt', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' ? true : false,
          sameSite: 'none',
          expires: new Date(Date.now() + 1 * 1000),
      });
      res.status(200).json({
          success: true,
          message: 'success',
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          errors: error,
      });
  }
}

module.exports = {
  login,
  logout
}