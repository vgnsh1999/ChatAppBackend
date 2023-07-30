const express = require('express');
const userauthentication = require('../middleware/auth');

const router = express.Router();

const chatController = require('../controllers/chatcontrollers');

router.post('/add-message', userauthentication.authenticate, chatController.addMessage);

router.get('/get-message',userauthentication.authenticate,chatController.getMessage);

module.exports = router;