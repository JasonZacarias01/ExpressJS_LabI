const users = require('../data/users.json');
const { getInvalidEmails } = require('../transformers/usersTransformers');

exports.getAllUsers = (req, res, next) => {
  try {
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getInvalidEmail = (req, res, next) => {
    try {
        const invalidEmails = getInvalidEmails(users);
        res.json(invalidEmails);
    } catch (error) {
        next(error);
    }
  };
