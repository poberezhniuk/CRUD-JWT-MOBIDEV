const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../../config/keys');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check token
  if (token) {
    jwt.verify(token, keys.tokenSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, keys.tokenSecret, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
