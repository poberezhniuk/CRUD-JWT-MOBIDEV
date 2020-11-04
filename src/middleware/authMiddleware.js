const jwt = require('jsonwebtoken');

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

module.exports = {
  requireAuth,
};
