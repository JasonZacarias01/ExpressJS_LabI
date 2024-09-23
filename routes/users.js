var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', usersController.getAllUsers);

/* GET users with invalid email format. */
router.get('/auditEmails', usersController.getInvalidEmail);

module.exports = router;
