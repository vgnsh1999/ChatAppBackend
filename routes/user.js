const express = require('express');

const router = express.Router();

const userController = require('../controllers/usercontrollers');

//const authenthicatemiddleware = require('../middleware/auth');

router.post('/signup',userController.signup);

//router.post('/login',userController.login);

module.exports = router;