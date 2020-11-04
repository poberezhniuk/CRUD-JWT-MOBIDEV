const User = require('../models/User');

const handleErrors = (err) => {
  // console.log(err.message, err.code);

  let errors = { email: '', password: '' };
  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'This email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties.path, properties.message);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.signup_get = (req, res) => {
  res.render('pages/signup');
};

module.exports.login_get = (req, res) => {
  res.render('pages/login');
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });

    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);

    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
  } catch (err) {
    const errors = handleErrors(err);
  }
};