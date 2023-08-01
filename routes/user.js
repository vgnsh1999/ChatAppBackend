const express = require('express');
const userauthentication = require('../middleware/auth');

const router = express.Router();

const userController = require('../controllers/usercontrollers');

router.post('/signup',userController.signup);

router.post('/login',userController.login);

router.get('/get-user',userauthentication.authenticate,userController.getuser);

module.exports = router;