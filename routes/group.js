const express = require('express');
const userauthentication = require('../middleware/auth');
//const groupauthentication = require('../middleware/groupauth');

const router = express.Router();

const groupController = require('../controllers/groupcontrollers');

router.post('/add-group',userauthentication.authenticate,groupController.addGroup);

router.get('/get-group',userauthentication.authenticate,groupController.getGroup);

module.exports = router;