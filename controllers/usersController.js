const users = require('../data/users.json');

exports.getAllUsers = (req, res, next) => {
  try {
    res.json(users);
  } catch (error) {
    next(error);
  }
};
