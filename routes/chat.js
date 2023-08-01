const express = require('express');
const userauthentication = require('../middleware/auth');
//const groupauthentication = require('../middleware/groupauth');

const router = express.Router();

const chatController = require('../controllers/chatcontrollers');

router.post('/add-message/:id', userauthentication.authenticate ,chatController.addMessage);

router.get('/get-message/:id',userauthentication.authenticate,chatController.getMessage);

//router.get('/get-message2/:id',userauthentication.authenticate,chatController.getMessage2);

module.exports = router;